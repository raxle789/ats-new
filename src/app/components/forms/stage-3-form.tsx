'use client';
import React, { useState, useEffect, useRef } from 'react';
import {
  createCandidate,
  storeCandidateQuestions,
  storeCertification,
  storeCurriculumVitae,
  storeEducation,
  storeEmergencyContact,
  storeExperiences,
  storeFamilys,
  storeLanguage,
  storeProfilePhoto,
  storeSkills,
  storingAddress,
  updateCandidate,
} from '@/libs/Registration';
import { userRegister2 } from '@/libs/validations/Register';
import { setRegisterStep } from '@/redux/features/fatkhur/registerSlice';
import { useAppDispatch } from '@/redux/hook';
import {
  Input,
  Form,
  Select,
  DatePicker,
  Tabs,
  Radio,
  Modal,
  Checkbox,
  InputNumber,
  Button,
  Divider,
  Space,
  Image,
  Upload,
  message,
} from 'antd';
import type {
  DatePickerProps,
  FormProps,
  RadioChangeEvent,
  InputRef,
  CheckboxProps,
  GetProp,
  UploadProps,
  UploadFile,
} from 'antd';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
/* SESSION MANAGEMENT */
import { useAppSessionContext } from '@/libs/Sessions/AppSession';
import { regSession } from '@/libs/Sessions/utils';
import { DecryptSession } from '@/libs/Sessions/jwt';
import { convertToPlainObject, fileToBase64 } from '@/libs/Registration/utils';
import { AiOutlinePlus, AiOutlineUpload } from 'react-icons/ai';
// import { type } from '../../../libs/Authentication/permissions';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

type TargetKey = React.MouseEvent | React.KeyboardEvent | string;
let languageIndex = 0;
const { TextArea } = Input;

type FieldType = {
  profile?: {
    uploadPhoto?: UploadFile;
    fullname?: string;
    email?: string;
    phoneNumber?: string;
    dateOfBirth?: string;
    placeOfBirth?: string;
    gender?: string;
    religion?: string;
    ethnicity?: string;
    bloodType?: string;
    maritalStatus?: string;
  };
  addressCheckbox?: string;
  address?: {
    permanentAddress?: string;
    country?: string;
    rt?: string;
    rw?: string;
    city?: string;
    subdistrict?: string;
    village?: string;
    zipCode?: string;
    currentAddress?: string;
  };
  families?: {
    [id: string]: {
      relation?: string;
      name?: string;
      gender?: string;
      dateOfBirth?: string;
    };
  };
  formalOption?: string;
  formalCheckbox?: boolean;
  certificationCheckbox?: boolean;
  education?: {
    educationLevel?: string;
    educationMajor?: string;
    schoolName?: string;
    gpa?: number;
    cityOfSchool?: string;
    startEduYear?: string;
    endEduYear?: string;
  };
  certification?: {
    [id: string]: {
      certificationName?: string;
      institution?: string;
      issueDate?: string;
      monthIssue?: string;
      yearIssue?: string;
    };
  };
  skills?: string;
  language?: {
    [id: string]: {
      name?: string;
      level?: string;
    };
  };
  expOption?: string;
  experience?: {
    expectedSalary?: number;
    [id: string]: {
      jobTitle?: string;
      jobFunction?: string;
      lineIndustry?: string;
      positionLevel?: string;
      compName?: string;
      jobDesc?: string;
      startYear?: string;
      endYear?: string;
      currentYear?: string;
      currentSalary?: number;
    };
  };
  everWorkedOption?: string;
  diseaseOption?: string;
  relationOption?: string;
  others?: {
    emergencyContactName?: string;
    emergencyContactPhoneNumber?: string;
    emergencyContactRelation?: string;
    noticePeriod: string;
    everWorkedMonth: string;
    everWorkedYear: string;
    diseaseName: string;
    diseaseYear: string;
    relationName: string;
    relationPosition: string;
    uploadCV?: string;
  };
};

type MasterData = {
  citys?: {
    value: id;
    label: string;
  }[];
  ethnicity?: {
    value: string;
    label: string;
  }[];
  countrys?: {
    value: number;
    label: string;
  }[];
  education_levels?: {
    value: number;
    label: string;
  }[];
  education_majors?: {
    value: number;
    label: string;
  }[];
  education_institutions?: {
    value: number;
    label: string;
  }[];
  certificates_name?: {
    value: number;
    label: string;
  }[];
  skills?: {
    value: number;
    label: string;
  }[];
  job_levels?: {
    value: number;
    label: string;
  }[];
  job_functions?: {
    value: number;
    label: string;
  }[];
  line_industries?: {
    value: string;
    label: string;
  }[];
};

