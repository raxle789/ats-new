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
  Checkbox,
  InputNumber,
  message,
} from 'antd';
import type { FormProps, CheckboxProps, InputRef } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { MdOutlineModeEdit } from 'react-icons/md';

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
};

type MasterData = {
  citys?: {
    value: string;
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
};

const EducationSkillsForm = () => {
  const [form] = Form.useForm();
  const [masterData, setMasterData] = useState<MasterData | null>(null);
  const [editState, setEditState] = useState(false);

  const editOnChange = () => {
    setEditState(!editState);
  };

  const [certificationIdx, setCertificationIdx] = useState<number>(0);
  const certifTabContent: JSX.Element[] = [
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
            name={['certification', certificationIdx.toString(), 'institution']}
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
  const displayedTabContent: JSX.Element[] = [
    <div key={certificationIdx} className="row">
      <div className="col-12">
        <div className="input-group-meta position-relative mb-15">
          <label className="fw-bold">Name (Certification/Licence)</label>
          <p className="mb-0">nama sertifikat</p>
        </div>
      </div>
      <div className="col-6">
        <div className="input-group-meta position-relative mb-15">
          <label className="fw-bold">Institution</label>
          <p className="mb-0">Universitas ga jelas</p>
        </div>
      </div>
      <div className="col-6">
        <div className="input-group-meta position-relative mb-15">
          <label className="fw-bold">Issue Date</label>
          <div className="d-flex align-items-center">
            <p className="mb-0">tanggal mulai</p>
            <p className="mb-0 ms-2">tanggal habis</p>
          </div>
        </div>
      </div>
    </div>,
  ];

  const certifInitItems = [
    { label: 'Certification 1', children: certifTabContent, key: '1' },
  ];
  const certifDisplayedInit = [
    {
      label: 'Certification 1',
      children: displayedTabContent,
      key: '1',
      closable: false,
    },
  ];
  const [activeCertifKey, setActiveCertifKey] = useState(
    certifInitItems[0].key,
  );
  const [certifItems, setCertifItems] = useState(certifInitItems);
  const [displayedItems, setDisplayedItems] = useState(certifDisplayedInit);
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

    const newDisplayed = [...displayedItems];
    newDisplayed.push({
      label: `Certification ${certifItems.length + 1}`,
      children: displayedTabContent,
      key: newActiveKey,
      closable: false,
    });

    setCertifItems(newPanes);
    setDisplayedItems(newDisplayed);
    setActiveCertifKey(newActiveKey);
    setCertificationIdx((prevState) => prevState + 1);
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

  useEffect(() => {
    setCertificationIdx((prevState) => prevState + 1);
  }, []);
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
                  // rules={[
                  //   {
                  //     required: true,
                  //     message: 'Please input your education level!',
                  //   },
                  // ]}
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
                  {!editState && <p className="mb-0">S1</p>}
                </Form.Item>
              </div>
            </div>
            <div className="col-3">
              <div className="input-group-meta position-relative mb-15">
                <label className="fw-bold">Education Major*</label>
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
                  {!editState && <p className="mb-0">Teknik Informatika</p>}
                </Form.Item>
              </div>
            </div>
            <div className="col-3">
              <div className="input-group-meta position-relative mb-15">
                <label className="fw-bold">Start Year*</label>
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
                  {editState && (
                    <DatePicker
                      className="w-100"
                      placeholder="Start Year"
                      picker="year"
                      disabled={!editState}
                    />
                  )}
                  {!editState && <p className="mb-0">2020</p>}
                </Form.Item>
              </div>
            </div>
            <div className="col-3">
              <div className="input-group-meta position-relative mb-15">
                <label className="fw-bold">End Year*</label>
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
                  {editState && (
                    <DatePicker
                      className="w-100"
                      placeholder="End Year"
                      picker="year"
                      disabled={!editState}
                    />
                  )}
                  {!editState && <p className="mb-0">2024</p>}
                </Form.Item>
              </div>
            </div>
            <div className="col-6">
              <div className="input-group-meta position-relative mb-15">
                <label className="fw-bold">School/University Name*</label>
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
                  {!editState && <p className="mb-0">Universitas Ga Jelas</p>}
                </Form.Item>
              </div>
            </div>
            <div className="col-3">
              <div className="input-group-meta position-relative mb-15">
                <label className="fw-bold">City*</label>
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
                  {!editState && <p className="mb-0">Jakarta City</p>}
                </Form.Item>
              </div>
            </div>
            <div className="col-3">
              <div className="input-group-meta position-relative mb-15">
                <label className="fw-bold">GPA*</label>
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
                  {!editState && <p className="mb-0">3.77</p>}
                </Form.Item>
              </div>
            </div>

            {editState && (
              <Tabs
                type="editable-card"
                onChange={onChangeCertifTabs}
                activeKey={activeCertifKey}
                onEdit={onEditCertif}
                items={certifItems}
              />
            )}
            {!editState && (
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
                <label className="fw-bold">What skills do you have?*</label>
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
                    <p className="mb-0">bisa mengoperasikan forklift</p>
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
                        // rules={[
                        //   {
                        //     required: true,
                        //     message: 'Please choose your language!',
                        //   },
                        // ]}
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
                            <p className="mb-0">English</p>
                            <p className="mb-0">Mandarin</p>
                          </>
                        )}
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
                            <p className="mb-0">Limited working proficiency</p>
                            <p className="mb-0">Limited working proficiency</p>
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
