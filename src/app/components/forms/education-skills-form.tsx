import React, { useState, useRef, useEffect } from 'react';
import {
  Input,
  Form,
  Select,
  DatePicker,
  Tabs,
  Divider,
  Space,
  Button,
  // Checkbox,
  InputNumber,
  message,
} from 'antd';
import type { FormProps, CheckboxProps, InputRef } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { MdOutlineModeEdit } from 'react-icons/md';
import dayjs, { Dayjs } from 'dayjs';
// import { getEducationSkills } from '@/libs/Candidate/retrieve-data';
// import { fetchCertificates, fetchCities, fetchEducatioMajors, fetchEducationInstitutios, fetchEducationLevels, fetchSkills } from '@/libs/Fetch';

type TargetKey = React.MouseEvent | React.KeyboardEvent | string;
let languageIndex = 0;

type FieldType = {
  formalOption?: string;
  formalCheckbox?: boolean;
  certificationCheckbox?: boolean;
  education?: {
    educationLevel?: string;
    educationMajor?: string;
    schoolName?: string;
    gpa?: number;
    cityOfSchool?: string;
    startEduYear?: string | Dayjs;
    endEduYear?: string | Dayjs;
  };
  certification?: {
    [id: string]: {
      certificationName?: string;
      institution?: string;
      issueDate?: string | Dayjs;
      monthIssue?: string | Dayjs;
      yearIssue?: string | Dayjs;
    };
  };
  skills?: string;
  language?: {
    [id: string]: {
      name?: string;
      proficiency?: string;
    };
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
  countries?: {
    value: string;
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
    value: number;
    label: string;
  }[];
  education_levels?: {
    value: string;
    label: string;
  }[];
  education_majors?: {
    value: string;
    label: string;
  }[];
  education_institutions?: {
    value: string;
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
};

type Props = {
  educationAndSkill?: any;
  masterData?: MasterData | null;
  errors?: any;
};

const EducationSkillsForm: React.FC<Props> = ({
  educationAndSkill,
  masterData,
  errors,
}) => {
  const [form] = Form.useForm();
  const [editState, setEditState] = useState(false);

  const editOnChange = () => {
    setEditState(!editState);
  };

  const [certificationIdx, setCertificationIdx] = useState<number>(0);

  type Tprops1 = {
    certificationIdx: number;
  };

  const CertifTabContent: React.FC<Tprops1> = ({ certificationIdx }) => {
    return (
      <div key={certificationIdx} className="row">
        <div className="col-12">
          <div className="input-group-meta position-relative mb-15">
            <label className="fw-bold">Name (Certification/Licence)</label>
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
            <label className="fw-bold">Institution</label>
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
            <label className="fw-bold">Issue Date</label>
            <div className="d-flex align-items-center">
              <Form.Item<FieldType>
                name={[
                  'certification',
                  certificationIdx.toString(),
                  'monthIssue',
                ]}
                className="mb-0 me-2"
              >
                <DatePicker placeholder="Select Date" picker="month" />
              </Form.Item>
            </div>
          </div>
        </div>
      </div>
    );
  };

  type Tprops2 = {
    certificationIdx: number;
  };

  const DisplayedTabContent: React.FC<Tprops2> = ({ certificationIdx }) => {
    return (
      <div key={certificationIdx} className="row">
        <div className="col-12">
          <div className="input-group-meta position-relative mb-15">
            <label className="fw-bold">Name (Certification/Licence)</label>
            <p className="mb-0">
              {educationAndSkill?.certifications[certificationIdx]?.name}
            </p>
          </div>
        </div>
        <div className="col-6">
          <div className="input-group-meta position-relative mb-15">
            <label className="fw-bold">Institution</label>
            <p className="mb-0">
              {
                educationAndSkill?.certifications[certificationIdx]
                  ?.institutionName
              }
            </p>
          </div>
        </div>
        <div className="col-6">
          <div className="input-group-meta position-relative mb-15">
            <label className="fw-bold">Issue Date</label>
            <div className="d-flex align-items-center">
              <p className="mb-0">
                {dayjs(
                  new Date(
                    educationAndSkill?.certifications[
                      certificationIdx
                    ]?.issuedDate,
                  ),
                ).format('YYYY-MM')}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const certifInitItems: any[] = [];
  const certifDisplayedInit: any[] = [];
  const [activeCertifKey, setActiveCertifKey] = useState('');
  const [certifItems, setCertifItems] = useState(certifInitItems);
  const [displayedItems, setDisplayedItems] = useState(certifDisplayedInit);
  const newCertifTabIndex = useRef(0);

  const onChangeCertifTabs = (newActiveKey: string) => {
    setActiveCertifKey(newActiveKey);
  };

  const addCertif = (tabTotal: number) => {
    let newPanes = [...certifItems];
    let newDisplayed = [...displayedItems];
    let index = certificationIdx;
    for (let i = 0; i < tabTotal; i++) {
      const newActiveKey = `newTab${newCertifTabIndex.current++}`;
      newPanes.push({
        label: `Certification ${index + 1}`,
        children: <CertifTabContent certificationIdx={index} />,
        key: newActiveKey,
      });

      newDisplayed.push({
        label: `Certification ${index + 1}`,
        children: <DisplayedTabContent certificationIdx={index} />,
        key: newActiveKey,
        closable: false,
      });
      index++;
      setActiveCertifKey(newActiveKey);
    }
    // console.log('certificationIdx', certificationIdx);
    setCertificationIdx(index);
    setCertifItems(newPanes);
    setDisplayedItems(newDisplayed);
    // console.log('addCertif');
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
    const newDisplayedPanes = displayedItems.filter(
      (item) => item.key !== targetKey,
    );

    setCertifItems(newPanes);
    setDisplayedItems(newDisplayedPanes);
    setActiveCertifKey(newActiveKey);
  };

  const onEditCertif = (
    targetKey: React.MouseEvent | React.KeyboardEvent | string,
    action: 'add' | 'remove',
  ) => {
    if (action === 'add') {
      addCertif(1);
    } else {
      removeCertif(targetKey);
    }
  };

  // const [formalCheck, setFormalCheck] = useState<boolean>(true);
  // const handleFormalCheck: CheckboxProps['onChange'] = (e) => {
  //   setFormalCheck(e.target.checked);
  // };
  // const [certificationCheck, setCertificationCheck] = useState<boolean>(true);
  // const handleCertificationCheck: CheckboxProps['onChange'] = (e) => {
  //   setCertificationCheck(e.target.checked);
  // };

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

  const handleSubmit: FormProps<FieldType>['onFinish'] = (values) => {
    if (editState) {
      // jalankan simpan data
    }
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

  const [certifTotal, setCertifTotal] = useState(0);
  const [loopTotal, setLoopTotal] = useState(0);
  const [certifState, setCertifState] = useState('not-certified');
  const [initFieldsValue, setInitFieldsValue] = useState<FieldType>({});

  useEffect(() => {
    const skillsArray = educationAndSkill?.skills;
    let skillsString: string;
    if (skillsArray) {
      skillsString = skillsArray.join('\n');
    }

    const languagesData = educationAndSkill?.languages;
    type LanguageField = {
      language: {
        [key: string]: { name: string; proficiency: string };
      };
    };
    let languageField: LanguageField = {
      language: {},
    };
    if (languagesData) {
      languageField.language = languagesData.reduce(
        (acc: any, language: any, index: number) => {
          acc[index] = language;
          return acc;
        },
        {},
      );
      setLangTotal(languagesData.length);
    }

    const certifications = educationAndSkill?.certifications;
    type certiField = {
      [key: string]: {
        certificationName?: string;
        institution?: string;
        monthIssue?: string;
      };
    };
    let certificationsField: certiField;
    if (certifications) {
      certificationsField = certifications.reduce(
        (acc: any, item: any, index: number) => {
          acc[index] = {
            certificationName: item?.name,
            institution: item?.institutionName,
            monthIssue: dayjs(new Date(item?.issuedDate)),
          };
          return acc;
        },
        {},
      );
    }

    if (educationAndSkill) {
      setInitFieldsValue((prevState) => ({
        ...prevState,
        education: {
          educationLevel: educationAndSkill?.education?.edu_level,
          educationMajor: educationAndSkill?.education?.edu_major,
          schoolName: educationAndSkill?.education?.university_name,
          gpa: educationAndSkill?.education?.gpa,
          cityOfSchool: educationAndSkill?.education?.city,
          startEduYear: educationAndSkill?.education?.start_year
            ? dayjs(new Date(educationAndSkill?.education?.start_year, 0))
            : dayjs('20240101', 'YYYYMMDD'),
          endEduYear: educationAndSkill?.education?.start_year
            ? dayjs(new Date(educationAndSkill?.education?.end_year, 0))
            : dayjs(new Date(Date.now()), 'YYYYMMDD'),
        },
        skills: skillsString,
        language: languageField.language,
        certification: certificationsField,
      }));

      console.log(
        'function - (education) - initFieldsValue: ',
        initFieldsValue,
      );
      if (loopTotal < 1 && certifications) {
        if (certifications.length > 0) {
          setCertifState('certified');
          setCertifTotal(educationAndSkill.certifications.length);
          addCertif(educationAndSkill.certifications.length);
          setLoopTotal((prevState) => prevState + 1);
        }
      }
    }
  }, [educationAndSkill]);

  console.log('certifTotal: ', certifTotal);
  console.log('certifState: ', certifState);
  console.log('certificationIdx: ', certificationIdx);

  // useEffect(() => {
  //   if (loopTotal < certifTotal && certifState === 'certified') {
  //     addCertif();
  //   }
  // }, [certifTotal]);

  useEffect(() => {
    console.log('useEffect - (education) - initFieldsValue: ', initFieldsValue);
    form.setFieldsValue(initFieldsValue);
  }, [initFieldsValue]);
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
          name="background-experience-form"
          variant="filled"
          form={form}
          onFinish={handleSubmit}
          onFinishFailed={onFinishFailed}
        >
          <div className="row">
            <label className="fw-bold sub-section-profile">Education</label>
            <div className="col-3">
              <div className="input-group-meta position-relative mb-15">
                <label className="fw-bold">Education Level*</label>
                <Form.Item<FieldType>
                  name={['education', 'educationLevel']}
                  className="mb-0"
                >
                  {editState && (
                    <Select
                      className="w-100"
                      placeholder="Your Education Level"
                      onChange={onChangeEdu}
                      disabled={!editState}
                      /* Fetched Data */
                      options={masterData?.education_levels}
                    />
                  )}
                  {!editState && (
                    <p className="mb-0">
                      {educationAndSkill?.education?.edu_level}
                    </p>
                  )}
                </Form.Item>
              </div>
            </div>
            <div className="col-3">
              <div className="input-group-meta position-relative mb-15">
                <label className="fw-bold">Education Major*</label>
                <Form.Item<FieldType>
                  name={['education', 'educationMajor']}
                  className="mb-0"
                >
                  {editState && (
                    <Select
                      className="w-100"
                      showSearch
                      mode="tags"
                      maxCount={1}
                      disabled={eduLevel === 'SMA/SMK' || !editState}
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
                  )}
                  {!editState && (
                    <p className="mb-0">
                      {educationAndSkill?.education?.edu_major}
                    </p>
                  )}
                </Form.Item>
              </div>
            </div>
            <div className="col-3">
              <div className="input-group-meta position-relative mb-15">
                <label className="fw-bold">Start Year*</label>
                <Form.Item<FieldType>
                  name={['education', 'startEduYear']}
                  className="mb-0"
                >
                  {editState && (
                    <DatePicker
                      className="w-100"
                      placeholder="Start Year"
                      picker="year"
                      disabled={!editState}
                    />
                  )}
                  {!editState && (
                    <p className="mb-0">
                      {dayjs(educationAndSkill?.education?.start_year).format(
                        'YYYY',
                      ) || 'Invalid Date'}
                    </p>
                  )}
                </Form.Item>
              </div>
            </div>
            <div className="col-3">
              <div className="input-group-meta position-relative mb-15">
                <label className="fw-bold">End Year*</label>
                <Form.Item<FieldType>
                  name={['education', 'endEduYear']}
                  className="mb-0"
                >
                  {editState && (
                    <DatePicker
                      className="w-100"
                      placeholder="End Year"
                      picker="year"
                      disabled={!editState}
                    />
                  )}
                  {!editState && (
                    <p className="mb-0">
                      {dayjs(educationAndSkill?.education?.end_year).format(
                        'YYYY',
                      ) || 'Invalid Date'}
                    </p>
                  )}
                </Form.Item>
              </div>
            </div>
            <div className="col-6">
              <div className="input-group-meta position-relative mb-15">
                <label className="fw-bold">School/University Name*</label>
                <Form.Item<FieldType>
                  name={['education', 'schoolName']}
                  className="mb-0"
                >
                  {editState && (
                    <Select
                      className="w-100"
                      showSearch
                      mode="tags"
                      maxCount={1}
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
                      options={masterData?.education_institutions}
                    />
                  )}
                  {!editState && (
                    <p className="mb-0">
                      {educationAndSkill?.education?.university_name}
                    </p>
                  )}
                </Form.Item>
              </div>
            </div>
            <div className="col-3">
              <div className="input-group-meta position-relative mb-15">
                <label className="fw-bold">City*</label>
                <Form.Item<FieldType>
                  name={['education', 'cityOfSchool']}
                  className="mb-0"
                >
                  {editState && (
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
                  )}
                  {!editState && (
                    <p className="mb-0">{educationAndSkill?.education?.city}</p>
                  )}
                </Form.Item>
              </div>
            </div>
            <div className="col-3">
              <div className="input-group-meta position-relative mb-15">
                <label className="fw-bold">GPA*</label>
                <Form.Item<FieldType>
                  name={['education', 'gpa']}
                  className="mb-0"
                >
                  {editState && (
                    <InputNumber
                      className="w-100"
                      min={1}
                      max={4}
                      step={0.01}
                      disabled={eduLevel === 'SMA/SMK' || !editState}
                      placeholder="Your GPA"
                    />
                  )}
                  {!editState && (
                    <p className="mb-0">{educationAndSkill?.education?.gpa}</p>
                  )}
                </Form.Item>
              </div>
            </div>

            <label className="fw-bold mt-5 sub-section-profile">
              Certification
            </label>
            {editState && certifState === 'certified' && (
              <Tabs
                type="editable-card"
                onChange={onChangeCertifTabs}
                activeKey={activeCertifKey}
                onEdit={onEditCertif}
                items={certifItems}
              />
            )}
            {!editState && certifState === 'certified' && (
              <Tabs
                type="editable-card"
                hideAdd
                onChange={onChangeCertifTabs}
                activeKey={activeCertifKey}
                items={displayedItems}
              />
            )}

            <label className="fw-bold mt-5 sub-section-profile">Skill</label>
            <div className="col-12">
              <div className="input-group-meta position-relative mb-15">
                <label className="fw-bold">What skills do you have?</label>
                <Form.Item<FieldType> name="skills" className="mb-0">
                  {editState && (
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
                  )}
                  {!editState && (
                    <p className="mb-0">{initFieldsValue?.skills}</p>
                  )}
                </Form.Item>
              </div>
            </div>

            <label className="fw-bold mt-5 sub-section-profile">Language</label>
            <div className="col-12">
              {Array.from({ length: langTotal }, (_, index) => (
                <div key={index} className="row">
                  <div className="col-6">
                    <div className="input-group-meta position-relative mb-15">
                      <Form.Item<FieldType>
                        name={['language', index.toString(), 'name']}
                        className="mb-0"
                      >
                        {editState && (
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
                        )}
                        {!editState && (
                          <>
                            <p className="mb-0">
                              {initFieldsValue &&
                                initFieldsValue.language &&
                                initFieldsValue.language[index.toString()]
                                  ?.name}
                            </p>
                          </>
                        )}
                      </Form.Item>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="input-group-meta position-relative mb-15">
                      <Form.Item<FieldType>
                        name={['language', index.toString(), 'proficiency']}
                        className="mb-0"
                      >
                        {editState && (
                          <Select
                            className="w-100"
                            placeholder="Select Level"
                            disabled={!editState}
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
                        )}
                        {!editState && (
                          <>
                            <p className="mb-0">
                              {initFieldsValue &&
                                initFieldsValue.language &&
                                initFieldsValue.language[index.toString()]
                                  ?.proficiency}
                            </p>
                          </>
                        )}
                      </Form.Item>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {editState && (
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
            )}

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

export default EducationSkillsForm;
