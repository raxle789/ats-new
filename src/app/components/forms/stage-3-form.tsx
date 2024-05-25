'use client';
import React, { useState, useEffect, useRef } from 'react';
import {
  createCandidate,
  RegisterPhase2,
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
  TrialTestFunction,
  updateCandidate,
} from '@/libs/Registration';
import { userRegister2 } from '@/libs/validations/Register';
import { setRegisterStep } from '@/redux/features/fatkhur/registerSlice';
import { useAppDispatch } from '@/redux/hook';
import {
  Input,
  Form,
  Spin,
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
  Alert,
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
import { authSession, regSession } from '@/libs/Sessions/utils';
import { DecryptSession } from '@/libs/Sessions/jwt';
import { convertToPlainObject, fileToBase64, ManipulateDocuments, zodErrors } from '@/libs/Registration/utils';
import { setUserSession } from '@/libs/Sessions';
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

export type FieldType = {
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
  addressCheckbox?: boolean;
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
  // certifications?: [
  //   {
  //     certificationName?: string;
  //     institution?: string;
  //     issueDate?: string;
  //     monthIssue?: string;
  //     yearIssue?: string;
  //   }
  // ];
  certification?: {
    [id: string]: {
      certificationName?: string;
      institution?: string;
      issueDate?: string;
      monthIssue?: string;
      yearIssue?: string;
    };
  };
  skills?: string[];
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
    value: string;
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
  const [errors, setErrors] = useState<any | undefined | null>(null);

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
    console.info('FETCHED JOB LEVEL -> ', jobLevelsData);
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
    console.log('CURRENT', e.target.checked);
    setAddressCheck(e.target.checked);
  };

  const [index, setIndex] = useState<number>(0);

  type Tprops1 = {
    index: number;
  };

  const TabContent: React.FC<Tprops1> = ({ index }) => {
    return (
      <div key={index} className="row">
        <div className="col-6">
          <div className="input-group-meta position-relative mb-15">
            <label>Relation</label>
            <Form.Item<FieldType>
              name={['families', index.toString(), 'relation']}
              className="mb-0"
              /* Example Error for families */
              validateStatus={errors && errors.families && errors.families.relation ? 'error' : ''}
              help={errors && errors.families && errors.families.relation?._errors.toString()}
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
              validateStatus={errors && errors.families && errors.families.name ? 'error' : ''}
              help={errors && errors.families && errors.families.name?._errors.toString()}
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
              validateStatus={errors && errors.families && errors.families.gender ? 'error' : ''}
              help={errors && errors.families && errors.families.gender?._errors.toString()}
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
              validateStatus={errors && errors.families && errors.families.dateOfBirth ? 'error' : ''}
              help={errors && errors.families && errors.families.dateOfBirth?._errors.toString()}
            >
              <DatePicker
                className="w-100"
                placeholder="Select Date"
                onChange={onChangeDate}
              />
            </Form.Item>
          </div>
        </div>
      </div>
    );
  };

  const initialItems: any[] = [
    { label: 'Relation 1', children: <TabContent index={index} />, key: '1' },
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
      children: <TabContent index={index} />,
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
  type Tprops2 = {
    certificationIdx: number;
  };

  const CertifTabContent: React.FC<Tprops2> = ({ certificationIdx }) => {
    return (
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
              name={[
                'certification',
                certificationIdx.toString(),
                'institution',
              ]}
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
                name={[
                  'certification',
                  certificationIdx.toString(),
                  'yearIssue',
                ]}
                className="mb-0"
              >
                <DatePicker placeholder="Select Year" picker="year" />
              </Form.Item>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const certifInitItems: any[] = [
    // {
    //   label: 'Certification 1',
    //   children: <CertifTabContent certificationIdx={index} />,
    //   key: '1',
    // },
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
      children: <CertifTabContent certificationIdx={index} />,
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
    console.log('formalCheck: ', formalCheck);
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

  const [expIdx, setExpIdx] = useState<number>(0);
  type Tprops3 = {
    expIdx: number;
  };

  const ExpTabContent: React.FC<Tprops3> = ({ expIdx }) => {
    const [yearState, setYearState] = useState<{ [key: string]: boolean }>({});
    const handleCheckboxChange: any = (e: any, expIdx: number) => {
      setYearState((prevState) => ({
        ...prevState,
        [expIdx.toString()]: e.target.checked,
      }));
    };

    const [jobDescValue, setJobDescValue] = useState<string>('');
    return (
      <div key={expIdx} className="row">
        <div className="col-6">
          <div className="input-group-meta position-relative mb-15">
            <label>Job Title*</label>
            <Form.Item<FieldType>
              name={['experience', expIdx.toString(), 'jobTitle']}
              className="mb-0"
              // rules={[
              //   {
              //     required: true,
              //     message: 'Please input your job title!',
              //   },
              // ]}
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
              // rules={[
              //   {
              //     required: true,
              //     message: 'Please input your job function!',
              //   },
              // ]}
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
              // rules={[
              //   {
              //     required: true,
              //     message: 'Please input your line industry!',
              //   },
              // ]}
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
              // rules={[
              //   {
              //     required: true,
              //     message: 'Please input your position level!',
              //   },
              // ]}
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
              // rules={[
              //   {
              //     required: true,
              //     message: 'Please input your company name!',
              //   },
              // ]}
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
              // rules={[
              //   {
              //     required: true,
              //     message: 'Please choose start year!',
              //   },
              // ]}
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
              // rules={[
              //   {
              //     required: true,
              //     message: 'Please choose end year!',
              //   },
              // ]}
            >
              <DatePicker
                className="w-100"
                placeholder="Select Year"
                picker="month"
                disabled={yearState[expIdx.toString()]}
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
              <Checkbox onChange={(e) => handleCheckboxChange(e, expIdx)}>
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
              // rules={[
              //   {
              //     required: true,
              //     message: 'Please input your expected salary!',
              //   },
              // ]}
              validateStatus={errors?.expectedSalary ? 'error' : ''}
              help={errors?.expectedSalary?._errors.toString()}
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
      </div>
    );
  };

  const initExpItems: any[] = [
    // {
    //   label: 'Experience 1',
    //   children: <ExpTabContent expIdx={expIdx} />,
    //   key: '1',
    // },
  ];
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
      children: <ExpTabContent expIdx={expIdx} />,
      key: newActiveKey,
    });
    setExpItems(newPanes);
    setActiveExpKey(newActiveKey);
    setExpIdx(expIdx + 1);
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
  const [spinning, setSpinning] = useState(false);

  /* ACTIONS */
  /* ACTIONS */
  const handleOk = async () => {
    setIsModalOpen(false);
    // setSpinning(true);
    let values = form.getFieldsValue();
    console.log('ok value form: ', values);
    if (values.families[0].relation) {
    } else {
      values = { ...values, families: null };
    }
    // debugger;
    /**
     * Transform File object into ready to store file.
     * @return transformed file base64 or zodErrors
     */
    const transformedDocuments = await ManipulateDocuments({
      profilePhoto: profilePhoto ? profilePhoto[0].originFileObj : null,
      curriculumVitae: values.others?.uploadCV ? values.others?.uploadCV.file.originFileObj : null
    });
    if(!Array.isArray(transformedDocuments)) {
      return setErrors(transformedDocuments as zodErrors);
    };
    const plainObjects = JSON.parse(JSON.stringify(values));
    /* JANGAN DI DELETE, TESTING PURPOSE */
    // await TrialTestFunction(plainObjects, transformedDocuments);
    const doRegisterPhase2 = await RegisterPhase2(plainObjects, transformedDocuments);
    if(!doRegisterPhase2.success) {
      console.info(doRegisterPhase2.errors);
      setErrors(doRegisterPhase2.errors);
      setSpinning(false);
      return message.error(doRegisterPhase2.message);
    };
    setSpinning(false);
    message.success(doRegisterPhase2.message);
    return dispatch(setRegisterStep(4));
  };
  /* END OF ACTIONS */

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
        fullname: regSessionDecoded.user?.name ?? '',
        email: regSessionDecoded.user?.email ?? '',
        phoneNumber: regSessionDecoded.candidate?.phone_number ?? '',
        dateOfBirth: dayjs(regSessionDecoded.candidate?.date_of_birth) ?? '',
      },
      addressCheckbox: false,
      formalCheckbox: true,
      certificationCheckbox: false,
    });

    setIndex(index + 1);

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

  /* SHOW FIRST CERTIF AND EXP TAB */
  // const [tabAdditionState, setTabAdditionState] = useState(true);
  // useEffect(() => {
  //   if (masterData && masterData.certificates_name && masterData.job_levels) {
  //     if (tabAdditionState) {
  //       addCertif();
  //       addExp();
  //       setTabAdditionState(false);
  //     }
  //   }
  // }, [masterData]);
  return (
    <>
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
                validateStatus={errors && errors.profilePhoto ? 'error' : ''}
                help={errors && errors.profilePhoto?.toString()}
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
                // validateStatus={errors && errors.profile ? 'error' : ''}
                // help={errors && errors.profile[0]}
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
                // validateStatus={errors && errors.email ? 'error' : ''}
                // help={errors && errors.email}
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
                // validateStatus={errors && errors.phoneNumber ? 'error' : ''}
                // help={errors && errors.phoneNumber}
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
                // validateStatus={errors && errors.dateOfBirth ? 'error' : ''}
                // help={errors && errors.dateOfBirth}
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
                validateStatus={errors && errors.profile && errors.profile.placeOfBirth ? 'error' : ''}
                help={errors && errors.profile && errors.profile.placeOfBirth._errors.toString()}
              >
                <Select
                  className="w-100"
                  showSearch
                  mode="tags"
                  maxCount={1}
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
                  options={citysName as { value: string; label: string }[]}
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
                validateStatus={errors && errors.profile && errors.profile.gender ? 'error' : ''}
                help={errors && errors.profile && errors.profile.gender._errors.toString()}
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
                validateStatus={errors && errors.profile && errors.profile.religion ? 'error' : ''}
                help={errors && errors.profile && errors.profile.religion._errors.toString()}
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
                      label: 'Islam',
                    },
                    {
                      value: 'Buddha',
                      label: 'Buddha',
                    },
                    {
                      value: 'Hindu',
                      label: 'Hindu',
                    },
                    {
                      value: 'Kristen Katholik',
                      label: 'Kristen Katholik',
                    },
                    {
                      value: 'Kristen Protestan',
                      label: 'Kristen Protestan',
                    },
                    {
                      value: 'Konghucu',
                      label: 'Konghucu',
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
                validateStatus={errors && errors.profile && errors.profile.ethnicity ? 'error' : ''}
                help={errors && errors.profile && errors.profile.ethnicity._errors.toString()}
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
                validateStatus={errors && errors.profile && errors.profile.bloodType ? 'error' : ''}
                help={errors && errors.profile && errors.profile.bloodType._errors.toString()}
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
                validateStatus={errors && errors.profile && errors.profile.maritalStatus ? 'error' : ''}
                help={errors && errors.profile && errors.profile.maritalStatus._errors.toString()}
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
                validateStatus={errors && errors.address && errors.address.permanentAddress ? 'error' : ''}
                help={errors && errors.address && errors.address.permanentAddress?._errors.toString()}
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
                validateStatus={errors && errors.address && errors.address.country ? 'error' : ''}
                help={errors && errors.address && errors.address.country?._errors.toString()}
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
                validateStatus={errors && errors.address && errors.address.city ? 'error' : ''}
                help={errors && errors.address && errors.address.city?._errors.toString()}
              >
                <Select
                  className="w-100"
                  showSearch
                  mode="tags"
                  maxCount={1}
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
                  options={citysName as { value: string; label: string }[]}
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
                validateStatus={errors && errors.address && errors.address.zipCode ? 'error' : ''}
                help={errors && errors.address && errors.address.zipCode?._errors.toString()}
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
                  validateStatus={errors && errors.address && errors.address.rt ? 'error' : ''}
                  help={errors && errors.address && errors.address.rt?._errors.toString()}
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
                  validateStatus={errors && errors.address && errors.address.rw ? 'error' : ''}
                  help={errors && errors.address && errors.address.rw?._errors.toString()}
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
                  validateStatus={errors && errors.address && errors.address.subdistrict ? 'error' : ''}
                  help={errors && errors.address && errors.address.subdistrict?._errors.toString()}
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
                  validateStatus={errors && errors.address && errors.address.village ? 'error' : ''}
                  help={errors && errors.address && errors.address.village?._errors.toString()}
                >
                  <Input placeholder="Your Village" />
                </Form.Item>
              </div>
            )}
          </div>
          <div className="col-12">
            <div className="input-group-meta position-relative mb-0">
              <Form.Item<FieldType> name="addressCheckbox" className="mb-2">
                {/* <div className="d-flex align-items-center pt-10"> */}
                <Checkbox
                  onChange={handleAddressCheck}
                  checked={addressCheck}
                  value={addressCheck}
                >
                  Same as Permanent Address
                </Checkbox>
                {/* </div> */}
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
          {errors?.families ?
            <Alert message='If you have married, please fill in families structure with your spouse data' type='error' style={{ marginBottom: '1em' }} /> :
            ''
          }
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
                    validateStatus={errors && errors.education && errors.education.educationLevel ? 'error' : ''}
                    help={errors && errors.education && errors.education.educationLevel?._errors.toString()}
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
                    validateStatus={errors && errors.education && errors.education.educationMajor ? 'error' : ''}
                    help={errors && errors.education && errors.education.educationMajor?._errors.toString()}
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
                    validateStatus={errors && errors.education && errors.education.startEduYear ? 'error' : ''}
                    help={errors && errors.education && errors.education.startEduYear?._errors.toString()}
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
                    validateStatus={errors && errors.education && errors.education.endEduYear ? 'error' : ''}
                    help={errors && errors.education && errors.education.endEduYear?._errors.toString()}
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
                    validateStatus={errors && errors.education && errors.education.schoolName ? 'error' : ''}
                    help={errors && errors.education && errors.education.schoolName?._errors.toString()}
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
                    validateStatus={errors && errors.education && errors.education.cityOfSchool ? 'error' : ''}
                    help={errors && errors.education && errors.education.cityOfSchool?._errors.toString()}
                  >
                    <Select
                      className="w-100"
                      placeholder="Your City of School"
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
                    validateStatus={errors && errors.education && errors.education.gpa ? 'error' : ''}
                    help={errors && errors.education && errors.education.gpa?._errors.toString()}
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
              <Form.Item<FieldType>
                name="certificationCheckbox"
                className="mb-0"
              >
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
                validateStatus={errors && errors.skills ? 'error' : ''}
                help={errors && errors.skills?.skill?._errors.toString()}
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
                      validateStatus={errors && errors.language && errors.language.name ? 'error' : ''}
                      help={errors && errors.language && errors.language.name?._errors.toString()}
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
                      validateStatus={errors && errors.language && errors.language.name ? 'error' : ''}
                      // help={errors && errors.language && errors.language[0].level?._errors.toString()}
                    >
                      <Select
                        className="w-100"
                        placeholder="Select Level"
                        options={[
                          {
                            value: 'Elementary proficiency',
                            label: 'Elementary proficiency',
                          },
                          {
                            value: 'Limited working proficiency',
                            label: 'Limited working proficiency',
                          },
                          {
                            value: 'Professional working proficiency',
                            label: 'Professional working proficiency',
                          },
                          {
                            value: 'Full professional proficiency',
                            label: 'Full professional proficiency',
                          },
                          {
                            value: 'Native or bilingual proficiency',
                            label: 'Native or bilingual proficiency',
                          },
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
          {/* Error Alert Experiences */}
          {errors?.expOption ?
            <Alert message={errors.expOption?._errors.toString()} type="error" style={{ marginBottom: '1em' }} /> :
            errors?.experience ?
            <Alert message={errors.experience?._errors.toString() + ', or click (+) button'} type='error' style={{ marginBottom: '1em' }} /> :
            errors?.expectedSalary ?
            <Alert message={'Please fill in all required working experience fields'} type='error' style={{ marginBottom: '1em' }} /> :
            ''
          }
          <div className="col-12">
            <div className="input-group-meta position-relative mb-15">
              <Form.Item<FieldType>
                name="expOption"
                className="mb-0"
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
                  validateStatus={errors?.expectedSalary ? 'error' : ''}
                  help={errors?.expectedSalary?._errors?.toString()}
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
                validateStatus={errors && errors?.others?.noticePeriod ? 'error' : ''}
                help={errors?.others?.noticePeriod?._errors.toString()}
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
                    {
                      value: 'More than 3 months',
                      label: 'More than 3 months',
                    },
                  ]}
                />
              </Form.Item>
            </div>
          </div>
          <div className="col-12">
            <div className="input-group-meta position-relative mb-15">
              <label>
                Have you ever worked in Erajaya group of companies?*
              </label>
              <Form.Item<FieldType>
                name="everWorkedOption"
                className="mb-0"
                validateStatus={errors && errors.everWorkedOption ? 'error' : ''}
                help={errors?.everWorkedOption?._errors.toString()}
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
                Do you have any prior medical conditions, illnesses, or
                congenital diseases?*
              </label>
              <Form.Item<FieldType>
                name="diseaseOption"
                className="mb-0"
                validateStatus={errors && errors.diseaseOption ? 'error' : ''}
                help={errors?.diseaseOption?._errors.toString()}
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
                    >
                      <Input placeholder="Medical Condition" />
                    </Form.Item>
                  </div>
                  <div className="col-3">
                    <Form.Item<FieldType>
                      name={['others', 'diseaseYear']}
                      className="mb-0"
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
                validateStatus={errors && errors.relationOption ? 'error' : ''}
                help={errors?.relationOption?._errors.toString()}
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
                    >
                      <Input placeholder="Name" />
                    </Form.Item>
                  </div>
                  <div className="col-3">
                    <Form.Item<FieldType>
                      name={['others', 'relationPosition']}
                      className="mb-0"
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
                validateStatus={errors && errors.curriculumVitae ? 'error' : ''}
                help={errors && errors.curriculumVitae?.toString()}
              >
                <Upload action="" listType="picture" maxCount={1} accept=".pdf">
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
          // confirmLoading={confirmLoading}
          onCancel={handleCancel}
        >
          <p>Have you filled in the data correctly?</p>
        </Modal>
      </Form>

      <Spin fullscreen spinning={spinning} />
    </>
  );
};

export default Stage3Form;
