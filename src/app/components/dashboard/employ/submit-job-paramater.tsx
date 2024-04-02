'use client';

import React, { useState, useRef } from 'react';
import {
  Cascader,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Mentions,
  Select,
  TimePicker,
  TreeSelect,
  Checkbox,
  Col,
  Row,
  Slider,
  Radio,
  Button,
  notification,
  Modal,
} from 'antd';

import { ExclamationCircleFilled } from '@ant-design/icons';
// import {
//   yearOfExperienceMarks,
//   educationLevelMarks,
//   gradeMarks,
//   ageMarks,
// } from '@/data/job-posting-data';
// import { fpkData } from './job-fpk';
// const { RangePicker } = DatePicker;
// const { TextArea } = Input;
const { confirm } = Modal;

const EmployJobParameter = () => {
  const [api, contextHolder] = notification.useNotification();

  // const openNotification = (placement) => {
  //   api.info({
  //     message: `Notification ${placement}`,
  //     description: (
  //       <Context.Consumer>{({ name }) => `Hello, ${name}!`}</Context.Consumer>
  //     ),
  //     placement,
  //   });
  // };

  const formModalRef = useRef(null);
  function handleFpkModal(values) {
    console.info(values);
    // setModalOpen(false);
  }

  function handleJobParameter(values) {
    confirm({
      title: 'Do you want to create new job parameter?',
      icon: <ExclamationCircleFilled />,
      centered: true,
      content:
        'When clicked the OK button, this dialog will be closed after 1 second',
      onOk() {
        return new Promise<void>((resolve, reject) => {
          setTimeout(() => {
            api.success({
              message: 'Notification',
              description: <p>Successfully Create New Job Parameter</p>,
              placement: 'topRight',
            });
            console.info(values);
            form.resetFields();
            resolve();
          }, 2000);
        }).catch(() => console.log('Oops errors!'));
      },
      onCancel() {},
    });
  }

  const [form] = Form.useForm();

  // const [
  //   minimumYearOfExperienceParameterState,
  //   setMinimumYearOfExperienceParameterState,
  // ] = useState(false);

  // const [educationLevelParameterState, setEducationLevelParameterState] =
  //   useState(false);

  // const [majorOfStudiesParameterState, setMajorOfStudiesParameterState] =
  //   useState(false);

  // const [gradeParameterState, setGradeParameterState] = useState(false);

  // const [specialSkillParameterState, setSpecialSkillParameterState] =
  //   useState(false);

  // const [certificationsParameterState, setCertificationsParameterState] =
  //   useState(false);

  // const [salaryRangeParameterState, setSalaryRangeParameterState] =
  //   useState(false);

  // const [domicileParamaterState, setDomicileParamaterState] = useState(false);

  // const [maximumAgeParameterState, setMaximumAgeParameterState] =
  //   useState(false);

  // const [genderParameterState, setGenderParameterState] = useState(false);

  // const [religionParameterState, setReligionParameterState] = useState(false);

  // const [raceParameterState, setRaceParameterState] = useState(false);

  const [lineIndustryParameterState, setLineIndustryParameterState] =
    useState(false);
  const [jobFunctionParameterState, setJobFunctionParameterState] =
    useState(false);
  const [positionLevelParameterState, setPositionLevelParameterState] =
    useState(false);

  const handleCategory = (item: { value: string; label: string }) => {};
  const handleJobType = (item: { value: string; label: string }) => {};
  const handleSalary = (item: { value: string; label: string }) => {};
  return (
    <>
      {contextHolder}
      <h2 className="main-title">Set A New Parameter</h2>
      <Form
        form={form}
        className="bg-white card-box border-20"
        layout="vertical"
        variant="filled"
        onFinish={handleJobParameter}
      >
        <h4 className="dash-title-three">Parameter Information</h4>
        <div className="dash-input-wrapper mb-30">
          <Form.Item
            label="Job Level Parameter"
            name="jobLevelParameter"
            rules={[
              { required: true, message: 'Please Select Job Level Parameter!' },
            ]}
          >
            <Select
              className="select"
              size="large"
              showSearch
              allowClear
              placeholder="Select Job Level Parameter"
              optionFilterProp="children"
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
                  value: '1',
                  label: 'Not Identified',
                },
                {
                  value: '2',
                  label: 'Closed',
                },
                {
                  value: '3',
                  label: 'Communicated',
                },
                {
                  value: '4',
                  label: 'Identified',
                },
                {
                  value: '5',
                  label: 'Resolved',
                },
                {
                  value: '6',
                  label: 'Cancelled',
                },
              ]}
            />
          </Form.Item>
        </div>

        <h4 className="dash-title-three">Parameter Settings</h4>
        <div className="dash-input-wrapper mb-30">
          <div className="col-xxl-8">
            <Form.Item
              // name="minimumYearOfExperienceParameter"
              name="totalExperienceParameter"
              label="Total Experience"
              rules={[
                {
                  required: true,
                  message: 'Please Input Total Experience Parameter!',
                },
              ]}
            >
              <Select
                className="select"
                size="large"
                showSearch
                allowClear
                // disabled={!minimumYearOfExperienceParameterState}
                placeholder="Select Total Experience"
                optionFilterProp="children"
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
                    value: '1',
                    label: 'Not Identified',
                  },
                  {
                    value: '2',
                    label: 'Closed',
                  },
                  {
                    value: '3',
                    label: 'Communicated',
                  },
                  {
                    value: '4',
                    label: 'Identified',
                  },
                  {
                    value: '5',
                    label: 'Resolved',
                  },
                  {
                    value: '6',
                    label: 'Cancelled',
                  },
                ]}
              />
            </Form.Item>
          </div>
        </div>
        {/* </div> */}
        <div className="dash-input-wrapper mb-30">
          <div className="col-xxl-8">
            <Form.Item
              label="Line Industry"
              name="lineIndustryParameter"
              rules={[
                {
                  required: true,
                  message: 'Please Select Line Industry!',
                },
              ]}
            >
              <Select
                className="select"
                size="large"
                showSearch
                allowClear
                // disabled={!educationLevelParameterState}
                placeholder="Select Line Industry"
                optionFilterProp="children"
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
                    value: '1',
                    label: 'Not Identified',
                  },
                  {
                    value: '2',
                    label: 'Closed',
                  },
                  {
                    value: '3',
                    label: 'Communicated',
                  },
                  {
                    value: '4',
                    label: 'Identified',
                  },
                  {
                    value: '5',
                    label: 'Resolved',
                  },
                  {
                    value: '6',
                    label: 'Cancelled',
                  },
                ]}
              />
            </Form.Item>
          </div>
        </div>
        <div className="dash-input-wrapper mb-30">
          <div className="col-xxl-8">
            <Form.Item
              label="Education Level"
              name="educationLevelParameter"
              rules={[
                {
                  required: true,
                  message: 'Please Select Education Level!',
                },
              ]}
            >
              <Select
                className="select"
                size="large"
                showSearch
                allowClear
                // disabled={!educationLevelParameterState}
                placeholder="Select Education Level"
                optionFilterProp="children"
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
                    value: '1',
                    label: 'Not Identified',
                  },
                  {
                    value: '2',
                    label: 'Closed',
                  },
                  {
                    value: '3',
                    label: 'Communicated',
                  },
                  {
                    value: '4',
                    label: 'Identified',
                  },
                  {
                    value: '5',
                    label: 'Resolved',
                  },
                  {
                    value: '6',
                    label: 'Cancelled',
                  },
                ]}
              />
            </Form.Item>
          </div>
        </div>
        {/* </div> */}
        {/* <div className="dash-input-wrapper mb-30">
          <div className="col-xxl-8">
            <Form.Item
              label="Major of Studies"
              name="majorOfStudiesParameter"
              rules={[
                {
                  required: true,
                  message: 'Please Select Major Of Studies!',
                },
              ]}
            >
              <Select
                className="select"
                size="large"
                showSearch
                allowClear
                // disabled={!majorOfStudiesParameterState}
                placeholder="Select Major of Studies"
                optionFilterProp="children"
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
                    value: '1',
                    label: 'Not Identified',
                  },
                  {
                    value: '2',
                    label: 'Closed',
                  },
                  {
                    value: '3',
                    label: 'Communicated',
                  },
                  {
                    value: '4',
                    label: 'Identified',
                  },
                  {
                    value: '5',
                    label: 'Resolved',
                  },
                  {
                    value: '6',
                    label: 'Cancelled',
                  },
                ]}
              />
            </Form.Item>
          </div>
        </div> */}
        {/* </div> */}
        <div className="dash-input-wrapper mb-30">
          <div className="col-lg-12">
            <Form.Item
              label="GPA"
              name="gpaParameter"
              rules={[
                {
                  required: true,
                  message: 'Please Input GPA!',
                },
              ]}
            >
              <InputNumber
                className="select d-flex align-items-center w-100"
                // size="small"
                min={1}
                max={4}
                step={0.01}
                placeholder="Input Grade"
                style={{ height: '40px' }}
                // disabled={!gradeParameterState}
              />
            </Form.Item>
          </div>
        </div>
        {/* </div> */}
        {/* <div className="dash-input-wrapper mb-30">
          <div className="col-xxl-8">
            <Form.Item
              label="Special Skill"
              name="specialSkillParameter"
              rules={[
                {
                  required: true,
                  message: 'Please Select Special Skill!',
                },
              ]}
            >
              <Select
                className="select"
                size="large"
                mode="multiple"
                // disabled={!specialSkillParameterState}
                allowClear
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.label ?? '').includes(input)
                }
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? '')
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? '').toLowerCase())
                }
                placeholder="Select Special Skill"
                options={[
                  { value: 'Yiminghe', label: 'yiminghe' },
                  { value: 'jack', label: 'Jack' },
                  { value: 'lucy', label: 'Lucy' },
                ]}
              />
            </Form.Item>
          </div>
        </div> */}
        {/* </div> */}
        {/* <div className="dash-input-wrapper mb-30">
          <div className="col-xxl-8">
            <Form.Item
              label="Certifications"
              name="certificationsParameter"
              rules={[
                {
                  required: true,
                  message: 'Please Select Certifications!',
                },
              ]}
            >
              <Select
                className="select"
                size="large"
                mode="multiple"
                // disabled={!certificationsParameterState}
                allowClear
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.label ?? '').includes(input)
                }
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? '')
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? '').toLowerCase())
                }
                placeholder="Select Certifications"
                options={[
                  { value: 'Yiminghe', label: 'yiminghe' },
                  { value: 'jack', label: 'Jack' },
                  { value: 'lucy', label: 'Lucy' },
                ]}
              />
            </Form.Item>
          </div>
        </div> */}
        {/* </div> */}
        <div className="dash-input-wrapper mb-5">
          <div className="row">
            <div className="col-lg-5">
              <Form.Item
                label="Start Salary Range"
                name="startSalaryRangeParameter"
                rules={[
                  {
                    required: true,
                    message: 'Please Input Start Salary Range!',
                  },
                ]}
              >
                <InputNumber
                  className="select d-flex align-items-center w-100"
                  min={0}
                  placeholder="Input Start Salary Range"
                  style={{ height: '40px' }}
                  // disabled={!salaryRangeParameterState}
                />
              </Form.Item>
            </div>
            <div className="col-lg-2 d-flex align-items-center justify-content-center">
              <b>
                <p className="text-center">__</p>
              </b>
            </div>
            {/* <div>-</div> */}
            <div className="col-lg-5">
              <Form.Item
                label="End Salary Range"
                name="endSalaryRangeParameter"
                rules={[
                  {
                    required: true,
                    message: 'Please Input End Salary Range!',
                  },
                ]}
              >
                <InputNumber
                  className="select d-flex align-items-center w-100"
                  min={0}
                  placeholder="Input End Salary Range"
                  style={{ height: '40px' }}
                  // disabled={!salaryRangeParameterState}
                />
              </Form.Item>
            </div>
          </div>
        </div>

        {/* <div className="dash-input-wrapper mb-30">
          <div className="col-xxl-8">
            <Form.Item
              label="Domicile"
              name="domicileParameter"
              rules={[
                {
                  required: true,
                  message: 'Please Select Domicile!',
                },
              ]}
            >
              <Select
                className="select"
                size="large"
                showSearch
                allowClear
                // disabled={!domicileParamaterState}
                placeholder="Select Domicile"
                optionFilterProp="children"
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
                    value: '1',
                    label: 'Not Identified',
                  },
                  {
                    value: '2',
                    label: 'Closed',
                  },
                  {
                    value: '3',
                    label: 'Communicated',
                  },
                  {
                    value: '4',
                    label: 'Identified',
                  },
                  {
                    value: '5',
                    label: 'Resolved',
                  },
                  {
                    value: '6',
                    label: 'Cancelled',
                  },
                ]}
              />
            </Form.Item>
          </div>
        </div> */}
        {/* </div> */}
        {/* <div className="dash-input-wrapper mb-30">
          <div className="col-xxl-8">
            <Form.Item
              label="Maximum Age"
              name="maximumAgeParameter"
              rules={[
                {
                  required: true,
                  message: 'Please Select Maximum Age',
                },
              ]}
            >
              <InputNumber
                className="select d-flex align-items-center w-100"
                min={17}
                max={50}
                placeholder="Select Maximum Age!"
                style={{ height: '40px' }}
              />
            </Form.Item>
          </div>
        </div> */}
        {/* </div> */}
        {/* <div className="dash-input-wrapper mb-30">
          <div className="col-xxl-8">
            <Form.Item
              label="Gender"
              name="genderParameter"
              rules={[
                {
                  required: true,
                  message: 'Please Select Gender!',
                },
              ]}
            >
              <Select
                className="select"
                size="large"
                showSearch
                // disabled={!genderParameterState}
                allowClear
                placeholder="Select Gender"
                optionFilterProp="children"
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
                    value: '1',
                    label: 'Not Identified',
                  },
                  {
                    value: '2',
                    label: 'Closed',
                  },
                  {
                    value: '3',
                    label: 'Communicated',
                  },
                  {
                    value: '4',
                    label: 'Identified',
                  },
                  {
                    value: '5',
                    label: 'Resolved',
                  },
                  {
                    value: '6',
                    label: 'Cancelled',
                  },
                ]}
              />
            </Form.Item>
          </div>
        </div> */}
        {/* // </div> */}
        {/* <div className="dash-input-wrapper mb-30">
          <div className="col-xxl-8">
            <Form.Item
              label="Religion"
              name="religionParameter"
              rules={[
                {
                  required: true,
                  message: 'Please Select Religion!',
                },
              ]}
            >
              <Select
                className="select"
                size="large"
                showSearch
                allowClear
                // disabled={!religionParameterState}
                placeholder="Select Religion"
                optionFilterProp="children"
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
                    value: '1',
                    label: 'Not Identified',
                  },
                  {
                    value: '2',
                    label: 'Closed',
                  },
                  {
                    value: '3',
                    label: 'Communicated',
                  },
                  {
                    value: '4',
                    label: 'Identified',
                  },
                  {
                    value: '5',
                    label: 'Resolved',
                  },
                  {
                    value: '6',
                    label: 'Cancelled',
                  },
                ]}
              />
            </Form.Item>
          </div>
        </div> */}
        {/* </div> */}
        {/* <div className="dash-input-wrapper mb-30">
          <div className="col-xxl-8">
            <Form.Item
              label="Race"
              name="raceParameter"
              rules={[
                {
                  required: true,
                  message: 'Please Select Race Parameter!',
                },
              ]}
            >
              <Select
                className="select"
                size="large"
                showSearch
                allowClear
                // disabled={!raceParameterState}
                placeholder="Select Race Parameter"
                optionFilterProp="children"
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
                    value: '1',
                    label: 'Not Identified',
                  },
                  {
                    value: '2',
                    label: 'Closed',
                  },
                  {
                    value: '3',
                    label: 'Communicated',
                  },
                  {
                    value: '4',
                    label: 'Identified',
                  },
                  {
                    value: '5',
                    label: 'Resolved',
                  },
                  {
                    value: '6',
                    label: 'Cancelled',
                  },
                ]}
              />
            </Form.Item>
          </div>
        </div> */}
        {/* </div> */}
        {/* <div className="dash-input-wrapper mb-30">
          <div className="row">
            <div className="col-xxl-4">
              <Form.Item
                name="lineIndustryParameterCheckbox"
                valuePropName="checked"
                className="form-item-custom-ant"
              >
                <Checkbox
                  className="checkbox d-flex align-items-center"
                  // checked={lineIndustryParameterState}
                  // onChange={() =>
                  //   setLineIndustryParameterState(!lineIndustryParameterState)
                  // }
                >
                  Line Industry
                </Checkbox>
              </Form.Item>
              <React.Fragment>
                Check this parameter to enable filter Line Industry
              </React.Fragment>
            </div>
          </div>
        </div> */}
        {/* <div className="dash-input-wrapper mb-30">
          <div className="row">
            <div className="col-xxl-4">
              <Form.Item
                name="jobFunctionParameterCheckbox"
                valuePropName="checked"
                className="form-item-custom-ant"
              >
                <Checkbox
                  className="checkbox d-flex align-items-center"
                >
                  Job Function
                </Checkbox>
              </Form.Item>
              <React.Fragment>
                Check this parameter to enable filter Job Function
              </React.Fragment>
            </div>
          </div>
        </div> */}
        {/* <div className="dash-input-wrapper mb-30">
          <div className="row">
            <div className="col-xxl-4">
              <Form.Item
                name="positionLevelParameterCheckbox"
                valuePropName="checked"
                className="form-item-custom-ant"
              >
                <Checkbox
                  className="checkbox d-flex align-items-center"
                >
                  Position Level
                </Checkbox>
              </Form.Item>
              <React.Fragment>
                Checked this parameter to enable filter Position Level
              </React.Fragment>
            </div>
          </div>
        </div> */}

        <div className="button-group d-flex flex-row align-items-center justify-content-start mt-50 w-100">
          <Form.Item className="mb-0">
            <Button
              className="dash-btn-two tran3s me-3"
              htmlType="submit"
              style={{
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                paddingBottom: '3px',
              }}
            >
              Submit
            </Button>
          </Form.Item>
          {/* <a href="#" className="dash-btn-two tran3s me-3">
              Next
            </a> */}
          <button className="dash-cancel-btn tran3s" type="button">
            Cancel
          </button>
        </div>
      </Form>
    </>
  );
};

export default EmployJobParameter;
