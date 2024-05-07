import React, { useState, useRef, useEffect } from 'react';
import ImageNext from 'next/image';
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
import { MdOutlineModeEdit } from 'react-icons/md';
import { getAddress, getEducation, getEmergency, getFamilies, getLanguages, getProfileNCandidate, getQuestions, getSkills } from '@/libs/Candidate/retrieve-data';
import dayjs from 'dayjs';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];
type TargetKey = React.MouseEvent | React.KeyboardEvent | string;
let languageIndex = 0;

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

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

const PersonalDataForm = () => {
  const [form] = Form.useForm();
  const [editState, setEditState] = useState(false);
  const editOnChange = () => {
    setEditState(!editState);
  };
  const [citysName, setCitysName] = useState<
    { value: string; label: string }[] | null
  >(null);
  const [masterData, setMasterData] = useState<MasterData | null>(null);
  /* From Fetched */
  const [profileData, setProfileData] = useState<any>({});
  const [addresses, setAddresses] = useState<any>({});
  const [families, setFamilies] = useState<any>({});
  const [education, setEducation] = useState<any>({});
  const [skills, setSkills] = useState<any>({});
  const [languages, setLanguages] = useState<any>({});
  const [emergency, setEmergency] = useState<any>({});
  const [questions, setQuestions] = useState<any>({});
  const [error, setError] = useState<string>('');

  const fetchProfileData = async () => {
    const profileData = await getProfileNCandidate();
    if(!profileData.success) return setError(profileData.message as string);
    setPreviewImage(profileData.data?.document);
    return setProfileData(profileData.data?.profile);
  };

  const fetchAddress = async () => {
    const addressesData = await getAddress();
    if(!addressesData.success) return setError(addressesData.message as string);
    setAddresses(addressesData.data);
  };

  const fetchFamilies = async () => {
    const familiesData = await getFamilies();
    if(!familiesData.success) return setError(familiesData.message as string);
    return setFamilies(familiesData.data);
  };

  const fetchEducation = async () => {
    const educationData = await getEducation();
    if(!educationData.success) return message.error(educationData.message as string);
    return setEducation(educationData.data);
  };

  const fetchSkills = async () => {
    const skillsData = await getSkills();
    if(!skillsData.success) return message.error(skillsData.message as string);
    return setSkills(skillsData.data);
  };

  const fetchLanguages = async () => {
    const languagesData = await getLanguages();
    if(!languagesData.success) return message.error(languagesData.message as string);
    return setLanguages(languagesData.data);
  };

  const fetchEmergency = async () => {
    const emergencyData = await getEmergency();
    if(!emergencyData.success) return message.error(emergencyData.message as string);
    return setEmergency(emergencyData.data);
  };

  const fetchQuestions = async () => {
    const questionsData = await getQuestions();
    if(!questionsData.success) return message.error(questionsData.message as string);
    return setQuestions(questionsData.data);
  }

  useEffect(() => {
    fetchProfileData();
    fetchAddress();
    fetchFamilies();
    fetchEducation();
    fetchSkills();
    fetchLanguages();
    fetchEmergency();
    fetchQuestions();
  }, []);

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

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [profilePhoto, setProfilePhoto] = useState<any>();
  const [fileList, setFileList] = useState<UploadFile[]>([]);

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
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    };
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
              disabled={!editState}
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
            <Input placeholder="Your Relation Name" disabled={!editState} />
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
              disabled={!editState}
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
              disabled={!editState}
              // onChange={onChangeDate}
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
              disabled={!editState}
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
            <Input placeholder="Your Institution" disabled={!editState} />
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
              <DatePicker
                placeholder="Select Month"
                picker="month"
                disabled={!editState}
              />
            </Form.Item>
            <Form.Item<FieldType>
              name={['certification', certificationIdx.toString(), 'yearIssue']}
              className="mb-0"
            >
              <DatePicker
                placeholder="Select Year"
                picker="year"
                disabled={!editState}
              />
            </Form.Item>
          </div>
        </div>
      </div>
    </div>,
  ];

  const certifInitItems: any[] = [];
  const [activeCertifKey, setActiveCertifKey] = useState('');
  const [certifItems, setCertifItems] = useState(certifInitItems);
  const newCertifTabIndex = useRef(0);

  const onChangeCertifTabs = (newActiveKey: any) => {
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

  const handleSubmit: FormProps<FieldType>['onFinish'] = (values) => {
    if (editState) {
      // jalankan simpan data
    };
    console.log('Submitted Value -> ', values);
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
  // console.info('Candidate -> ', profileData.candidate?.users?.email);
  // console.info('Address', addresses.street);
  // console.info('Address check value -> ', addresses[0]?.street);
  useEffect(() => {
    form.setFieldsValue({
      profile: {
        email: profileData.candidate?.users?.email,
        fullname: profileData.candidate?.users.name,
        phoneNumber: profileData.candidate?.phone_number,
        dateOfBirth: dayjs(profileData.candidate?.date_of_birth),
        placeOfBirth: profileData.candidate?.birthCity,
        gender: profileData.candidate?.gender,
        religion: profileData.candidate?.religion,
        ethnicity: profileData.candidate?.ethnicity,
        bloodType: profileData.candidate?.blood_type,
        maritalStatus: profileData.candidate?.maritalStatus
      },
      addressCheckbox: addresses.length === 2 ? false : true,
      address: {
        permanentAddress: addresses[0]?.street,
        country: addresses[0]?.country,
        rt: addresses[0]?.rt,
        rw: addresses[0]?.rw,
        city: addresses[0]?.city,
        subdistrict: addresses[0]?.subdistrict,
        village: addresses[0]?.village,
        zipCode: addresses[0]?.zipCode,
        currentAddress: addresses.length === 2 ? addresses[1]?.currentAddress : addresses[0]?.street
      },
      families: {
        0: {
          relation: families[0]?.relationStatus,
          name: families[0]?.name,
          gender: families[0]?.gender,
          dateOfBirth: dayjs(families[0]?.dateOfBirth)
        },
        1: {
          relation: families[1]?.relationStatus,
          name: families[1]?.name,
          gender: families[1]?.gender,
          dateOfBirth: dayjs(families[1]?.dateOfBirth)
        },
      },
      skills: skills,
      education: {
        educationLevel: education?.level,
        educationMajor: education?.major,
        schoolName: education?.university_name,
        gpa: education?.gpa,
        cityOfSchool: education?.cityOfSchool,
        startEduYear: dayjs(education?.start_year),
        endEduYear: dayjs(education?.end_year),
      },
      language: languages,
      others: {
        emergencyContactName: emergency?.name,
        emergencyContactPhoneNumber: emergency?.phoneNumber,
        emergencyContactRelation: emergency?.relationStatus,
        noticePeriod: questions[0],
        // everWorkedMonth: ,
        // everWorkedYear: ,
        diseaseName: questions[1],
        diseaseYear: '2027',
        relationName: 'Wika Salim',
        relationPosition: 'Mantan Istri'
      }
    });
  }, [profileData, addresses, families, education, skills]);
  useEffect(() => {
    if(families.length > 1) {
      families.forEach(val => {
        add();
      });
    };
  }, [families]);
  return (
    <>
      <div>
        <div className="mb-25">
          <button
            className="d-flex align-items-center justify-content-center edit-btn-form"
            onClick={editOnChange}
          >
            <MdOutlineModeEdit className="edit-form-icon" />
          </button>
        </div>
        <Form
          name="personal-data-form"
          variant="filled"
          form={form}
          onFinish={handleSubmit}
          onFinishFailed={onFinishFailed}
        >
          <div className="row">
            <label className="fw-bold">Profile</label>
            <div className="col-4">
              <div className="input-group-meta position-relative mb-15">
                <label>Upload Photo*</label>
                <ImageNext src={previewImage} alt='Profile' width={60} height={60}/>
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
                      disabled={!editState}
                    >
                      {!fileList[0] && (
                        <button
                          style={{ border: 0, background: 'none' }}
                          type="button"
                        >
                          <PlusOutlined
                            onPointerEnterCapture={''}
                            onPointerLeaveCapture={''}
                          />
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
                    disabled={!editState}
                    // defaultValue={regSessionDecoded.user?.name ?? ''}
                    // value={regSessionDecoded.user?.name ?? ''}
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
                    placeholder="Your Email"
                    disabled
                    defaultValue={profileData.candidate?.users?.email}
                    // defaultValue={regSessionDecoded.user?.email ?? ''}
                  />
                </Form.Item>
              </div>
            </div>
            <div className="col-4">
              <div className="input-group-meta position-relative mb-0">
                <label>Phone Number*</label>
                <Form.Item<FieldType>
                  name={['profile', 'phoneNumber']}
                  rules={[
                    {
                      required: true,
                      message: 'Please input your phone number!',
                    },
                  ]}
                >
                  <Input
                    placeholder="Your Phone Number"
                    disabled={!editState}
                    // defaultValue={regSessionDecoded.candidate?.phone_number ?? ''}
                  />
                </Form.Item>
              </div>
              <div className="input-group-meta position-relative mb-0">
                <label>Date of Birth*</label>
                <Form.Item<FieldType>
                  name={['profile', 'dateOfBirth']}
                  rules={[
                    {
                      required: true,
                      message: 'Please input your date of birth!',
                    },
                  ]}
                >
                  <DatePicker
                    className="w-100"
                    // defaultValue={dayjs(
                    //   `${regSessionDecoded.candidate?.date_of_birth ?? '-'}`,
                    // )}
                    placeholder="Select Date"
                    disabled={!editState}
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
                    disabled={!editState}
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
                    disabled={!editState}
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
                    disabled={!editState}
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
                    disabled={!editState}
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
                    disabled={!editState}
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
                    disabled={!editState}
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
                  <Input
                    placeholder="Your Permanent Address"
                    disabled={!editState}
                  />
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
                    disabled={!editState}
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
                    disabled={!editState}
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
                  // rules={[
                  //   {
                  //     required: true,
                  //     message: 'Please input your zip code!',
                  //   },
                  // ]}
                >
                  <Input placeholder="Your Zip Code" disabled={!editState} />
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
                    <Input placeholder="Your RT" disabled={!editState} />
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
                    <Input placeholder="Your RW" disabled={!editState} />
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
                    <Input
                      placeholder="Your Subdistrict"
                      disabled={!editState}
                    />
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
                    <Input placeholder="Your Village" disabled={!editState} />
                  </Form.Item>
                </div>
              )}
            </div>
            <div className="col-12">
              <div className="input-group-meta position-relative mb-0">
                <Form.Item<FieldType> name="addressCheckbox" className="mb-2">
                  <div className="d-flex align-items-center pt-10">
                    <Checkbox
                      onChange={handleAddressCheck}
                      disabled={!editState}
                      checked={addresses.length === 2 ? false : true}
                    >
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
                    disabled={addressCheck || !editState}
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
                    <Checkbox
                      onChange={handleFormalCheck}
                      checked={formalCheck}
                    >
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
                        disabled={!editState}
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
                        disabled={!editState}
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
                        disabled={!editState}
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
                        disabled={!editState}
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
                        disabled={!editState}
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
                        disabled={!editState}
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
                        disabled={eduLevel === 'SMA/SMK' || !editState}
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
                    disabled={!editState}
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
                          disabled={!editState}
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
                          disabled={!editState}
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
                <Button onClick={addLangSkill} disabled={!editState}>
                  ADD
                </Button>
              </div>
              <div className="mb-15">
                <Button onClick={removeLangSkill} disabled={!editState}>
                  REMOVE
                </Button>
              </div>
            </div>

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
                    disabled={!editState}
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
                  <Input
                    placeholder="Your Emergency Contact Name"
                    disabled={!editState}
                  />
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
                  <Input
                    placeholder="Your Emergency Contact Phone Number"
                    disabled={!editState}
                  />
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
                    disabled={!editState}
                    options={[
                      { value: 'Ready join now', label: 'Ready join now' },
                      {
                        value: 'Less than 1 month',
                        label: 'Less than 1 month',
                      },
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
                  // rules={[
                  //   {
                  //     required: true,
                  //     message: 'Please choose!',
                  //   },
                  // ]}
                >
                  <Radio.Group
                    onChange={everWorkedChange}
                    value={everWorked}
                    disabled={!editState}
                  >
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
                          disabled={!editState}
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
                          disabled={!editState}
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
                  // rules={[
                  //   {
                  //     required: true,
                  //     message: 'Please choose!',
                  //   },
                  // ]}
                >
                  <Radio.Group
                    onChange={diseaseChange}
                    value={disease}
                    disabled={!editState}
                  >
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
                        <Input
                          placeholder="Medical Condition"
                          disabled={!editState}
                        />
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
                          disabled={!editState}
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
                  <Radio.Group
                    onChange={haveRelationChange}
                    value={haveRelation}
                    disabled={!editState}
                  >
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
                        <Input placeholder="Name" disabled={!editState} />
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
                        <Input placeholder="Position" disabled={!editState} />
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
                  <Upload
                    action=""
                    listType="text"
                    maxCount={1}
                    accept=".pdf"
                    disabled={!editState}
                  >
                    <Button
                      icon={
                        <UploadOutlined
                          onPointerEnterCapture={''}
                          onPointerLeaveCapture={''}
                        />
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
        </Form>
      </div>
    </>
  );
};

export default PersonalDataForm;
