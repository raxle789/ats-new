import React, { useState, useRef } from 'react';
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

const BackgroundExperienceForm = () => {
  const [form] = Form.useForm();
  const [masterData, setMasterData] = useState<MasterData | null>(null);
  const [editState, setEditState] = useState(false);
  const editOnChange = () => {
    setEditState(!editState);
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

  const handleCheckboxRef: CheckboxProps['onChange'] = (
    e: any,
    expIdx: number,
  ) => {
    console.log(e.target.checked);
    console.log('expIdx: ', expIdx);
    // currentYear.current[expIdx].disabled = e.target.checked;
    // currentYear.current[expIdx + 1].disabled = e.target.checked;
    // Memastikan bahwa currentYear.current telah diinisialisasi
    if (currentYear.current) {
      console.log('sudah cek currentYear ref');
      // Memastikan bahwa currentYear.current[expIdx] dan currentYear.current[expIdx + 1] ada
      if (currentYear.current[expIdx] && currentYear.current[expIdx + 1]) {
        // Mengubah status disabled
        currentYear.current[expIdx].disabled = e.target.checked;
        currentYear.current[expIdx + 1].disabled = e.target.checked;
      } else {
        console.error(
          'Index out of bounds or currentYear.current is not initialized properly.',
        );
      }
    } else {
      console.error('currentYear.current is not initialized.');
    }
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
              ref={(ref) =>
                console.log('refstart: ', (currentYear.current[expIdx] = ref))
              }
              className="w-100"
              placeholder="Select Year"
              picker="month"
              // disabled={yearState[expIdx]}
              // disabled={yearState}
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
              ref={(ref) => (currentYear.current[expIdx + 1] = ref)}
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
              // disabled={yearState[expIdx]}
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
              // onChange={(e) => handleCheckboxChange(e, expIdx)}
              // checked={yearState[expIdx] || false}
              onChange={(e) => handleCheckboxRef(e, expIdx)}
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
  return (
    <>
      {/* <h2 className="main-title">Background Experience</h2> */}

      {/* <div className="bg-white card-box border-20"> */}
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

export default BackgroundExperienceForm;