const Stage3Form = () => {
  /* Calling Session-Context */
  const session = useAppSessionContext();
  const regSessionValue = session[`${regSession}`];
  const regSessionDecoded = DecryptSession(regSessionValue);
  /* Session-Context */
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [profilePhoto, setProfilePhoto] = useState<any>();
  /* to catch every error while operation */
  const [errors, setErrors] = useState<string>('');

  const [masterData, setMasterData] = useState<MasterData | null>(null);
  const [citysName, setCitysName] = useState<
    { value: string; label: string }[] | null
  >(null);

  /* Fetching Master Data */
  const fetchCitys = async () => {
    const citys = await fetch('/api/client-data/citys', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const citysData = await citys.json();
    setMasterData((prevState) => ({
      ...prevState,
      citys: citysData,
    }));
    const citysNameOnly: { value: string; label: string }[] = citysData;
    citysNameOnly.forEach((city) => (city.value = city.label));
    setCitysName(citysNameOnly);
  };

  const fetchEthnicity = async () => {
    const ethnicity = await fetch('/api/client-data/ethnicity', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const ethnicityData = await ethnicity.json();
    setMasterData((prevState) => ({
      ...prevState,
      ethnicity: ethnicityData,
    }));
  };

  const fetchCountrys = async () => {
    const countrys = await fetch('/api/client-data/countrys', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const countrysData = await countrys.json();
    setMasterData((prevState) => ({
      ...prevState,
      countrys: countrysData,
    }));
  };

  const fetchEducationLevels = async () => {
    const educationLevels = await fetch('/api/client-data/education/levels', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const educationLevelsData = await educationLevels.json();
    setMasterData((prevState) => ({
      ...prevState,
      education_levels: educationLevelsData,
    }));
  };

  const fetchEducatioMajors = async () => {
    const educationMajors = await fetch('/api/client-data/education/majors', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const educationMajorsData = await educationMajors.json();
    setMasterData((prevState) => ({
      ...prevState,
      education_majors: educationMajorsData,
    }));
  };

  const fetchEducationInstitutios = async () => {
    const institutions = await fetch(
      '/api/client-data/education/institutions',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    const institutionsData = await institutions.json();
    setMasterData((prevState) => ({
      ...prevState,
      education_institutions: institutionsData,
    }));
  };

  const fetchCertificates = async () => {
    const certifications = await fetch('/api/client-data/certifications', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const certificationsData = await certifications.json();
    setMasterData((prevState) => ({
      ...prevState,
      certificates_name: certificationsData,
    }));
  };

  const fetchSkills = async () => {
    const skills = await fetch('/api/client-data/skills', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const skillsData = await skills.json();
    setMasterData((prevState) => ({
      ...prevState,
      skills: skillsData,
    }));
  };

  const fetchJobFunctions = async () => {
    const jobFunctions = await fetch('/api/client-data/job/functions', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const jobFunctionsData = await jobFunctions.json();
    setMasterData((prevState) => ({
      ...prevState,
      job_functions: jobFunctionsData,
    }));
  };

  const jobJobLevels = async () => {
    const levels = await fetch('/api/client-data/job/levels', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const jobLevelsData = await levels.json();
    setMasterData((prevState) => ({
      ...prevState,
      job_levels: jobLevelsData,
    }));
  };

  const lineIndutries = async () => {
    const lineIndustries = await fetch('/api/client-data/job/line-industries', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const lineIndustriesData = await lineIndustries.json();
    setMasterData((prevState) => ({
      ...prevState,
      line_industries: lineIndustriesData,
    }));
  };

  /* Fetch-data */
  /**
   * Fetch master data here
   * CITY, COUNTRY, EDUCATION LEVEL, EDUCATION MAJOR, SCHOOL/UNIVERSITY, CERTIFICATION NAME, SKILLS, JOB TITLES, JOB FUNCTION, LINE INDUSTRY.
   */

  const handleBeforeUpload = (file: FileType) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt500kb = file.size / 1024 / 1024 < 0.5;
    if (!isLt500kb) {
      message.error('Image must smaller than 500KB!');
    }
    return isJpgOrPng && isLt500kb;
  };

  const handlePreview = async (file: UploadFile) => {
    console.log(file);
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    console.log('okeoke');
    console.log('file: ', file);
    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    /* set Profile Photo file */
    setProfilePhoto(fileList);

    setFileList(newFileList);
  };

  const [country, setCountry] = useState<string>('');
  const handleChangeCountry = (value: string) => {
    setCountry(value);
  };

  const [marriedValue, setMarriedValue] = useState<string>('');
  const handleChangeMarried = (value: string) => {
    setMarriedValue(value);
  };

  const onChangeDate: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date, dateString);
  };

  const [addressCheck, setAddressCheck] = useState<boolean>(false);
  const handleAddressCheck: CheckboxProps['onChange'] = (e) => {
    setAddressCheck(e.target.checked);
  };

  const [index, setIndex] = useState<number>(0);

  const tabContent: JSX.Element[] = [
    <div key={index} className="row">
      <div className="col-6">
        <div className="input-group-meta position-relative mb-15">
          <label>Relation</label>
          <Form.Item<FieldType>
            name={['families', index.toString(), 'relation']}
            className="mb-0"
            // rules={
            //   marriedValue === 'Married'
            //     ? [
            //         {
            //           required: true,
            //           message:
            //             'Please input your family relation especially spouse!',
            //         },
            //       ]
            //     : undefined
            // }
          >
            <Select
              className="w-100"
              placeholder="Your Family Relation"
              options={[
                { value: 'Father', label: 'Father' },
                { value: 'Mother', label: 'Mother' },
                { value: 'Sibling', label: 'Sibling' },
                { value: 'Spouse', label: 'Spouse' },
                { value: 'Children', label: 'Children' },
              ]}
            />
          </Form.Item>
        </div>
      </div>
      <div className="col-6">
        <div className="input-group-meta position-relative mb-15">
          <label>Name</label>
          <Form.Item<FieldType>
            name={['families', index.toString(), 'name']}
            className="mb-0"
            // rules={
            //   marriedValue === 'Married'
            //     ? [
            //         {
            //           required: true,
            //           message: 'Please input your relation name!',
            //         },
            //       ]
            //     : undefined
            // }
          >
            <Input placeholder="Your Relation Name" />
          </Form.Item>
        </div>
      </div>
      <div className="col-6">
        <div className="input-group-meta position-relative mb-15">
          <label>Gender</label>
          <Form.Item<FieldType>
            name={['families', index.toString(), 'gender']}
            className="mb-0"
            // rules={
            //   marriedValue === 'Married'
            //     ? [
            //         {
            //           required: true,
            //           message: 'Please input your family gender!',
            //         },
            //       ]
            //     : undefined
            // }
          >
            <Select
              className="w-100"
              placeholder="Your Family Gender"
              options={[
                { value: 'Male', label: 'Male' },
                { value: 'Female', label: 'Female' },
              ]}
            />
          </Form.Item>
        </div>
      </div>
      <div className="col-6">
        <div className="input-group-meta position-relative mb-15">
          <label>Date of Birth</label>
          <Form.Item<FieldType>
            name={['families', index.toString(), 'dateOfBirth']}
            // rules={
            //   marriedValue === 'Married'
            //     ? [
            //         {
            //           required: true,
            //           message: 'Please input your relation date of birth!',
            //         },
            //       ]
            //     : undefined
            // }
          >
            <DatePicker
              className="w-100"
              placeholder="Select Date"
              onChange={onChangeDate}
            />
          </Form.Item>
        </div>
      </div>
    </div>,
  ];

  const initialItems = [
    { label: 'Relation 1', children: tabContent, key: '1' },
  ];
  const [activeKey, setActiveKey] = useState(initialItems[0].key);
  const [items, setItems] = useState(initialItems);
  const newTabIndex = useRef(0);

  const onChangeTabs = (newActiveKey: string) => {
    setActiveKey(newActiveKey);
  };

  const add = () => {
    const newActiveKey = `newTab${newTabIndex.current++}`;
    const newPanes = [...items];
    newPanes.push({
      label: `Relation ${items.length + 1}`,
      children: tabContent,
      key: newActiveKey,
    });
    setItems(newPanes);
    setActiveKey(newActiveKey);
    setIndex(index + 1);
  };

  const remove = (targetKey: TargetKey) => {
    let newActiveKey = activeKey;
    let lastIndex = -1;
    items.forEach((item, i) => {
      if (item.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const newPanes = items.filter((item) => item.key !== targetKey);
    if (newPanes.length && newActiveKey === targetKey) {
      if (lastIndex >= 0) {
        newActiveKey = newPanes[lastIndex].key;
      } else {
        newActiveKey = newPanes[0].key;
      }
    }
    setItems(newPanes);
    setActiveKey(newActiveKey);
  };

  const onEdit = (
    targetKey: React.MouseEvent | React.KeyboardEvent | string,
    action: 'add' | 'remove',
  ) => {
    if (action === 'add') {
      add();
    } else {
      remove(targetKey);
    }
  };

  const [certificationIdx, setCertificationIdx] = useState<number>(0);
  const certifTabContent: JSX.Element[] = [
    <div key={certificationIdx} className="row">
      <div className="col-12">
        <div className="input-group-meta position-relative mb-15">
          <label>Name (Certification/Licence)</label>
          <Form.Item<FieldType>
            name={[
              'certification',
              certificationIdx.toString(),
              'certificationName',
            ]}
            className="mb-0"
          >
            <Select
              className="w-100"
              placeholder="Your Certificate Name"
              showSearch
              mode="tags"
              maxCount={1}
              filterOption={(input, option) =>
                (option?.label.toLowerCase() ?? '').includes(input)
              }
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? '')
                  .toLowerCase()
                  .localeCompare((optionB?.label ?? '').toLowerCase())
              }
              /* Fetched Data */
              options={masterData?.certificates_name}
            />
          </Form.Item>
        </div>
      </div>
      <div className="col-6">
        <div className="input-group-meta position-relative mb-15">
          <label>Institution</label>
          <Form.Item<FieldType>
            name={['certification', certificationIdx.toString(), 'institution']}
            className="mb-0"
          >
            <Input placeholder="Your Institution" />
          </Form.Item>
        </div>
      </div>
      <div className="col-6">
        <div className="input-group-meta position-relative mb-15">
          <label>Issue Date</label>
          <div className="d-flex align-items-center">
            <Form.Item<FieldType>
              name={[
                'certification',
                certificationIdx.toString(),
                'monthIssue',
              ]}
              className="mb-0 me-2"
            >
              <DatePicker placeholder="Select Month" picker="month" />
            </Form.Item>
            <Form.Item<FieldType>
              name={['certification', certificationIdx.toString(), 'yearIssue']}
              className="mb-0"
            >
              <DatePicker placeholder="Select Year" picker="year" />
            </Form.Item>
          </div>
        </div>
      </div>
    </div>,
  ];

  const certifInitItems: any[] = [
    // { label: 'Certification 1', children: certifTabContent, key: '1' },
  ];
  const [activeCertifKey, setActiveCertifKey] = useState('');
  const [certifItems, setCertifItems] = useState(certifInitItems);
  const newCertifTabIndex = useRef(0);

  const onChangeCertifTabs = (newActiveKey: string) => {
    setActiveCertifKey(newActiveKey);
  };

  const addCertif = () => {
    const newActiveKey = `newTab${newCertifTabIndex.current++}`;
    const newPanes = [...certifItems];
    newPanes.push({
      label: `Certification ${certifItems.length + 1}`,
      children: certifTabContent,
      key: newActiveKey,
    });
    setCertifItems(newPanes);
    setActiveCertifKey(newActiveKey);
    setCertificationIdx(certificationIdx + 1);
  };

  const removeCertif = (targetKey: TargetKey) => {
    let newActiveKey = activeCertifKey;
    let lastIndex = -1;
    certifItems.forEach((item, i) => {
      if (item.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const newPanes = certifItems.filter((item) => item.key !== targetKey);
    if (newPanes.length && newActiveKey === targetKey) {
      if (lastIndex >= 0) {
        newActiveKey = newPanes[lastIndex].key;
      } else {
        newActiveKey = newPanes[0].key;
      }
    }
    setCertifItems(newPanes);
    setActiveCertifKey(newActiveKey);
  };

  const onEditCertif = (
    targetKey: React.MouseEvent | React.KeyboardEvent | string,
    action: 'add' | 'remove',
  ) => {
    if (action === 'add') {
      addCertif();
    } else {
      removeCertif(targetKey);
    }
  };

  const [formalCheck, setFormalCheck] = useState<boolean>(true);
  const handleFormalCheck: CheckboxProps['onChange'] = (e) => {
    setFormalCheck(e.target.checked);
  };
  const [certificationCheck, setCertificationCheck] = useState<boolean>(true);
  const handleCertificationCheck: CheckboxProps['onChange'] = (e) => {
    setCertificationCheck(e.target.checked);
  };

  const [eduLevel, setEduLevel] = useState<string>('');
  const onChangeEdu = (value: string) => {
    setEduLevel(value);
  };

  const [languageItems, setLanguageItems] = useState(['English', 'Mandarin']);
  const [langTotal, setLangTotal] = useState<number>(1);
  const [name, setName] = useState('');
  const inputRef = useRef<InputRef>(null);

  const onLanguageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const addLangSkill = () => {
    if (langTotal <= 3) {
      setLangTotal(langTotal + 1);
    }
  };
  const removeLangSkill = () => {
    if (langTotal > 1) {
      setLangTotal(langTotal - 1);
    }
  };

  const addLanguage = (
    e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>,
  ) => {
    e.preventDefault();
    setLanguageItems([...languageItems, name || `New item ${languageIndex++}`]);
    setName('');
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  const [expValue, setExpValue] = useState<string>('you-choose');
  const onChangeExp = (e: RadioChangeEvent) => {
    setExpValue(e.target.value);
  };

  const [jobDescValue, setJobDescValue] = useState<string>('');
  const [expIdx, setExpIdx] = useState<number>(0);
  const [yearState, setYearState] = useState<{ [key: string]: boolean }>({});
  const currentYear = useRef([]);
  // const [expTabGroup, setExpTabGroup] = useState<JSX.Element[]>(expTabContent);
  const handleCheckboxChange: CheckboxProps['onChange'] = (
    e: any,
    expIdx: number,
  ) => {
    console.log(e.target.checked);
    // const state = ;
    // const id = parseInt(e.target.dataset.id);
    // console.log('id: ', id);
    setYearState((prevState) => ({
      ...prevState,
      [expIdx]: true,
    }));
  };
  const expTabContent: JSX.Element[] = [
    <div key={expIdx} className="row">
      <div className="col-6">
        <div className="input-group-meta position-relative mb-15">
          <label>Job Title*</label>
          <Form.Item<FieldType>
            name={['experience', expIdx.toString(), 'jobTitle']}
            className="mb-0"
            rules={[
              {
                required: true,
                message: 'Please input your job title!',
              },
            ]}
          >
            <Input placeholder="Your Job Title" />
          </Form.Item>
        </div>
      </div>
      <div className="col-6">
        <div className="input-group-meta position-relative mb-15">
          <label>Job Function*</label>
          <Form.Item<FieldType>
            name={['experience', expIdx.toString(), 'jobFunction']}
            className="mb-0"
            rules={[
              {
                required: true,
                message: 'Please input your job function!',
              },
            ]}
          >
            <Select
              className="w-100"
              showSearch
              placeholder="Your Job Function"
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.label.toLowerCase() ?? '').includes(input)
              }
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? '')
                  .toLowerCase()
                  .localeCompare((optionB?.label ?? '').toLowerCase())
              }
              /* Fetched Data */
              options={masterData?.job_functions}
            />
          </Form.Item>
        </div>
      </div>
      <div className="col-6">
        <div className="input-group-meta position-relative mb-15">
          <label>Line Industry*</label>
          <Form.Item<FieldType>
            name={['experience', expIdx.toString(), 'lineIndustry']}
            className="mb-0"
            rules={[
              {
                required: true,
                message: 'Please input your line industry!',
              },
            ]}
          >
            <Select
              className="w-100"
              showSearch
              placeholder="Your Line Industry"
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.label.toLowerCase() ?? '').includes(input)
              }
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? '')
                  .toLowerCase()
                  .localeCompare((optionB?.label ?? '').toLowerCase())
              }
              /* Fetched Data */
              options={masterData?.line_industries}
            />
          </Form.Item>
        </div>
      </div>
      <div className="col-6">
        <div className="input-group-meta position-relative mb-15">
          <label>Position Level*</label>
          <Form.Item<FieldType>
            name={['experience', expIdx.toString(), 'positionLevel']}
            className="mb-0"
            rules={[
              {
                required: true,
                message: 'Please input your position level!',
              },
            ]}
          >
            <Select
              className="w-100"
              showSearch
              placeholder="Your Position Level"
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.label.toLowerCase() ?? '').includes(input)
              }
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? '')
                  .toLowerCase()
                  .localeCompare((optionB?.label ?? '').toLowerCase())
              }
              /* Fetched Data */
              options={masterData?.job_levels}
            />
          </Form.Item>
        </div>
      </div>
      <div className="col-6">
        <div className="input-group-meta position-relative mb-15">
          <label>Company Name*</label>
          <Form.Item<FieldType>
            name={['experience', expIdx.toString(), 'compName']}
            className="mb-0"
            rules={[
              {
                required: true,
                message: 'Please input your company name!',
              },
            ]}
          >
            <Input placeholder="Your Company Name" />
          </Form.Item>
        </div>
      </div>
      <div className="col-6">
        <div className="input-group-meta position-relative mb-15">
          <label>Job Description</label>
          <Form.Item<FieldType>
            name={['experience', expIdx.toString(), 'jobDesc']}
            className="mb-0"
          >
            <TextArea
              value={jobDescValue}
              onChange={(e) => setJobDescValue(e.target.value)}
              placeholder="Tell me about your job description"
              autoSize={{ minRows: 3, maxRows: 5 }}
            />
          </Form.Item>
        </div>
      </div>
      <div className="col-5">
        <div className="input-group-meta position-relative mb-15">
          <label>Start Year*</label>
          <Form.Item<FieldType>
            name={['experience', expIdx.toString(), 'startYear']}
            className="mb-0"
            rules={[
              {
                required: true,
                message: 'Please choose start year!',
              },
            ]}
          >
            <DatePicker
              className="w-100"
              placeholder="Select Year"
              picker="month"
            />
          </Form.Item>
        </div>
      </div>
      <div className="col-5">
        <div className="input-group-meta position-relative mb-15">
          <label>End Year*</label>
          <Form.Item<FieldType>
            name={['experience', expIdx.toString(), 'endYear']}
            className="mb-0"
            rules={[
              {
                required: true,
                message: 'Please choose end year!',
              },
            ]}
          >
            <DatePicker
              className="w-100"
              placeholder="Select Year"
              picker="month"
              // rules={
              //   !formalCheck
              //     ? [
              //         {
              //           required: true,
              //           message: 'Please choose your education!',
              //         },
              //       ]
              //     : []
              // }
              disabled={yearState[expIdx]}
            />
          </Form.Item>
        </div>
      </div>
      <div className="col-2">
        <div className="input-group-meta position-relative mb-15">
          <Form.Item<FieldType>
            name={['experience', expIdx.toString(), 'currentYear']}
            className="pt-15"
          >
            <Checkbox
              onChange={(e) => handleCheckboxChange(e, expIdx)}
              // checked={yearState[expIdx] || false}
              // onChange={(e) => handleCheckboxRef(e, expIdx)}
              // data-id={expIdx}
            >
              Current
            </Checkbox>
          </Form.Item>
        </div>
      </div>
      <div className="col-6">
        <div className="input-group-meta position-relative mb-15">
          <label>Current Salary (gross Monthly)*</label>
          <Form.Item<FieldType>
            name={['experience', expIdx.toString(), 'currentSalary']}
            className="mb-0"
            // rules={[
            //   {
            //     required: true,
            //     message: 'Please input your current salary!',
            //   },
            // ]}
          >
            <InputNumber
              className="w-100"
              min={0}
              placeholder="Input Current Salary"
              formatter={(value) =>
                `Rp ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
              }
              parser={(value: string | undefined): string | number =>
                value!.replace(/\Rp\s?|(\.*)/g, '')
              }
            />
          </Form.Item>
        </div>
      </div>
      <div className="col-6">
        <div className="input-group-meta position-relative mb-15">
          <label>Expected Salary (gross Monthly)*</label>
          <Form.Item<FieldType>
            name={['experience', 'expectedSalary']}
            className="mb-0"
            rules={[
              {
                required: true,
                message: 'Please input your expected salary!',
              },
            ]}
          >
            <InputNumber
              className="w-100"
              min={0}
              placeholder="Input Expected Salary"
              formatter={(value) =>
                `Rp ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
              }
              parser={(value: string | undefined): string | number =>
                value!.replace(/\Rp\s?|(\.*)/g, '')
              }
            />
          </Form.Item>
        </div>
      </div>
    </div>,
  ];

  const initExpItems: any[] = [];
  const [activeExpKey, setActiveExpKey] = useState('');
  const [expItems, setExpItems] = useState(initExpItems);
  const newExpTabIdx = useRef(0);

  const onChangeExpTabs = (newActiveKey: string) => {
    setActiveExpKey(newActiveKey);
  };

  const addExp = () => {
    const newActiveKey = `newTab${newExpTabIdx.current++}`;
    const newPanes = [...expItems];
    newPanes.push({
      label: `Experience ${expItems.length + 1}`,
      children: expTabContent,
      key: newActiveKey,
    });
    setExpItems(newPanes);
    setActiveExpKey(newActiveKey);
    setExpIdx(expIdx + 1);
    // setYearState((prevState) => ({
    //   ...prevState,
    //   [expIdx]: false,
    // }));
    // setYearState(yearState[expIdx]);
  };

  const removeExp = (targetKey: TargetKey) => {
    let newActiveKey = activeExpKey;
    let lastIndex = -1;
    expItems.forEach((item, i) => {
      if (item.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const newPanes = expItems.filter((item) => item.key !== targetKey);
    if (newPanes.length && newActiveKey === targetKey) {
      if (lastIndex >= 0) {
        newActiveKey = newPanes[lastIndex].key;
      } else {
        newActiveKey = newPanes[0].key;
      }
    }
    setExpItems(newPanes);
    setActiveExpKey(newActiveKey);
  };

  const onEditExp = (
    targetKey: React.MouseEvent | React.KeyboardEvent | string,
    action: 'add' | 'remove',
  ) => {
    if (action === 'add') {
      addExp();
    } else {
      removeExp(targetKey);
    }
  };

  const [everWorked, setEverWorked] = useState<string>('you-choose');
  const everWorkedChange = (e: RadioChangeEvent) => {
    setEverWorked(e.target.value);
  };

  const [disease, setdisease] = useState<string>('you-choose');
  const diseaseChange = (e: RadioChangeEvent) => {
    setdisease(e.target.value);
  };

  const [haveRelation, setHaveRelation] = useState<string>('you-choose');
  const haveRelationChange = (e: RadioChangeEvent) => {
    setHaveRelation(e.target.value);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    setIsModalOpen(false);

    // uncomment ini untuk async simpan data
    // setConfirmLoading(true);
    // setTimeout(() => {
    //   setIsModalOpen(false);
    //   setConfirmLoading(false);
    // }, 2000);
    const values = form.getFieldsValue();
    console.log('ok value form: ', values);
    // jalankan fungsi simpan data
    console.log('Manipulating profile-photo file...');
    const photoBase64 = await fileToBase64(profilePhoto[0].originFileObj);
    const photoFile = {
      original_name: profilePhoto[0].originFileObj.name,
      byte_size: profilePhoto[0].originFileObj.size,
      file_base: photoBase64,
    };
    console.log('Manipulated profile-photo file result...', photoFile);
    console.info('Storing profile-photo file...s');
    const saveProfilePhoto = await storeProfilePhoto(photoFile);
    if (saveProfilePhoto.success !== true) {
      console.info('Failed to store profile photo...');
      return setErrors(saveProfilePhoto.message as string);
    }
    console.info('Storing profile-phhoto successfully...', saveProfilePhoto);

    console.info('Begin updating candidate-data...');
    const candidateUpdateData = {
      bloodType: values.profile.bloodType,
      ethnicity: values.profile.ethnicity,
      gender: values.profile.gender,
      maritalStatus: values.profile.maritalStatus,
      placeOfBirth: values.profile.placeOfBirth,
      religion: values.profile.religion,
    };
    const updateCandidateData = await updateCandidate(candidateUpdateData);
    if (updateCandidateData.success !== true) {
      console.info(updateCandidateData.message as string);
      return setErrors(updateCandidateData.message as string);
    }
    console.log('Updating candidate-data successfully...', updateCandidateData);

    console.info('Begin to store address data...');
    const manipulatedAddressData = {
      permanentAddress: values.address.permanentAddress,
      country: values.address.country,
      city: values.address.city,
      zipCode: values.address.zipCode,
      rt: values.address.rt,
      rw: values.address.rw,
      subdistrict: values.address.subdistrict,
      village: values.address.village,
      currentAddress: values.address.currentAddress,
    };
    const storeAddress = await storingAddress(
      manipulatedAddressData,
      values.addressCheckbox,
    );
    if (storeAddress.success !== true) {
      console.info(storeAddress.message as string);
      return setErrors(storeAddress.message as string);
    }
    console.info('Storing address data successfully...', storeAddress);

    const plainFamiliesObject = convertToPlainObject(values.families as object);
    /* PLAIN OBJECT */
    const storeRelations = await storeFamilys(plainFamiliesObject);
    if (storeRelations.success !== true) {
      console.info(storeRelations.message as string);
      return setErrors(storeRelations.message as string);
    }
    console.info('Storing relations successfully...', storeRelations);

    console.info('Begin to store education data...');

    const plainEducationData = convertToPlainObject(values.education);

    const storeEducationData = await storeEducation(
      plainEducationData,
      values.education?.startEduYear.$y as number,
      values.education?.endEduYear.$y as number,
      values.formalCheckbox,
    );
    if (storeEducationData.success !== true) {
      console.info(storeEducationData.message as string);
      return setErrors(storeEducationData.message as string);
    }
    console.info('Store education data successfully...', storeEducationData);

    console.info('Begin to store certificates...');

    const plainCertificatesData = convertToPlainObject(values.certification);

    const storeCertificatesData = await storeCertification(
      plainCertificatesData,
      values.certification['1']['monthIssue']['$M'],
      values.certification['1']['monthIssue']['$y'],
      values.certificationCheckbox,
    );
    if (storeCertificatesData.success !== true) {
      console.info(storeCertificatesData.message as string);
      return setErrors(storeCertificatesData.message as string);
    }
    console.info('Store certificates successfully...', storeCertificatesData);

    console.info('Begin to store skills...');
    const storeSkillsData = await storeSkills(values.skills);
    if (storeSkillsData.success !== true) {
      console.info(storeSkillsData.message as string);
      return setErrors(storeSkillsData.message as string);
    }
    console.info('Store skills successfully...', storeSkillsData);

    console.info('Begin to store language...');

    const plainLanguagesData = convertToPlainObject(values.language);

    const storeLanguageData = await storeLanguage(plainLanguagesData);
    if (storeLanguageData.success !== true) {
      console.info(storeLanguageData.message as string);
      return setErrors(storeLanguageData.message as string);
    }
    console.info('Storing language data successfully...', storeLanguageData);

    console.info('Begin storing experiences data...');

    const plainExperiencesData = convertToPlainObject(values.experience);

    const storeExperienceData = await storeExperiences(
      plainExperiencesData,
      values.expOption as string,
    );
    if (storeExperienceData?.success !== true) {
      console.info(storeExperienceData.message as string);
      return setErrors(storeExperienceData.message as string);
    }
    console.info(
      'Storing experience data successfully...',
      storeExperienceData,
    );

    console.info('Storing emergency contact data...');

    const plainOthersData = convertToPlainObject(values.others);
    console.log(plainOthersData);

    const emergencyContactDataConverted = {
      emergencyContactPhoneNumber: plainOthersData.emergencyContactPhoneNumber,
      emergencyContactName: plainOthersData.emergencyContactName,
      emergencyContactRelation: plainOthersData.emergencyContactRelation,
    };
    const storeEmergencyContactData = await storeEmergencyContact(
      emergencyContactDataConverted,
    );
    if (storeEmergencyContactData.success !== true) {
      console.info(storeEmergencyContactData.message as string);
      return setErrors(storeEmergencyContactData.message as string);
    }
    console.info(
      'Storing emergency contact data successfully...',
      storeEmergencyContactData,
    );

    console.info('Storing candidate questions data...');

    const candidateQuestionsData = {
      noticePeriod: plainOthersData.noticePeriod,
      everWorkedMonth: plainOthersData.everWorkedMonth,
      everWorkedYear: plainOthersData.everWorkedYear,
      diseaseName: plainOthersData.diseaseName,
      diseaseYear: plainOthersData.diseaseYear,
      relationName: plainOthersData.relationName,
      relationPosition: plainOthersData.relationPosition,
    };

    const storeCandidateQuestionsData = await storeCandidateQuestions(
      candidateQuestionsData,
    );
    if (storeCandidateQuestionsData.success !== true) {
      console.info(storeCandidateQuestionsData.message as string);
      return setErrors(storeCandidateQuestionsData.message as string);
    }
    console.info(
      'Storing candidate questions data successfully...',
      storeCandidateQuestions,
    );

    console.info('Begin to store curriculum-vitae document...');
    const curriculumVitaeDocument = await fileToBase64(
      values.others?.uploadCV.file.originFileObj,
    );
    const manipulatedCurriculumVitae = {
      original_name: values.others?.uploadCV.file.originFileObj.name,
      byte_size: values.others?.uploadCV.file.originFileObj.size,
      file_base: curriculumVitaeDocument,
    };
    const storeCV = await storeCurriculumVitae(manipulatedCurriculumVitae);
    if (storeCV.success !== true) {
      console.info(storeCV.message as string);
      return setErrors(storeCV.errors as string);
    }
    console.info('Store cv document successfully', storeCV);

    message.success('Your data successfully saved');
    dispatch(setRegisterStep(4));
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleSubmit: FormProps<FieldType>['onFinish'] = async (values) => {
    showModal();
  };

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (
    errorInfo,
  ) => {
    if (errorInfo.errorFields && errorInfo.errorFields.length > 0) {
      const errorMessage = errorInfo.errorFields
        .map((field) => field.errors.join(', '))
        .join('; ');
      message.error(`Failed: ${errorMessage}`);
    }
  };

  useEffect(() => {
    form.setFieldsValue({
      profile: {
        fullname: 'Fatih',
        email: '',
        phoneNumber: '',
        dateOfBirth: '',
      },
      formalCheckbox: true,
      certificationCheckbox: true,
    });
    setIndex(index + 1);
    setExpIdx(expIdx + 1);
    setCertificationIdx(certificationIdx + 1);
    /* Fetch Master Data */
    fetchCitys();
    fetchEthnicity();
    fetchCountrys();
    fetchEducationLevels();
    fetchEducatioMajors();
    fetchEducationInstitutios();
    fetchCertificates();
    fetchSkills();
    fetchJobFunctions();
    jobJobLevels();
    lineIndutries();
  }, []);

  useEffect(() => {
    console.log('yearState: ', yearState);
  }, [yearState]);
  return (
    <Form
      name="candidate-register-form"
      form={form}
      variant="filled"
      initialValues={{ remember: true }}
      onFinish={handleSubmit}
      onFinishFailed={onFinishFailed}
    >
      <div className="row">
        <label className="fw-bold">Profile</label>
        <div className="col-4">
          <div className="input-group-meta position-relative mb-15">
            <label>Upload Photo*</label>
            <Form.Item<FieldType>
              name={['profile', 'uploadPhoto']}
              className="mb-0"
              // rules={[
              //   {
              //     required: true,
              //     message: 'Please upload your photo!',
              //   },
              // ]}
            >
              <div>
                <Upload
                  action=""
                  listType="picture-circle"
                  fileList={fileList}
                  beforeUpload={handleBeforeUpload}
                  onPreview={handlePreview}
                  onChange={handleChange}
                  accept="image/*"
                >
                  {!fileList[0] && (
                    <button
                      style={{ border: 0, background: 'none' }}
                      type="button"
                    >
                      <AiOutlinePlus style={{ fontSize: '14px' }} />
                      {/* <PlusOutlined
                        onPointerEnterCapture={''}
                        onPointerLeaveCapture={''}
                      /> */}
                      <div style={{ marginTop: 8 }}>Upload</div>
                    </button>
                  )}
                </Upload>
                {previewImage && (
                  <Image
                    wrapperStyle={{ display: 'none' }}
                    preview={{
                      visible: previewOpen,
                      onVisibleChange: (visible) => setPreviewOpen(visible),
                      afterOpenChange: (visible) =>
                        !visible && setPreviewImage(''),
                    }}
                    src={previewImage}
                  />
                )}
              </div>
            </Form.Item>
          </div>
        </div>
        <div className="col-4">
          <div className="input-group-meta position-relative mb-0">
            <label>Full Name (as per ID/Passport)*</label>
            <Form.Item<FieldType>
              name={['profile', 'fullname']}
              // rules={[
              //   { required: true, message: 'Please input your fullname!' },
              // ]}
            >
              <Input
                placeholder="Your Full Name"
                defaultValue={regSessionDecoded.user?.name ?? ''}
                value={regSessionDecoded.user?.name ?? ''}
              />
            </Form.Item>
          </div>
          <div className="input-group-meta position-relative mb-0">
            <label>Email*</label>
            <Form.Item<FieldType>
              name={['profile', 'email']}
              // rules={[{ required: true, message: 'Please input your email!' }]}
            >
              <Input
                disabled
                placeholder="Your Email"
                defaultValue={regSessionDecoded.user?.email ?? ''}
              />
            </Form.Item>
          </div>
        </div>
        <div className="col-4">
          <div className="input-group-meta position-relative mb-0">
            <label>Phone Number*</label>
            <Form.Item<FieldType>
              name={['profile', 'phoneNumber']}
              // rules={[
              //   { required: true, message: 'Please input your phone number!' },
              // ]}
            >
              <Input
                placeholder="Your Phone Number"
                defaultValue={regSessionDecoded.candidate?.phone_number ?? ''}
              />
            </Form.Item>
          </div>
          <div className="input-group-meta position-relative mb-0">
            <label>Date of Birth*</label>
            <Form.Item<FieldType>
              name={['profile', 'dateOfBirth']}
              // rules={[
              //   { required: true, message: 'Please input your date of birth!' },
              // ]}
            >
              <DatePicker
                className="w-100"
                defaultValue={dayjs(
                  `${regSessionDecoded.candidate?.date_of_birth ?? '-'}`,
                )}
                placeholder="Select Date"
              />
            </Form.Item>
          </div>
        </div>
        <div className="col-4">
          <div className="input-group-meta position-relative mb-15">
            <label>Place of Birth*</label>
            <Form.Item<FieldType>
              name={['profile', 'placeOfBirth']}
              className="mb-0"
              // rules={[
              //   {
              //     required: true,
              //     message: 'Please input your place of birth!',
              //   },
              // ]}
            >
              <Select
                className="w-100"
                showSearch
                placeholder="Your place of birth"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.label.toLowerCase() ?? '').includes(input)
                }
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? '')
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? '').toLowerCase())
                }
                /* Feted Data */
                options={citysName}
              />
            </Form.Item>
          </div>
        </div>
        <div className="col-4">
          <div className="input-group-meta position-relative mb-15">
            <label>Gender*</label>
            <Form.Item<FieldType>
              name={['profile', 'gender']}
              className="mb-0"
              // rules={[
              //   {
              //     required: true,
              //     message: 'Please input your gender!',
              //   },
              // ]}
            >
              <Select
                className="w-100"
                placeholder="Your Gender"
                options={[
                  { value: 'Male', label: 'Male' },
                  { value: 'Female', label: 'Female' },
                ]}
              />
            </Form.Item>
          </div>
        </div>
        <div className="col-4">
          <div className="input-group-meta position-relative mb-15">
            <label>Religion*</label>
            <Form.Item<FieldType>
              name={['profile', 'religion']}
              className="mb-0"
              // rules={[
              //   {
              //     required: true,
              //     message: 'Please input your religion!',
              //   },
              // ]}
            >
              <Select
                className="w-100"
                showSearch
                placeholder="Your Religion"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.label.toLowerCase() ?? '').includes(input)
                }
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? '')
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? '').toLowerCase())
                }
                options={[
                  {
                    value: 'Islam',
                    label: 'ISLAM',
                  },
                  {
                    value: 'Buddha',
                    label: 'BUDDHA',
                  },
                  {
                    value: 'Hindu',
                    label: 'HINDU',
                  },
                  {
                    value: 'Kristen Katholik',
                    label: 'KRISTEN KATHOLIK',
                  },
                  {
                    value: 'Kristen Protestan',
                    label: 'KRISTEN PROTESTAN',
                  },
                  {
                    value: 'Konghucu',
                    label: 'KONGHUCU',
                  },
                ]}
              />
            </Form.Item>
          </div>
        </div>
        <div className="col-4">
          <div className="input-group-meta position-relative mb-15">
            <label>Ethnicity*</label>
            <Form.Item<FieldType>
              name={['profile', 'ethnicity']}
              className="mb-0"
              // rules={[
              //   {
              //     required: true,
              //     message: 'Please input your ethnicity!',
              //   },
              // ]}
            >
              <Select
                className="w-100"
                showSearch
                placeholder="Your Ethnicity"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.label.toLowerCase() ?? '').includes(input)
                }
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? '')
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? '').toLowerCase())
                }
                /* Fetched Data */
                options={masterData?.ethnicity}
              />
            </Form.Item>
          </div>
        </div>
        <div className="col-4">
          <div className="input-group-meta position-relative mb-15">
            <label>Blood Type</label>
            <Form.Item<FieldType>
              name={['profile', 'bloodType']}
              className="mb-0"
            >
              <Select
                className="w-100"
                placeholder="Your Blood Type"
                options={[
                  { value: 'A', label: 'A' },
                  { value: 'B', label: 'B' },
                  { value: 'AB', label: 'AB' },
                  { value: 'O', label: 'O' },
                ]}
              />
            </Form.Item>
          </div>
        </div>
        <div className="col-4">
          <div className="input-group-meta position-relative mb-15">
            <label>Marital Status*</label>
            <Form.Item<FieldType>
              name={['profile', 'maritalStatus']}
              className="mb-0"
              // rules={[
              //   {
              //     required: true,
              //     message: 'Please input your marital status!',
              //   },
              // ]}
            >
              <Select
                className="w-100"
                showSearch
                placeholder="Your Marital Status"
                optionFilterProp="children"
                onChange={handleChangeMarried}
                filterOption={(input, option) =>
                  (option?.label ?? '').includes(input)
                }
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? '')
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? '').toLowerCase())
                }
                options={[
                  {
                    value: 'Single',
                    label: 'Single',
                  },
                  {
                    value: 'Married',
                    label: 'Married',
                  },
                  {
                    value: 'Divorced',
                    label: 'Divorced',
                  },
                  {
                    value: 'Widow/Widower',
                    label: 'Widow/Widower',
                  },
                ]}
              />
            </Form.Item>
          </div>
        </div>

        <label className="fw-bold mt-5">Address</label>
        <div className="col-12">
          <div className="input-group-meta position-relative mb-15">
            <label>Permanent Address (as per ID/Passport)*</label>
            <Form.Item<FieldType>
              name={['address', 'permanentAddress']}
              className="mb-0"
              // rules={[
              //   {
              //     required: true,
              //     message: 'Please input your permanent address!',
              //   },
              // ]}
            >
              <Input placeholder="Your Permanent Address" />
            </Form.Item>
          </div>
        </div>
        <div className="col-4">
          <div className="input-group-meta position-relative mb-15">
            <label>Country*</label>
            <Form.Item<FieldType>
              name={['address', 'country']}
              className="mb-0"
              // rules={[
              //   {
              //     required: true,
              //     message: 'Please input your country!',
              //   },
              // ]}
            >
              <Select
                className="w-100"
                showSearch
                placeholder="Your Country"
                optionFilterProp="children"
                onChange={handleChangeCountry}
                filterOption={(input, option) =>
                  (option?.label.toLowerCase() ?? '').includes(input)
                }
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? '')
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? '').toLowerCase())
                }
                /* Fetched Data */
                options={masterData?.countrys}
              />
            </Form.Item>
          </div>
        </div>
        <div className="col-4">
          <div className="input-group-meta position-relative mb-15">
            <label>City*</label>
            <Form.Item<FieldType>
              name={['address', 'city']}
              className="mb-0"
              // rules={[
              //   {
              //     required: true,
              //     message: 'Please input your city!',
              //   },
              // ]}
            >
              <Select
                className="w-100"
                showSearch
                placeholder="Your City"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.label.toLowerCase() ?? '').includes(input)
                }
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? '')
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? '').toLowerCase())
                }
                /* Fetched Data */
                options={citysName}
              />
            </Form.Item>
          </div>
        </div>
        <div className="col-4">
          <div className="input-group-meta position-relative mb-15">
            <label>Zip Code*</label>
            <Form.Item<FieldType>
              name={['address', 'zipCode']}
              className="mb-0"
              // rules={[
              //   {
              //     required: true,
              //     message: 'Please input your zip code!',
              //   },
              // ]}
            >
              <Input placeholder="Your Zip Code" />
            </Form.Item>
          </div>
        </div>
        <div className="col-4">
          {country.toLowerCase() === 'indonesia' && (
            <div className="input-group-meta position-relative mb-15">
              <label>RT</label>
              <Form.Item<FieldType>
                name={['address', 'rt']}
                className="mb-0"
                // rules={[
                //   {
                //     required: true,
                //     message: 'Please input your RT!',
                //   },
                // ]}
              >
                <Input placeholder="Your RT" />
              </Form.Item>
            </div>
          )}
        </div>
        <div className="col-4">
          {country.toLowerCase() === 'indonesia' && (
            <div className="input-group-meta position-relative mb-15">
              <label>RW</label>
              <Form.Item<FieldType>
                name={['address', 'rw']}
                className="mb-0"
                // rules={[
                //   {
                //     required: true,
                //     message: 'Please input your RW!',
                //   },
                // ]}
              >
                <Input placeholder="Your RW" />
              </Form.Item>
            </div>
          )}
        </div>
        <div className="col-4">
          {country.toLowerCase() === 'indonesia' && (
            <div className="input-group-meta position-relative mb-15">
              <label>Subdistrict</label>
              <Form.Item<FieldType>
                name={['address', 'subdistrict']}
                className="mb-0"
                // rules={[
                //   {
                //     required: true,
                //     message: 'Please input your subdistrict!',
                //   },
                // ]}
              >
                <Input placeholder="Your Subdistrict" />
              </Form.Item>
            </div>
          )}
        </div>
        <div className="col-4">
          {country.toLowerCase() === 'indonesia' && (
            <div className="input-group-meta position-relative mb-15">
              <label>Village</label>
              <Form.Item<FieldType>
                name={['address', 'village']}
                className="mb-0"
                // rules={[
                //   {
                //     required: true,
                //     message: 'Please input your village!',
                //   },
                // ]}
              >
                <Input placeholder="Your Village" />
              </Form.Item>
            </div>
          )}
        </div>
        <div className="col-12">
          <div className="input-group-meta position-relative mb-0">
            <Form.Item<FieldType> name="addressCheckbox" className="mb-2">
              <div className="d-flex align-items-center pt-10">
                <Checkbox onChange={handleAddressCheck}>
                  Same as Permanent Address
                </Checkbox>
              </div>
            </Form.Item>
          </div>
        </div>
        <div className="col-12">
          <div className="input-group-meta position-relative mb-15">
            <label>Current Address (Domicile)</label>
            <Form.Item<FieldType>
              name={['address', 'currentAddress']}
              className="mb-0"
            >
              <Input
                disabled={addressCheck}
                placeholder="Your Current Address"
              />
            </Form.Item>
          </div>
        </div>

        <label className="fw-bold mt-5 mb-2">Family Structure</label>
        <Tabs
          type="editable-card"
          onChange={onChangeTabs}
          activeKey={activeKey}
          onEdit={onEdit}
          items={items}
        />

        <label className="fw-bold mt-5">Education</label>
        <div className="col-12">
          <div className="input-group-meta position-relative mb-0">
            <Form.Item<FieldType>
              name="formalCheckbox"
              className="mb-0"
              rules={
                !formalCheck
                  ? [
                      {
                        required: true,
                        message: 'Please choose your education!',
                      },
                    ]
                  : []
              }
            >
              <div className="d-flex align-items-center">
                <Checkbox onChange={handleFormalCheck} checked={formalCheck}>
                  Formal
                </Checkbox>
              </div>
            </Form.Item>
          </div>
        </div>
        {formalCheck && (
          <>
            <div className="col-3">
              <div className="input-group-meta position-relative mb-15">
                <label>Education Level*</label>
                <Form.Item<FieldType>
                  name={['education', 'educationLevel']}
                  className="mb-0"
                  // rules={[
                  //   {
                  //     required: true,
                  //     message: 'Please input your education level!',
                  //   },
                  // ]}
                >
                  <Select
                    className="w-100"
                    placeholder="Your Education Level"
                    onChange={onChangeEdu}
                    /* Fetched Data */
                    options={masterData?.education_levels}
                  />
                </Form.Item>
              </div>
            </div>
            <div className="col-3">
              <div className="input-group-meta position-relative mb-15">
                <label>Education Major*</label>
                <Form.Item<FieldType>
                  name={['education', 'educationMajor']}
                  className="mb-0"
                  // rules={[
                  //   {
                  //     required: true,
                  //     message: 'Please input your education major!',
                  //   },
                  // ]}
                >
                  <Select
                    className="w-100"
                    showSearch
                    mode="tags"
                    maxCount={1}
                    disabled={eduLevel === 'SMA/SMK'}
                    placeholder="Your Education Major"
                    optionFilterProp="children"
                    // onChange={handleChangeMarried}
                    filterOption={(input, option) =>
                      (option?.label.toLowerCase() ?? '').includes(input)
                    }
                    filterSort={(optionA, optionB) =>
                      (optionA?.label ?? '')
                        .toLowerCase()
                        .localeCompare((optionB?.label ?? '').toLowerCase())
                    }
                    /* Fetched Data */
                    options={masterData?.education_majors}
                  />
                </Form.Item>
              </div>
            </div>
            <div className="col-3">
              <div className="input-group-meta position-relative mb-15">
                <label>Start Year*</label>
                <Form.Item<FieldType>
                  name={['education', 'startEduYear']}
                  className="mb-0"
                  // rules={[
                  //   {
                  //     required: true,
                  //     message: 'Please select year!',
                  //   },
                  // ]}
                >
                  <DatePicker
                    className="w-100"
                    placeholder="Start Year"
                    picker="year"
                  />
                </Form.Item>
              </div>
            </div>
            <div className="col-3">
              <div className="input-group-meta position-relative mb-15">
                <label>End Year*</label>
                <Form.Item<FieldType>
                  name={['education', 'endEduYear']}
                  className="mb-0"
                  // rules={[
                  //   {
                  //     required: true,
                  //     message: 'Please select year!',
                  //   },
                  // ]}
                >
                  <DatePicker
                    className="w-100"
                    placeholder="End Year"
                    picker="year"
                  />
                </Form.Item>
              </div>
            </div>
            <div className="col-6">
              <div className="input-group-meta position-relative mb-15">
                <label>School/University Name*</label>
                <Form.Item<FieldType>
                  name={['education', 'schoolName']}
                  className="mb-0"
                  // rules={[
                  //   {
                  //     required: true,
                  //     message: 'Please input your school name!',
                  //   },
                  // ]}
                >
                  <Select
                    className="w-100"
                    showSearch
                    mode="tags"
                    maxCount={1}
                    placeholder="Your Education Major"
                    optionFilterProp="children"
                    onChange={handleChangeMarried}
                    filterOption={(input, option) =>
                      (option?.label.toLowerCase() ?? '').includes(input)
                    }
                    filterSort={(optionA, optionB) =>
                      (optionA?.label ?? '')
                        .toLowerCase()
                        .localeCompare((optionB?.label ?? '').toLowerCase())
                    }
                    /* Fetched Data */
                    options={masterData?.education_institutions}
                  />
                </Form.Item>
              </div>
            </div>
            <div className="col-3">
              <div className="input-group-meta position-relative mb-15">
                <label>City*</label>
                <Form.Item<FieldType>
                  name={['education', 'cityOfSchool']}
                  className="mb-0"
                  // rules={[
                  //   {
                  //     required: true,
                  //     message: 'Please input your city of school!',
                  //   },
                  // ]}
                >
                  <Select
                    className="w-100"
                    placeholder="Your City of School"
                    showSearch
                    filterOption={(input, option) =>
                      (option?.label.toLowerCase() ?? '').includes(input)
                    }
                    filterSort={(optionA, optionB) =>
                      (optionA?.label ?? '')
                        .toLowerCase()
                        .localeCompare((optionB?.label ?? '').toLowerCase())
                    }
                    /* Fetched Data */
                    options={masterData?.citys}
                  />
                </Form.Item>
              </div>
            </div>
            <div className="col-3">
              <div className="input-group-meta position-relative mb-15">
                <label>GPA*</label>
                <Form.Item<FieldType>
                  name={['education', 'gpa']}
                  className="mb-0"
                  // rules={[
                  //   {
                  //     required: true,
                  //     message: 'Please input your gpa!',
                  //   },
                  // ]}
                >
                  <InputNumber
                    className="w-100"
                    min={1}
                    max={4}
                    step={0.01}
                    disabled={eduLevel === 'SMA/SMK'}
                    placeholder="Your GPA"
                  />
                </Form.Item>
              </div>
            </div>
          </>
        )}

        <div className="col-12">
          <div className="input-group-meta position-relative mb-0">
            <Form.Item<FieldType> name="certificationCheckbox" className="mb-0">
              <div className="d-flex align-items-center">
                <Checkbox
                  onChange={handleCertificationCheck}
                  checked={certificationCheck}
                >
                  Certification/Licence
                </Checkbox>
              </div>
            </Form.Item>
          </div>
        </div>
        {certificationCheck && (
          <Tabs
            type="editable-card"
            onChange={onChangeCertifTabs}
            activeKey={activeCertifKey}
            onEdit={onEditCertif}
            items={certifItems}
          />
        )}

        <label className="fw-bold mt-5">Skill</label>
        <div className="col-12">
          <div className="input-group-meta position-relative mb-15">
            <label>What skills do you have?*</label>
            <Form.Item<FieldType>
              name="skills"
              className="mb-0"
              // rules={[
              //   {
              //     required: true,
              //     message: 'Please input your skills!',
              //   },
              // ]}
            >
              <Select
                className="w-100"
                showSearch
                mode="tags"
                placeholder="Your Skills"
                optionFilterProp="children"
                // onChange={handleChangeMarried}
                filterOption={(input, option) =>
                  (option?.label.toLowerCase() ?? '').includes(input)
                }
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? '')
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? '').toLowerCase())
                }
                /* Fetched Data */
                options={masterData?.skills}
              />
            </Form.Item>
          </div>
        </div>

        <label className="fw-bold mt-5 mb-2">Language</label>
        <div className="col-12">
          {Array.from({ length: langTotal }, (_, index) => (
            <div key={index} className="row">
              <div className="col-6">
                <div className="input-group-meta position-relative mb-15">
                  <Form.Item<FieldType>
                    name={['language', index.toString(), 'name']}
                    className="mb-0"
                    // rules={[
                    //   {
                    //     required: true,
                    //     message: 'Please choose your language!',
                    //   },
                    // ]}
                  >
                    <Select
                      className="w-100"
                      placeholder="Select Language"
                      dropdownRender={(menu) => (
                        <>
                          {menu}
                          <Divider style={{ margin: '8px 0' }} />
                          <Space style={{ padding: '0 8px 4px' }}>
                            <Input
                              placeholder="Please enter item"
                              ref={inputRef}
                              value={name}
                              onChange={onLanguageChange}
                              onKeyDown={(e) => e.stopPropagation()}
                            />
                            <Button
                              type="text"
                              icon={
                                <PlusOutlined
                                  onPointerEnterCapture=""
                                  onPointerLeaveCapture=""
                                />
                              }
                              onClick={addLanguage}
                            >
                              Add item
                            </Button>
                          </Space>
                        </>
                      )}
                      options={languageItems.map((item) => ({
                        label: item,
                        value: item,
                      }))}
                    />
                  </Form.Item>
                </div>
              </div>
              <div className="col-6">
                <div className="input-group-meta position-relative mb-15">
                  <Form.Item<FieldType>
                    name={['language', index.toString(), 'level']}
                    className="mb-0"
                    // rules={[
                    //   {
                    //     required: true,
                    //     message: 'Please choose your level!',
                    //   },
                    // ]}
                  >
                    <Select
                      className="w-100"
                      placeholder="Select Level"
                      options={[
                        { value: 'fluent', label: 'Fluent' },
                        { value: 'intermediate', label: 'Intermediate' },
                        { value: 'basic', label: 'Basic' },
                      ]}
                    />
                  </Form.Item>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="col-12 d-flex align-items-center">
          <div className="mb-15 me-2">
            <Button onClick={addLangSkill}>ADD</Button>
          </div>
          <div className="mb-15">
            <Button onClick={removeLangSkill}>REMOVE</Button>
          </div>
        </div>

        <label className="fw-bold mt-5 mb-2">Working Experience</label>
        <div className="col-12">
          <div className="input-group-meta position-relative mb-15">
            <Form.Item<FieldType>
              name="expOption"
              className="mb-0"
              // rules={[
              //   {
              //     required: true,
              //     message: 'Please choose your working experience!',
              //   },
              // ]}
            >
              <Radio.Group onChange={onChangeExp} value={expValue}>
                <Radio className="d-flex" value="Fresh Graduate">
                  Fresh Graduate
                </Radio>
                <Radio className="d-flex" value="Professional">
                  Professional
                </Radio>
              </Radio.Group>
            </Form.Item>
          </div>
        </div>
        {expValue === 'Fresh Graduate' && (
          <div className="col-6">
            <div className="input-group-meta position-relative mb-15">
              <label>Expected Salary (gross Monthly)*</label>
              <Form.Item<FieldType>
                name={['experience', 'expectedSalary']}
                className="mb-0"
                // rules={[
                //   {
                //     required: true,
                //     message: 'Please input your expected salary!',
                //   },
                // ]}
              >
                <InputNumber
                  className="w-100"
                  min={0}
                  placeholder="Input Expected Salary"
                  formatter={(value) =>
                    `Rp ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
                  }
                  parser={(value: string | undefined): string | number =>
                    value!.replace(/\Rp\s?|(\.*)/g, '')
                  }
                />
              </Form.Item>
            </div>
          </div>
        )}

        {expValue === 'Professional' && (
          <Tabs
            type="editable-card"
            onChange={onChangeExpTabs}
            activeKey={activeExpKey}
            onEdit={onEditExp}
            items={expItems}
          />
        )}

        <label className="fw-bold mt-5">Others</label>
        <div className="col-3">
          <div className="input-group-meta position-relative mb-15">
            <label>Emergency Contact Relation</label>
            <Form.Item<FieldType>
              name={['others', 'emergencyContactRelation']}
              className="mb-0"
            >
              <Select
                className="w-100"
                placeholder="Your Emergency Contact Relation"
                options={[
                  { value: 'Father', label: 'Father' },
                  { value: 'Mother', label: 'Mother' },
                  { value: 'Sibling', label: 'Sibling' },
                  { value: 'Spouse', label: 'Spouse' },
                  { value: 'Children', label: 'Children' },
                ]}
              />
            </Form.Item>
          </div>
        </div>
        <div className="col-3">
          <div className="input-group-meta position-relative mb-15">
            <label>Name</label>
            <Form.Item<FieldType>
              name={['others', 'emergencyContactName']}
              className="mb-0"
            >
              <Input placeholder="Your Emergency Contact Name" />
            </Form.Item>
          </div>
        </div>
        <div className="col-3">
          <div className="input-group-meta position-relative mb-15">
            <label>Phone Number</label>
            <Form.Item<FieldType>
              name={['others', 'emergencyContactPhoneNumber']}
              className="mb-0"
            >
              <Input placeholder="Your Emergency Contact Phone Number" />
            </Form.Item>
          </div>
        </div>
        <div className="col-3">
          <div className="input-group-meta position-relative mb-15">
            <label>How long your notice period?*</label>
            <Form.Item<FieldType>
              name={['others', 'noticePeriod']}
              className="mb-0"
              // rules={[
              //   {
              //     required: true,
              //     message: 'Please input your notice period!',
              //   },
              // ]}
            >
              <Select
                className="w-100"
                placeholder="Your Notice Period"
                options={[
                  { value: 'Ready join now', label: 'Ready join now' },
                  { value: 'Less than 1 month', label: 'Less than 1 month' },
                  { value: '1 month', label: '1 month' },
                  { value: '2 months', label: '2 months' },
                  { value: '3 months', label: '3 months' },
                  { value: 'More than 3 months', label: 'More than 3 months' },
                ]}
              />
            </Form.Item>
          </div>
        </div>
        <div className="col-12">
          <div className="input-group-meta position-relative mb-15">
            <label>Have you ever worked in Erajaya group of companies?*</label>
            <Form.Item<FieldType>
              name="everWorkedOption"
              className="mb-0"
              // rules={[
              //   {
              //     required: true,
              //     message: 'Please choose!',
              //   },
              // ]}
            >
              <Radio.Group onChange={everWorkedChange} value={everWorked}>
                <Radio className="d-flex" value="No">
                  No
                </Radio>
                <Radio className="d-flex" value="Yes">
                  Yes
                </Radio>
              </Radio.Group>
            </Form.Item>
            {everWorked === 'Yes' && (
              <div className="row mt-2">
                <div className="col-3">
                  <Form.Item<FieldType>
                    name={['others', 'everWorkedMonth']}
                    className="mb-0"
                    // rules={[
                    //   {
                    //     required: true,
                    //     message: 'Please input year!',
                    //   },
                    // ]}
                  >
                    <DatePicker
                      className="w-100"
                      placeholder="Start Year"
                      picker="month"
                    />
                  </Form.Item>
                </div>
                <div className="col-3">
                  <Form.Item<FieldType>
                    name={['others', 'everWorkedYear']}
                    className="mb-0"
                    // rules={[
                    //   {
                    //     required: true,
                    //     message: 'Please input year!',
                    //   },
                    // ]}
                  >
                    <DatePicker
                      className="w-100"
                      placeholder="End Year"
                      picker="month"
                    />
                  </Form.Item>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="col-12">
          <div className="input-group-meta position-relative mb-15">
            <label>
              Do you have any prior medical conditions, illnesses, or congenital
              diseases?*
            </label>
            <Form.Item<FieldType>
              name="diseaseOption"
              className="mb-0"
              // rules={[
              //   {
              //     required: true,
              //     message: 'Please choose!',
              //   },
              // ]}
            >
              <Radio.Group onChange={diseaseChange} value={disease}>
                <Radio className="d-flex" value="No">
                  No
                </Radio>
                <Radio className="d-flex" value="Yes">
                  Yes
                </Radio>
              </Radio.Group>
            </Form.Item>
            {disease === 'Yes' && (
              <div className="row mt-2">
                <div className="col-3">
                  <Form.Item<FieldType>
                    name={['others', 'diseaseName']}
                    className="mb-0"
                    // rules={[
                    //   {
                    //     required: true,
                    //     message: 'Please input medical condition!',
                    //   },
                    // ]}
                  >
                    <Input placeholder="Medical Condition" />
                  </Form.Item>
                </div>
                <div className="col-3">
                  <Form.Item<FieldType>
                    name={['others', 'diseaseYear']}
                    className="mb-0"
                    // rules={[
                    //   {
                    //     required: true,
                    //     message: 'Please input year!',
                    //   },
                    // ]}
                  >
                    <DatePicker
                      className="w-100"
                      placeholder="Select Year"
                      picker="year"
                    />
                  </Form.Item>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="col-12">
          <div className="input-group-meta position-relative mb-15">
            <label>
              Do you have any friends, colleague, relative or family who is
              working at Erajaya Group Companies?*
            </label>
            <Form.Item<FieldType>
              name="relationOption"
              className="mb-0"
              // rules={[
              //   {
              //     required: true,
              //     message: 'Please choose!',
              //   },
              // ]}
            >
              <Radio.Group onChange={haveRelationChange} value={haveRelation}>
                <Radio className="d-flex" value="No">
                  No
                </Radio>
                <Radio className="d-flex" value="Yes">
                  Yes
                </Radio>
              </Radio.Group>
            </Form.Item>
            {haveRelation === 'Yes' && (
              <div className="row mt-2">
                <div className="col-3">
                  <Form.Item<FieldType>
                    name={['others', 'relationName']}
                    className="mb-0"
                    // rules={[
                    //   {
                    //     required: true,
                    //     message: 'Please input name!',
                    //   },
                    // ]}
                  >
                    <Input placeholder="Name" />
                  </Form.Item>
                </div>
                <div className="col-3">
                  <Form.Item<FieldType>
                    name={['others', 'relationPosition']}
                    className="mb-0"
                    // rules={[
                    //   {
                    //     required: true,
                    //     message: 'Please input position!',
                    //   },
                    // ]}
                  >
                    <Input placeholder="Position" />
                  </Form.Item>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="col-12">
          <div className="input-group-meta position-relative mb-15">
            <label>Upload CV*</label>
            <Form.Item<FieldType>
              name={['others', 'uploadCV']}
              className="mb-0"
              // rules={[
              //   {
              //     required: true,
              //     message: 'Please upload your cv!',
              //   },
              // ]}
            >
              <Upload action="" listType="text" maxCount={1} accept=".pdf">
                <Button
                  icon={
                    // <UploadOutlined
                    //   onPointerEnterCapture={''}
                    //   onPointerLeaveCapture={''}
                    // />
                    <AiOutlineUpload />
                  }
                >
                  Upload
                </Button>
              </Upload>
            </Form.Item>
          </div>
        </div>

        <div className="button-group d-inline-flex align-items-center mt-30 mb-0">
          <button type="submit" className="dash-btn-two tran3s me-3">
            Submit
          </button>
        </div>
      </div>

      <Modal
        title="Confirmation"
        open={isModalOpen}
        centered
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <p>Have you filled in the data correctly?</p>
      </Modal>
    </Form>
  );
};

export default Stage3Form;
