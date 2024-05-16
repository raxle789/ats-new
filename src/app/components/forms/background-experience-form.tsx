import React, { useState, useRef, useEffect } from 'react';
import {
  Input,
  Form,
  Select,
  DatePicker,
  Tabs,
  Radio,
  Checkbox,
  InputNumber,
  message,
} from 'antd';
import type {
  FormProps,
  RadioChangeEvent,
  CheckboxProps,
  GetProp,
  UploadProps,
} from 'antd';
// import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { MdOutlineModeEdit } from 'react-icons/md';
import { getExperiences } from '@/libs/Candidate/retrieve-data';

type TargetKey = React.MouseEvent | React.KeyboardEvent | string;
const { TextArea } = Input;

type FieldType = {
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
    value: string;
    label: string;
  }[];
  job_functions?: {
    value: string;
    label: string;
  }[];
  line_industries?: {
    value: string;
    label: string;
  }[];
};

const BackgroundExperienceForm = () => {
  const [form] = Form.useForm();
  const [masterData, setMasterData] = useState<MasterData | null>(null);
  const [editState, setEditState] = useState(false);
  const [experiences, setExperiences] = useState<any>(null);
  console.log('EXPERIENCES: ', experiences);

  /**
   * If a Fresh Graduate return
   * {
   *  expected_salary: number
   * }
   *
   * If a Professional return
   * {
   *  expected_salary: number,
   *  experiences: [
   *    id: 5,
        company_name: 'SidokareDev',
        line_industry: 'Technology',
        job_title: 'Senior Cloud Engineer',
        job_level: 'Staff',
        job_function: 'Manage Operation',
        job_description: 'Controlling Branch Operation',
        salary: 5600000,
        start_at: 2024-05-14T00:00:00.000Z,
        end_at: 2024-05-14T00:00:00.000Z,
        is_currently: true,
        created_at: 2024-05-14T10:20:49.606Z,
        updated_at: 2024-05-14T10:20:49.606Z,
        candidateId: 2
   *  ]
   * }
   */
  const fetchExperiences = async () => {
    const experiencesData = await getExperiences();
    if (!experiencesData.success) return message.error(experiencesData.message);
    if (experiencesData.data?.message === 'candidate.have.no.experiences') {
      setExpValue('Fresh Graduate');
    } else if (experiencesData.data?.message === 'candidate.have.experiences') {
      setExpValue('Professional');
    }
    setExperiences(experiencesData.data?.data);
  };

  /**
   * Place the masterData.job_functions to the select for of job functions
   */
  const fetchJobFunctions = async () => {
    const jobFunctions = await fetch('/api/client-data/job/functions', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const jobFunctionsData = await jobFunctions.json();
    // console.log('Job function data: ', jobFunctionsData);
    setMasterData((prevState) => ({
      ...prevState,
      job_functions: jobFunctionsData,
    }));
  };

  /**
   * Place the masterData.job_levels to the select for of job_levels
   */
  const jobJobLevels = async () => {
    const levels = await fetch('/api/client-data/job/levels', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const jobLevelsData = await levels.json();
    // console.info('FETCHED JOB LEVEL -> ', jobLevelsData);
    setMasterData((prevState) => ({
      ...prevState,
      job_levels: jobLevelsData,
    }));
  };

  /**
   * Place the masterData.line_industries to the select for of line_industries
   */
  const lineIndutries = async () => {
    const lineIndustries = await fetch('/api/client-data/job/line-industries', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const lineIndustriesData = await lineIndustries.json();
    // console.log('Fetched line-industries: ', lineIndustriesData);
    setMasterData((prevState) => ({
      ...prevState,
      line_industries: lineIndustriesData,
    }));
  };

  const [expValue, setExpValue] = useState<string>('Fresh Graduate');
  const onChangeExp = (e: RadioChangeEvent) => {
    setExpValue(e.target.value);
  };

  /**
   * Fetched data from databse here.
   */
  useEffect(() => {
    fetchExperiences();

    /* For Form data on experience field */
    fetchJobFunctions();
    jobJobLevels();
    lineIndutries();
  }, []);

  // useEffect(() => {
  //   if ('experiences' in experiences && experiences) {
  //     setExpValue('Professional');
  //   }
  // }, [experiences]);

  const editOnChange = () => {
    setEditState(!editState);
  };

  const [expIdx, setExpIdx] = useState<number>(0);

  type Tprops1 = {
    expIdx: number;
  };

  const ExpTabContent: React.FC<Tprops1> = ({ expIdx }) => {
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
            <label className="fw-bold">Job Title*</label>
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
            <label className="fw-bold">Job Function*</label>
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
                options={masterData?.job_functions}
              />
            </Form.Item>
          </div>
        </div>
        <div className="col-6">
          <div className="input-group-meta position-relative mb-15">
            <label className="fw-bold">Line Industry*</label>
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
                options={masterData?.line_industries}
              />
            </Form.Item>
          </div>
        </div>
        <div className="col-6">
          <div className="input-group-meta position-relative mb-15">
            <label className="fw-bold">Position Level*</label>
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
                options={masterData?.job_levels}
              />
            </Form.Item>
          </div>
        </div>
        <div className="col-6">
          <div className="input-group-meta position-relative mb-15">
            <label className="fw-bold">Company Name*</label>
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
            <label className="fw-bold">Job Description</label>
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
            <label className="fw-bold">Start Year*</label>
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
            <label className="fw-bold">End Year*</label>
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
            <label className="fw-bold">Current Salary (gross Monthly)*</label>
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
            <label className="fw-bold">Expected Salary (gross Monthly)*</label>
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
      </div>
    );
  };

  type Tprops2 = {
    expIdx: number;
  };

  const DisplayedTabContent: React.FC<Tprops2> = ({ expIdx }) => {
    // const [yearState, setYearState] = useState<{ [key: string]: boolean }>({});
    // const handleCheckboxChange: any = (e: any, expIdx: number) => {
    //   setYearState((prevState) => ({
    //     ...prevState,
    //     [expIdx.toString()]: e.target.checked,
    //   }));
    // };
    return (
      <div key={expIdx} className="row">
        <div className="col-6">
          <div className="input-group-meta position-relative mb-15">
            <label className="fw-bold">Job Title*</label>
            <p className="mb-0">Job titlenya apa</p>
          </div>
        </div>
        <div className="col-6">
          <div className="input-group-meta position-relative mb-15">
            <label className="fw-bold">Job Function*</label>
            <p className="mb-0">job functionnya</p>
          </div>
        </div>
        <div className="col-6">
          <div className="input-group-meta position-relative mb-15">
            <label className="fw-bold">Line Industry*</label>
            <p className="mb-0">line industrynya boy</p>
          </div>
        </div>
        <div className="col-6">
          <div className="input-group-meta position-relative mb-15">
            <label className="fw-bold">Position Level*</label>
            <p className="mb-0">position level bro</p>
          </div>
        </div>
        <div className="col-6">
          <div className="input-group-meta position-relative mb-15">
            <label className="fw-bold">Company Name*</label>
            <p className="mb-0">company name</p>
          </div>
        </div>
        <div className="col-6">
          <div className="input-group-meta position-relative mb-15">
            <label className="fw-bold">Job Description</label>
            <p className="mb-0">job description</p>
          </div>
        </div>
        <div className="col-6">
          <div className="input-group-meta position-relative mb-15">
            <label className="fw-bold">Start Year*</label>
            <p className="mb-0">start year</p>
          </div>
        </div>
        <div className="col-4">
          <div className="input-group-meta position-relative mb-15">
            <label className="fw-bold">End Year*</label>
            <p className="mb-0">end year</p>
          </div>
        </div>
        {/* <div className="col-2">
      <div className="input-group-meta position-relative mb-15">
        <Form.Item<FieldType>
          name={['experience', expIdx.toString(), 'currentYear']}
          className="pt-15"
        >
          <Checkbox
            onChange={(e) => handleCheckboxChange(e, expIdx)}
          >
            Current
          </Checkbox>
        </Form.Item>
      </div>
    </div> */}
        <div className="col-6">
          <div className="input-group-meta position-relative mb-15">
            <label className="fw-bold">Current Salary (gross Monthly)*</label>
            <p className="mb-0">6.000.000</p>
          </div>
        </div>
        <div className="col-6">
          <div className="input-group-meta position-relative mb-15">
            <label className="fw-bold">Expected Salary (gross Monthly)*</label>
            <p className="mb-0">10.000.000</p>
          </div>
        </div>
      </div>
    );
  };

  const initExpItems = [
    {
      label: 'Experience 1',
      children: <ExpTabContent expIdx={expIdx} />,
      key: '1',
    },
  ];
  const displayedInit = [
    {
      label: 'Experience 1',
      children: <DisplayedTabContent expIdx={expIdx} />,
      key: '1',
      closable: false,
    },
  ];

  const [activeExpKey, setActiveExpKey] = useState(initExpItems[0].key);
  const [expItems, setExpItems] = useState(initExpItems);
  const [displayedItems, setDisplayedItems] = useState(displayedInit);
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

    const newDisplayed = [...displayedItems];
    newDisplayed.push({
      label: `Experience ${expItems.length + 1}`,
      children: <DisplayedTabContent expIdx={expIdx} />,
      key: newActiveKey,
      closable: false,
    });

    setExpItems(newPanes);
    setDisplayedItems(newDisplayed);
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
    const newDisplayedPanes = displayedItems.filter(
      (item) => item.key !== targetKey,
    );

    setExpItems(newPanes);
    setDisplayedItems(newDisplayedPanes);
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
    setExpIdx(expIdx + 1);
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
            <label className="fw-bold sub-section-profile">
              Working Experience
            </label>

            {editState && (
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
            )}
            {expValue === 'Fresh Graduate' && (
              <div className="col-6">
                <div className="input-group-meta position-relative mb-15">
                  <label className="fw-bold">
                    Expected Salary (gross Monthly)*
                  </label>
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
                    {editState && (
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
                    )}
                    {!editState && <p className="mb-0">3.000.000</p>}
                  </Form.Item>
                </div>
              </div>
            )}

            {editState && expValue === 'Professional' && (
              <Tabs
                type="editable-card"
                onChange={onChangeExpTabs}
                activeKey={activeExpKey}
                onEdit={onEditExp}
                items={expItems}
              />
            )}

            {!editState && (
              <Tabs
                type="editable-card"
                hideAdd
                onChange={onChangeExpTabs}
                activeKey={activeExpKey}
                items={displayedItems}
              />
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

export default BackgroundExperienceForm;
