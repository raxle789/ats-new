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
import type { FormProps, RadioChangeEvent } from 'antd';
import { MdOutlineModeEdit } from 'react-icons/md';
import dayjs, { Dayjs } from 'dayjs';

type TargetKey = React.MouseEvent | React.KeyboardEvent | string;
const { TextArea } = Input;

type FieldType = {
  expOption?: string;
  experience?: {
    expectedSalary?: number;
    [id: string]: {
      id?: number;
      jobTitle?: string;
      jobFunction?: string;
      lineIndustry?: string;
      positionLevel?: string;
      compName?: string;
      jobDesc?: string;
      startYear?: string | Dayjs;
      endYear?: string | Dayjs;
      currentYear?: boolean;
      currentSalary?: number;
    };
  };
  others?: {
    noticePeriod?: string;
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
  experiences?: any;
  masterData?: MasterData | null;
  noticePeriod?: string;
  errors?: any;
};

const BackgroundExperienceForm: React.FC<Props> = ({
  experiences,
  masterData,
  noticePeriod,
  errors,
}) => {
  const [form] = Form.useForm();
  const [editState, setEditState] = useState(false);

  const [expValue, setExpValue] = useState<string>('Professional');
  const onChangeExp = (e: RadioChangeEvent) => {
    setExpValue(e.target.value);
  };

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
        <div className="col-6 d-none">
          <div className="input-group-meta position-relative mb-15">
            <Form.Item<FieldType>
              name={['experience', expIdx.toString(), 'id']}
              className="mb-0"
            >
              <InputNumber />
            </Form.Item>
          </div>
        </div>
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
                // filterOption={(input, option) =>
                //   (option?.label.toLowerCase() ?? '').includes(input)
                // }
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? '')
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? '').toLowerCase())
                }
                // options={masterData?.job_levels}
                options={[
                  { value: 'Director', label: 'Director' },
                  { value: 'VP', label: 'VP' },
                  {
                    value: 'General Manager',
                    label: 'General Manager',
                  },
                  { value: 'Manager', label: 'Manager' },
                  {
                    value: 'Assistant Manager',
                    label: 'Assistant Manager',
                  },
                  {
                    value: 'Supervisor',
                    label: 'Supervisor',
                  },
                  {
                    value: 'Staff',
                    label: 'Staff',
                  },
                ]}
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
    return (
      <div key={expIdx} className="row">
        <div className="col-6 d-none">
          <div className="input-group-meta position-relative mb-15">
            <p className="mb-0">{experiences?.experiences[expIdx]?.id}</p>
          </div>
        </div>
        <div className="col-6">
          <div className="input-group-meta position-relative mb-15">
            <label className="fw-bold">Job Title*</label>
            <p className="mb-0">
              {experiences?.experiences[expIdx]?.job_title}
            </p>
          </div>
        </div>
        <div className="col-6">
          <div className="input-group-meta position-relative mb-15">
            <label className="fw-bold">Job Function*</label>
            <p className="mb-0">
              {experiences?.experiences[expIdx]?.job_function}
            </p>
          </div>
        </div>
        <div className="col-6">
          <div className="input-group-meta position-relative mb-15">
            <label className="fw-bold">Line Industry*</label>
            <p className="mb-0">
              {experiences?.experiences[expIdx]?.line_industry}
            </p>
          </div>
        </div>
        <div className="col-6">
          <div className="input-group-meta position-relative mb-15">
            <label className="fw-bold">Position Level*</label>
            <p className="mb-0">
              {experiences?.experiences[expIdx]?.job_level}
            </p>
          </div>
        </div>
        <div className="col-6">
          <div className="input-group-meta position-relative mb-15">
            <label className="fw-bold">Company Name*</label>
            <p className="mb-0">
              {experiences?.experiences[expIdx]?.company_name}
            </p>
          </div>
        </div>
        <div className="col-6">
          <div className="input-group-meta position-relative mb-15">
            <label className="fw-bold">Job Description</label>
            <p className="mb-0">
              {experiences?.experiences[expIdx]?.job_description}
            </p>
          </div>
        </div>
        <div className="col-6">
          <div className="input-group-meta position-relative mb-15">
            <label className="fw-bold">Start Year*</label>
            <p className="mb-0">
              {dayjs(experiences?.experiences[expIdx]?.start_at).format(
                'MM/YYYY',
              )}
            </p>
          </div>
        </div>
        <div className="col-4">
          <div className="input-group-meta position-relative mb-15">
            <label className="fw-bold">End Year*</label>
            <p className="mb-0">
              {/* {dayjs(experiences?.experiences[expIdx]?.end_at).format(
                'MM/YYYY',
              )} */}
              {dayjs(experiences?.experiences[expIdx]?.end_at).isValid()
                ? dayjs(experiences?.experiences[expIdx]?.end_at).format(
                    'MM/YYYY',
                  )
                : 'Now'}
            </p>
          </div>
        </div>
        <div className="col-6">
          <div className="input-group-meta position-relative mb-15">
            <label className="fw-bold">Current Salary (gross Monthly)*</label>
            <p className="mb-0">
              {Number(experiences?.experiences[expIdx]?.salary)}
            </p>
          </div>
        </div>
        <div className="col-6">
          <div className="input-group-meta position-relative mb-15">
            <label className="fw-bold">Expected Salary (gross Monthly)*</label>
            <p className="mb-0">{experiences?.expectedSalary}</p>
          </div>
        </div>
      </div>
    );
  };

  const initExpItems: any[] = [];
  const displayedInit: any[] = [];

  const [activeExpKey, setActiveExpKey] = useState('');
  const [expItems, setExpItems] = useState(initExpItems);
  const [displayedItems, setDisplayedItems] = useState(displayedInit);
  // const [displayedItems, setDisplayedItems] = useState(null);
  const newExpTabIdx = useRef(0);

  const onChangeExpTabs = (newActiveKey: string) => {
    setActiveExpKey(newActiveKey);
  };

  const addExp = (tabTotal: number) => {
    let newPanes = [...expItems];
    let newDisplayed = [...displayedItems];
    let index = expIdx;
    // let newActiveKey: string;
    for (let i = 0; i < tabTotal; i++) {
      const newActiveKey = `newTab${newExpTabIdx.current++}`;
      newPanes.push({
        label: `Experience ${index + 1}`,
        children: <ExpTabContent expIdx={index} />,
        key: newActiveKey,
      });

      newDisplayed.push({
        label: `Experience ${index + 1}`,
        children: <DisplayedTabContent expIdx={index} />,
        key: newActiveKey,
        closable: false,
      });
      index++;
      setActiveExpKey(newActiveKey);
    }
    // console.log('addExp');
    setExpIdx(index);
    setExpItems(newPanes);
    setDisplayedItems(newDisplayed);
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
      addExp(1);
    } else {
      removeExp(targetKey);
    }
  };

  const [expTotal, setExpTotal] = useState(0);
  const [loopTotal, setLoopTotal] = useState(0);
  const [initFieldsValue, setInitFieldsValue] = useState<FieldType>({});

  const handleSubmit: FormProps<FieldType>['onFinish'] = () => {
    if (editState) {
      // jalankan simpan data
      let values = form.getFieldsValue();
      values = {
        ...values,
        experience: { ...initFieldsValue?.experience, ...values?.experience },
      };
      console.log('submittedValueExperience: ', values);
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
    if (experiences) {
      if ('experiences' in experiences) {
        setInitFieldsValue((prevState) => ({
          ...prevState,
          expOption: expValue,
          experience: {
            expectedSalary: experiences?.expectedSalary,
            ...experiences?.experiences?.reduce(
              (acc: any, exp: any, index: number) => {
                acc[index] = {
                  id: exp?.id,
                  jobTitle: exp?.job_title,
                  jobFunction: exp?.job_function,
                  lineIndustry: exp?.line_industry,
                  positionLevel: exp?.job_level,
                  compName: exp?.company_name,
                  jobDesc: exp?.job_description,
                  startYear: dayjs(exp?.start_at),
                  endYear: dayjs(exp?.end_at),
                  // currentYear: exp?.is_currently, // ganti status
                  currentSalary: Number(exp?.salary),
                };
                return acc;
              },
              {},
            ),
          },
          others: {
            noticePeriod: noticePeriod,
          },
        }));
        console.log(
          'function - (experience) - initFieldsValue: ',
          initFieldsValue,
        );
        setExpValue('Professional');
        setExpTotal(experiences.experiences.length);
        if (loopTotal < 1 && expValue === 'Professional') {
          addExp(experiences.experiences.length);
          setLoopTotal((prevState) => prevState + 1);
        }
      } else {
        setInitFieldsValue((prevState) => ({
          ...prevState,
          expOption: expValue,
          experience: {
            expectedSalary: experiences?.expectedSalary,
          },
        }));
      }
    }
  }, [experiences]);

  // console.log('expTotal: ', expTotal);
  // console.log('loopTotal: ', loopTotal);
  // console.log('displayedItems: ', displayedItems);
  // console.log('expIdx: ', expIdx);
  // useEffect(() => {
  //   if (loopTotal < expTotal && expValue === 'Professional') {
  //     console.log('tambah tab exp dari useEffect: ');
  //     addExp();
  //     console.log('loopTotal useEffect: ', loopTotal);
  //   }
  // }, [expTotal]);

  useEffect(() => {
    console.log(
      'useEffect - (experience) - initFieldsValue: ',
      initFieldsValue,
    );
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
            <label className="fw-bold sub-section-profile">
              Working Experience
            </label>

            {/* {editState && (
              <div className="col-12">
                <div className="input-group-meta position-relative mb-15">
                  <Form.Item<FieldType> name="expOption" className="mb-0">
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
            )} */}
            {expValue === 'Fresh Graduate' && (
              <div className="col-6">
                <div className="input-group-meta position-relative mb-15">
                  <label className="fw-bold">
                    Expected Salary (gross Monthly)*
                  </label>
                  <Form.Item<FieldType>
                    name={['experience', 'expectedSalary']}
                    className="mb-0"
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
                    {!editState && (
                      <p className="mb-0">{experiences?.expectedSalary}</p>
                    )}
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

            {!editState && expValue === 'Professional' && (
              <Tabs
                type="editable-card"
                hideAdd
                onChange={onChangeExpTabs}
                activeKey={activeExpKey}
                items={displayedItems}
              />
            )}

            <div className="col-6">
              <div className="input-group-meta position-relative mb-15">
                <label className="fw-bold">How long your notice period?*</label>
                <Form.Item<FieldType>
                  name={['others', 'noticePeriod']}
                  className="mb-0"
                  // validateStatus={
                  //   errors && errors?.others?.noticePeriod ? 'error' : ''
                  // }
                  // help={errors?.others?.noticePeriod?._errors.toString()}
                >
                  {editState && (
                    <Select
                      className="w-100"
                      placeholder="Your Notice Period"
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
                  )}
                  {!editState && (
                    // <p className="mb-0">{experiences?.expectedSalary}</p>
                    <p className="mb-0">{noticePeriod}</p>
                  )}
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

export default BackgroundExperienceForm;
