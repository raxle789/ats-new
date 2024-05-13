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
import {
  getAddress,
  getEducation,
  getEmergency,
  getFamilies,
  getLanguages,
  getProfileNCandidate,
  getQuestions,
  getSkills,
} from '@/libs/Candidate/retrieve-data';
import dayjs from 'dayjs';
import { convertToPlainObject, fileToBase64 } from '@/libs/Registration/utils';
import { updateCandidateProfile } from '@/libs/Candidate/actions';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];
type TargetKey = React.MouseEvent | React.KeyboardEvent | string;

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
    if (!profileData.success) return setError(profileData.message as string);
    setPreviewImage(profileData.data?.document);
    return setProfileData(profileData.data?.profile);
  };

  const fetchAddress = async () => {
    const addressesData = await getAddress();
    if (!addressesData.success)
      return setError(addressesData.message as string);
    setAddresses(addressesData.data);
  };

  const fetchFamilies = async () => {
    const familiesData = await getFamilies();
    if (!familiesData.success) return setError(familiesData.message as string);
    return setFamilies(familiesData.data);
  };

  const fetchEducation = async () => {
    const educationData = await getEducation();
    if (!educationData.success)
      return message.error(educationData.message as string);
    return setEducation(educationData.data);
  };

  const fetchSkills = async () => {
    const skillsData = await getSkills();
    if (!skillsData.success) return message.error(skillsData.message as string);
    return setSkills(skillsData.data);
  };

  const fetchLanguages = async () => {
    const languagesData = await getLanguages();
    if (!languagesData.success)
      return message.error(languagesData.message as string);
    return setLanguages(languagesData.data);
  };

  const fetchEmergency = async () => {
    const emergencyData = await getEmergency();
    if (!emergencyData.success)
      return message.error(emergencyData.message as string);
    return setEmergency(emergencyData.data);
  };

  const fetchQuestions = async () => {
    const questionsData = await getQuestions();
    if (!questionsData.success)
      return message.error(questionsData.message as string);
    return setQuestions(questionsData.data);
  };

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

  useEffect(() => {
    fetchProfileData();
    fetchAddress();
    fetchFamilies();
    fetchEducation();
    fetchSkills();
    fetchLanguages();
    fetchEmergency();
    fetchQuestions();

    fetchCitys();
    fetchEthnicity();
    fetchCountrys();
  }, [editState]);

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
    }
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

  const handleSubmit: FormProps<FieldType>['onFinish'] =  async (values) => {
    if (editState) {
      // jalankan simpan data
      console.log('submitted values: ', values);
      console.log('file submitted: ', fileList[0].originFileObj);
      const photoBase64 = await fileToBase64(fileList[0].originFileObj as File);
      const plainValues = convertToPlainObject(values);
      const manipulatedSubmittedValues = {
        address: {
          ...plainValues.address
        },
        profile: {
          ...plainValues.profile,
          uploadPhoto: {
            original_name: fileList[0].originFileObj?.name,
            byte_size: fileList[0].originFileObj?.size,
            file_base: photoBase64
          }
        }
      };
      const updateProfile = await updateCandidateProfile(manipulatedSubmittedValues);
      if(!updateProfile.success) {
        return message.error(updateProfile.message);
      };
      setEditState(false);
      return message.success(updateProfile.message);
    };
  };

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (
    errorInfo,
  ) => {
    if (errorInfo.errorFields && errorInfo.errorFields.length > 0) {
      const errorMessage = errorInfo.errorFields
        .map((field) => field.errors.join(', '))
        .join('; ');
      message.error(`Failed: ${errorMessage}`);
    };
  };
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
        maritalStatus: profileData.candidate?.maritalStatus,
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
        currentAddress:
          addresses.length === 2
            ? addresses[1]?.currentAddress
            : addresses[0]?.street,
      },
      families: {
        0: {
          relation: families[0]?.relationStatus,
          name: families[0]?.name,
          gender: families[0]?.gender,
          dateOfBirth: dayjs(families[0]?.dateOfBirth),
        },
        1: {
          relation: families[1]?.relationStatus,
          name: families[1]?.name,
          gender: families[1]?.gender,
          dateOfBirth: dayjs(families[1]?.dateOfBirth),
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
        relationPosition: 'Mantan Istri',
      },
    });
  }, [profileData, addresses, families, education, skills]);
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
            <label className="fw-bold sub-section-profile">Profile</label>
            <div className="col-4">
              <div className="input-group-meta position-relative mb-15">
                <label className="fw-bold">Upload Photo*</label>
                {!editState && (
                  <ImageNext
                    src={previewImage}
                    alt="Profile"
                    width={60}
                    height={60}
                  />
                )}
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
                  {editState && (
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
                            onVisibleChange: (visible) =>
                              setPreviewOpen(visible),
                            afterOpenChange: (visible) =>
                              !visible && setPreviewImage(''),
                          }}
                          src={previewImage}
                        />
                      )}
                    </div>
                  )}
                </Form.Item>
              </div>
            </div>
            <div className="col-4">
              <div className="input-group-meta position-relative mb-0">
                <label className="fw-bold">
                  Full Name (as per ID/Passport)*
                </label>
                <Form.Item<FieldType>
                  name={['profile', 'fullname']}
                  // rules={[
                  //   { required: true, message: 'Please input your fullname!' },
                  // ]}
                >
                  {editState && (
                    <Input
                      placeholder="Your Full Name"
                      disabled={!editState}
                      // defaultValue={regSessionDecoded.user?.name ?? ''}
                      // value={regSessionDecoded.user?.name ?? ''}
                    />
                  )}
                  {!editState && <p className="mb-0">{profileData.candidate?.users?.name}</p>}
                </Form.Item>
              </div>
              <div className="input-group-meta position-relative mb-0">
                <label className="fw-bold">Email*</label>
                <Form.Item<FieldType>
                  name={['profile', 'email']}
                  // rules={[{ required: true, message: 'Please input your email!' }]}
                >
                  {editState && (
                    <Input
                      placeholder="Your Email"
                      disabled
                      defaultValue={profileData.candidate?.users?.email}
                      // defaultValue={regSessionDecoded.user?.email ?? ''}
                    />
                  )}
                  {!editState && <p className="mb-0">{profileData.candidate?.users?.email}</p>}
                </Form.Item>
              </div>
            </div>
            <div className="col-4">
              <div className="input-group-meta position-relative mb-0">
                <label className="fw-bold">Phone Number*</label>
                <Form.Item<FieldType>
                  name={['profile', 'phoneNumber']}
                  rules={[
                    {
                      required: true,
                      message: 'Please input your phone number!',
                    },
                  ]}
                >
                  {editState && (
                    <Input
                      placeholder="Your Phone Number"
                      disabled={!editState}
                      // defaultValue={regSessionDecoded.candidate?.phone_number ?? ''}
                    />
                  )}
                  {!editState && <p className="mb-0">{profileData.candidate?.phone_number}</p>}
                </Form.Item>
              </div>
              <div className="input-group-meta position-relative mb-0">
                <label className="fw-bold">Date of Birth*</label>
                <Form.Item<FieldType>
                  name={['profile', 'dateOfBirth']}
                  rules={[
                    {
                      required: true,
                      message: 'Please input your date of birth!',
                    },
                  ]}
                >
                  {editState && (
                    <DatePicker
                      className="w-100"
                      // defaultValue={dayjs(
                      //   `${regSessionDecoded.candidate?.date_of_birth ?? '-'}`,
                      // )}
                      placeholder="Select Date"
                      disabled={!editState}
                    />
                  )}
                  {!editState && <p className="mb-0">{dayjs(profileData.candidate?.date_of_birth).format('YYYY-MM-DD')}</p>}
                </Form.Item>
              </div>
            </div>
            <div className="col-4">
              <div className="input-group-meta position-relative mb-15">
                <label className="fw-bold">Place of Birth*</label>
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
                  {editState && (
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
                      // options={citysName as { value: string; label: string }[]}
                      options={masterData?.citys}
                    />
                  )}
                  {!editState && <p className="mb-0">{profileData.candidate?.birthCity}</p>}
                </Form.Item>
              </div>
            </div>
            <div className="col-4">
              <div className="input-group-meta position-relative mb-15">
                <label className="fw-bold">Gender*</label>
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
                  {editState && (
                    <Select
                      className="w-100"
                      placeholder="Your Gender"
                      options={[
                        { value: 'Male', label: 'Male' },
                        { value: 'Female', label: 'Female' },
                      ]}
                      disabled={!editState}
                    />
                  )}
                  {!editState && <p className="mb-0">{profileData.candidate?.gender}</p>}
                </Form.Item>
              </div>
            </div>
            <div className="col-4">
              <div className="input-group-meta position-relative mb-15">
                <label className="fw-bold">Religion*</label>
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
                  {editState && (
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
                  )}
                  {!editState && <p className="mb-0">{profileData.candidate?.religion}</p>}
                </Form.Item>
              </div>
            </div>
            <div className="col-4">
              <div className="input-group-meta position-relative mb-15">
                <label className="fw-bold">Ethnicity*</label>
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
                  {editState && (
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
                  )}
                  {!editState && <p className="mb-0">{profileData.candidate?.ethnicity}</p>}
                </Form.Item>
              </div>
            </div>
            <div className="col-4">
              <div className="input-group-meta position-relative mb-15">
                <label className="fw-bold">Blood Type</label>
                <Form.Item<FieldType>
                  name={['profile', 'bloodType']}
                  className="mb-0"
                >
                  {editState && (
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
                  )}
                  {!editState && <p className="mb-0">{profileData.candidate?.blood_type}</p>}
                </Form.Item>
              </div>
            </div>
            <div className="col-4">
              <div className="input-group-meta position-relative mb-15">
                <label className="fw-bold">Marital Status*</label>
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
                  {editState && (
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
                  )}
                  {!editState && <p className="mb-0">{profileData.candidate?.maritalStatus}</p>}
                </Form.Item>
              </div>
            </div>

            <label className="fw-bold mt-5 sub-section-profile">Address</label>
            <div className="col-12">
              <div className="input-group-meta position-relative mb-15">
                <label className="fw-bold">
                  Permanent Address (as per ID/Passport)*
                </label>
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
                  {editState && (
                    <Input
                      placeholder="Your Permanent Address"
                      disabled={!editState}
                    />
                  )}
                  {!editState && (
                    <p className="mb-0">{addresses[0]?.street}</p>
                  )}
                </Form.Item>
              </div>
            </div>
            <div className="col-4">
              <div className="input-group-meta position-relative mb-15">
                <label className="fw-bold">Country*</label>
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
                  {editState && (
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
                  )}
                  {!editState && <p className="mb-0">{addresses[0]?.country}</p>}
                </Form.Item>
              </div>
            </div>
            <div className="col-4">
              <div className="input-group-meta position-relative mb-15">
                <label className="fw-bold">City*</label>
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
                  {editState && (
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
                  )}
                  {!editState && <p className="mb-0">{addresses[0]?.city}</p>}
                </Form.Item>
              </div>
            </div>
            <div className="col-4">
              <div className="input-group-meta position-relative mb-15">
                <label className="fw-bold">Zip Code*</label>
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
                  {editState && (
                    <Input placeholder="Your Zip Code" disabled={!editState} />
                  )}
                  {!editState && <p className="mb-0">{addresses[0]?.zipCode}</p>}
                </Form.Item>
              </div>
            </div>
            <div className="col-4">
              <div className="input-group-meta position-relative mb-15">
                <label className="fw-bold">RT</label>
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
                  {editState && (
                    <Input placeholder="Your RT" disabled={!editState || addresses[0]?.country !== 'Indonesia'} />
                  )}
                  {!editState && <p className="mb-0">{addresses[0]?.rt}</p>}
                </Form.Item>
              </div>
            </div>
            <div className="col-4">
              <div className="input-group-meta position-relative mb-15">
                <label className="fw-bold">RW</label>
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
                  {editState && (
                    <Input placeholder="Your RW" disabled={!editState || addresses[0]?.country !== 'Indonesia'} />
                  )}
                  {!editState && <p className="mb-0">{addresses[0]?.rw}</p>}
                </Form.Item>
              </div>
            </div>
            <div className="col-4">
              <div className="input-group-meta position-relative mb-15">
                <label className="fw-bold">Subdistrict</label>
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
                  {editState && (
                    <Input
                      placeholder="Your Subdistrict"
                      disabled={!editState || addresses[0]?.country !== 'Indonesia'}
                    />
                  )}
                  {!editState && <p className="mb-0">{addresses[0]?.subdistrict}</p>}
                </Form.Item>
              </div>
            </div>
            <div className="col-4">
              <div className="input-group-meta position-relative mb-15">
                <label className="fw-bold">Village</label>
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
                  {editState && (
                    <Input placeholder="Your Village" disabled={!editState || addresses[0]?.country !== 'Indonesia'} />
                  )}
                  {!editState && <p className="mb-0">{addresses[0]?.village}</p>}
                </Form.Item>
              </div>
            </div>
            {editState && (
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
            )}
            <div className="col-12">
              <div className="input-group-meta position-relative mb-15">
                <label className="fw-bold">Current Address (Domicile)</label>
                <Form.Item<FieldType>
                  name={['address', 'currentAddress']}
                  className="mb-0"
                >
                  {editState && (
                    <Input
                      disabled={addressCheck || !editState}
                      placeholder="Your Current Address"
                    />
                  )}
                  {!editState && <p className="mb-0">{addresses.length === 2
            ? addresses[1]?.currentAddress
            : addresses[0]?.street}</p>}
                </Form.Item>
              </div>
            </div>

            {editState && (
              <div className="button-group d-inline-flex align-items-center mt-30 mb-0">
                <button type="submit" className="dash-btn-two tran3s me-3">
                  Submit
                </button>
              </div>
            )}
          </div>
        </Form>
      </div>
    </>
  );
};

export default PersonalDataForm;
