'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import DashboardHeader from '../candidate/dashboard-header';
import StateSelect from '../candidate/state-select';
import CitySelect from '../candidate/city-select';
import CountrySelect from '../candidate/country-select';
import EmployExperience from './employ-experience';
import icon from '@/assets/dashboard/images/icon/icon_16.svg';
import NiceSelect from '@/ui/nice-select';
import { SmileOutlined } from '@ant-design/icons';
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

import {
  yearOfExperienceMarks,
  educationLevelMarks,
  gradeMarks,
  ageMarks,
} from '@/data/job-posting-data';

const { RangePicker } = DatePicker;

const { TextArea } = Input;

const { confirm } = Modal;

// props type
// type IProps = {
//   setIsOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>;
// };

const SubmitJobArea = () => {
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

  function handleJobPost(values) {
    confirm({
      title: 'Do you want to create new job posting?',
      icon: <ExclamationCircleFilled />,
      centered: true,
      content:
        'When clicked the OK button, this dialog will be closed after 1 second',
      onOk() {
        return new Promise<void>((resolve, reject) => {
          setTimeout(() => {
            api.success({
              message: 'Notification',
              description: <p>Successfully Create New Job Posting</p>,
              placement: 'topRight',
            });
            console.info(values);
            resolve();
          }, 2000);
        }).catch(() => console.log('Oops errors!'));
      },
      onCancel() {},
    });
  }

  const [
    minimumYearOfExperienceParameterState,
    setMinimumYearOfExperienceParameterState,
  ] = useState(false);

  const [educationLevelParameterState, setEducationLevelParameterState] =
    useState(false);

  const [majorOfStudiesParameterState, setMajorOfStudiesParameterState] =
    useState(false);

  const [gradeParameterState, setGradeParameterState] = useState(false);

  const [specialSkillParameterState, setSpecialSkillParameterState] =
    useState(false);

  const [certificationsParameterState, setCertificationsParameterState] =
    useState(false);

  const [salaryRangeParameterState, setSalaryRangeParameterState] =
    useState(false);

  const [domicileParamaterState, setDomicileParamaterState] = useState(false);

  const [maximumAgeParameterState, setMaximumAgeParameterState] =
    useState(false);

  const [genderParameterState, setGenderParameterState] = useState(false);

  const [religionParameterState, setReligionParameterState] = useState(false);

  const [raceParameterState, setRaceParameterState] = useState(false);

  const [lineIndustryParameterState, setLineIndustryParameterState] =
    useState(false);

  const [jobFunctionParameterState, setJobFunctionParameterState] =
    useState(false);

  const [positionLevelParameterState, setPositionLevelParameterState] =
    useState(false);

  const [showBenefit, setShowBenefit] = useState('notShow');

  const handleCategory = (item: { value: string; label: string }) => {};
  const handleJobType = (item: { value: string; label: string }) => {};
  const handleSalary = (item: { value: string; label: string }) => {};
  return (
    <>
      {contextHolder}
      {/* header start */}
      {/* <DashboardHeader /> */}
      {/* header end */}
      <h2 className="main-title">Post a New Job</h2>

      <Form
        className="bg-white card-box border-20"
        layout="vertical"
        variant="filled"
        onFinish={handleJobPost}
      >
        <h4 className="dash-title-three">Job Position</h4>
        <div className="dash-input-wrapper mb-30">
          <Form.Item
            label="Job Title"
            name="jobTitle"
            rules={[{ required: true, message: 'Please Select Job Title!' }]}
          >
            <Select
              className="select"
              showSearch
              allowClear
              placeholder="Select Job Title"
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
        <div className="dash-input-wrapper mb-30">
          <Form.Item
            label="Job Function"
            name="jobFunction"
            rules={[{ required: true, message: 'Please Select Job Function!' }]}
          >
            <Select
              className="select"
              showSearch
              allowClear
              placeholder="Select Job Function"
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
        <div className="dash-input-wrapper mb-30">
          <Form.Item
            label="Employment Status"
            name="jobEmploymentStatus"
            rules={[
              { required: true, message: 'Please Select Employment Status!' },
            ]}
          >
            <Select
              className="select"
              showSearch
              allowClear
              placeholder="Select Employment Status"
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
        <div className="dash-input-wrapper mb-30">
          <Form.Item
            label="Position Level"
            name="jobPositionLevel"
            rules={[
              {
                required: true,
                message: 'Please Select Job Position Level!',
              },
            ]}
          >
            <Select
              className="select"
              showSearch
              allowClear
              placeholder="Select Job Position Level"
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
        <div className="dash-input-wrapper mb-30">
          <Form.Item
            label="Department"
            name="jobDepartment"
            rules={[
              { required: true, message: 'Please Select Job Department!' },
            ]}
          >
            <Select
              className="select"
              showSearch
              allowClear
              placeholder="Select Job Department"
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
        <div className="dash-input-wrapper mb-30">
          <Form.Item
            label="Line Industry"
            name="jobLineIndustry"
            rules={[
              {
                required: true,
                message: 'Please Select Job Line Industry!',
              },
            ]}
          >
            <Select
              className="select"
              mode="multiple"
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
              placeholder="Select Job Line Industry"
              options={[
                { value: 'Yiminghe', label: 'yiminghe' },
                { value: 'jack', label: 'Jack' },
                { value: 'lucy', label: 'Lucy' },
              ]}
            />
          </Form.Item>
        </div>
        <div className="dash-input-wrapper mb-30">
          <Form.Item
            label="Region"
            name="jobRegion"
            rules={[{ required: true, message: 'Please Select Job Region!' }]}
          >
            <Select
              className="select"
              showSearch
              allowClear
              placeholder="Select Job Region"
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
        <div className="dash-input-wrapper mb-30">
          <Form.Item
            label="Work Location City"
            name="jobWorkLocationCity"
            rules={[
              {
                required: true,
                message: 'Please Select Job Work Location City!',
              },
            ]}
          >
            <Select
              className="select"
              showSearch
              allowClear
              placeholder="Select Job Work Location City"
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
        <div className="dash-input-wrapper mb-30">
          <Form.Item
            label="Work Location"
            name="jobWorkLocation"
            rules={[
              { required: true, message: 'Please Select Job Work Location!' },
            ]}
          >
            <Select
              className="select"
              showSearch
              allowClear
              placeholder="Select Job Work Location"
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
        <div className="dash-input-wrapper mb-30">
          <Form.Item
            label="Published Date and Expired Date"
            name="jobPublishedDateAndExpiredDate"
            rules={[
              {
                required: true,
                message: 'Please Select Job Published Date and Expired Date!',
              },
            ]}
          >
            <RangePicker
              className="range"
              placeholder={['Published Date', 'Expired Date']}
              style={{}}
            />
          </Form.Item>
        </div>
        <div className="dash-input-wrapper mb-30">
          <Form.Item
            label="Job Description"
            name="jobDescription"
            rules={[
              { required: true, message: 'Please Input Job Description!' },
            ]}
          >
            <TextArea
              className="textArea"
              allowClear
              placeholder="Input Job Description"
              autoSize={{
                minRows: 8,
                maxRows: 12,
              }}
            />
          </Form.Item>
        </div>
        <div className="dash-input-wrapper mb-30">
          <Form.Item
            label="Job Requirement"
            name="jobRequirement"
            rules={[
              { required: true, message: 'Please Input Job Requirement!' },
            ]}
          >
            <TextArea
              className="textArea"
              allowClear
              placeholder="Input Job Requirement"
              autoSize={{
                minRows: 8,
                maxRows: 12,
              }}
            />
          </Form.Item>
        </div>

        <h4 className="dash-title-three pt-50 lg-pt-30">
          Parameter/Filter Set
        </h4>
        <div className="dash-input-wrapper mb-30">
          <div className="row">
            <div className="col-xxl-4">
              <Form.Item
                name="minimumYearOfExperienceParameterCheckbox"
                valuePropName="checked"
              >
                <Checkbox
                  className="checkbox"
                  checked={minimumYearOfExperienceParameterState}
                  onChange={() =>
                    setMinimumYearOfExperienceParameterState(
                      !minimumYearOfExperienceParameterState,
                    )
                  }
                >
                  Minimum Year Of Experience
                </Checkbox>
              </Form.Item>
            </div>
            <div className="col-xxl-8">
              <Form.Item
                name="minimumYearOfExperienceParameter"
                rules={
                  minimumYearOfExperienceParameterState
                    ? [
                        {
                          required: true,
                          message:
                            'Please Input Minimum Year Of Experience Parameter!',
                        },
                      ]
                    : []
                }
              >
                <InputNumber
                  className="select"
                  min={1}
                  placeholder="Input Minimum Year Of Experience Parameter"
                  disabled={!minimumYearOfExperienceParameterState}
                />
              </Form.Item>
            </div>
          </div>
        </div>
        <div className="dash-input-wrapper mb-30">
          <div className="row">
            <div className="col-xxl-4">
              <Form.Item
                name="educationLevelParameterCheckbox"
                valuePropName="checked"
              >
                <Checkbox
                  className="checkbox"
                  checked={educationLevelParameterState}
                  onChange={() => {
                    setEducationLevelParameterState(
                      !educationLevelParameterState,
                    );
                  }}
                >
                  Education Level
                </Checkbox>
              </Form.Item>
            </div>
            <div className="col-xxl-8">
              <Form.Item
                name="educationLevelParameter"
                rules={
                  educationLevelParameterState
                    ? [
                        {
                          required: true,
                          message: 'Please Select Education Level Parameter!',
                        },
                      ]
                    : []
                }
              >
                <Slider
                  className="slider"
                  step={1}
                  min={0}
                  max={Object.keys(educationLevelMarks).length - 1}
                  range
                  marks={educationLevelMarks}
                  tooltip={{ formatter: null }}
                  disabled={!educationLevelParameterState}
                />
              </Form.Item>
            </div>
          </div>
        </div>
        <div className="dash-input-wrapper mb-30">
          <div className="row">
            <div className="col-xxl-4">
              <Form.Item
                name="majorOfStudiesParameterCheckbox"
                valuePropName="checked"
              >
                <Checkbox
                  className="checkbox"
                  value={majorOfStudiesParameterState}
                  onChange={() => {
                    setMajorOfStudiesParameterState(
                      !majorOfStudiesParameterState,
                    );
                  }}
                >
                  Major Of Studies
                </Checkbox>
              </Form.Item>
            </div>
            <div className="col-xxl-8">
              <Form.Item
                name="majorOfStudiesParameter"
                rules={
                  majorOfStudiesParameterState
                    ? [
                        {
                          required: true,
                          message: 'Please Select Major Of Studies Parameter!',
                        },
                      ]
                    : []
                }
              >
                <Select
                  className="select"
                  mode="multiple"
                  disabled={!majorOfStudiesParameterState}
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
                  placeholder="Select Major Of Studies Parameter"
                  options={[
                    { value: 'Yiminghe', label: 'yiminghe' },
                    { value: 'jack', label: 'Jack' },
                    { value: 'lucy', label: 'Lucy' },
                  ]}
                />
              </Form.Item>
            </div>
          </div>
        </div>
        <div className="dash-input-wrapper mb-30">
          <div className="row">
            <div className="col-xxl-4">
              <Form.Item name="gradeParameterCheckbox" valuePropName="checked">
                <Checkbox
                  className="checkbox"
                  value={gradeParameterState}
                  onChange={() => setGradeParameterState(!gradeParameterState)}
                >
                  Grade
                </Checkbox>
              </Form.Item>
            </div>
            <div className="col-xxl-8">
              <Form.Item
                name="gradeParameter"
                rules={
                  gradeParameterState
                    ? [
                        {
                          required: true,
                          message: 'Please Select Grade Parameter!',
                        },
                      ]
                    : []
                }
              >
                <Slider
                  className="slider"
                  step={0.01}
                  min={0}
                  max={Object.keys(gradeMarks).length - 1}
                  range
                  marks={gradeMarks}
                  disabled={!gradeParameterState}
                />
              </Form.Item>
            </div>
          </div>
        </div>
        <div className="dash-input-wrapper mb-30">
          <div className="row">
            <div className="col-xxl-4">
              <Form.Item
                name="specialSkillParameterCheckbox"
                valuePropName="checked"
              >
                <Checkbox
                  className="checkbox"
                  value={specialSkillParameterState}
                  onChange={() =>
                    setSpecialSkillParameterState(!specialSkillParameterState)
                  }
                >
                  Special Skill
                </Checkbox>
              </Form.Item>
            </div>
            <div className="col-xxl-8">
              <Form.Item
                name="specialSkillParameter"
                rules={
                  specialSkillParameterState
                    ? [
                        {
                          required: true,
                          message: 'Please Select Special Skill Parameter!',
                        },
                      ]
                    : []
                }
              >
                <Select
                  className="select"
                  mode="multiple"
                  disabled={!specialSkillParameterState}
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
                  placeholder="Select Special Skill Parameter"
                  options={[
                    { value: 'Yiminghe', label: 'yiminghe' },
                    { value: 'jack', label: 'Jack' },
                    { value: 'lucy', label: 'Lucy' },
                  ]}
                />
              </Form.Item>
            </div>
          </div>
        </div>
        <div className="dash-input-wrapper mb-30">
          <div className="row">
            <div className="col-xxl-4">
              <Form.Item
                name="certificationsParameterCheckbox"
                valuePropName="checked"
              >
                <Checkbox
                  className="checkbox"
                  value={certificationsParameterState}
                  onChange={() =>
                    setCertificationsParameterState(
                      !certificationsParameterState,
                    )
                  }
                >
                  Certifications
                </Checkbox>
              </Form.Item>
            </div>
            <div className="col-xxl-8">
              <Form.Item
                name="certificationsParameter"
                rules={
                  certificationsParameterState
                    ? [
                        {
                          required: true,
                          message: 'Please Select Certifications Parameter!',
                        },
                      ]
                    : []
                }
              >
                <Select
                  className="select"
                  mode="multiple"
                  disabled={!certificationsParameterState}
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
                  placeholder="Select Certifications Parameter"
                  options={[
                    { value: 'Yiminghe', label: 'yiminghe' },
                    { value: 'jack', label: 'Jack' },
                    { value: 'lucy', label: 'Lucy' },
                  ]}
                />
              </Form.Item>
            </div>
          </div>
        </div>
        {/* <div className="dash-input-wrapper mb-30">
            <div className="row">
              <div className="col-xxl-4">
                <Checkbox className="checkbox">Job Title</Checkbox>
              </div>
              <div className="col-xxl-8">
                <Form.Item
                  name="jobTitleParameter"
                  rules={[
                    {
                      required: true,
                      message: 'Please Select Job Title Parameter!',
                    },
                  ]}
                >
                  <Select
                    className="select"
                    mode="multiple"
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
                    placeholder="Select Job Title Parameter"
                    options={[
                      { value: 'Yiminghe', label: 'yiminghe' },
                      { value: 'jack', label: 'Jack' },
                      { value: 'lucy', label: 'Lucy' },
                    ]}
                  />
                </Form.Item>
              </div>
            </div>
          </div> */}
        <div className="dash-input-wrapper mb-30">
          <div className="row">
            <div className="col-xxl-4">
              <Form.Item
                name="salaryRangeParameterCheckbox"
                valuePropName="checked"
              >
                <Checkbox
                  className="checkbox"
                  value={salaryRangeParameterState}
                  onChange={() =>
                    setSalaryRangeParameterState(!salaryRangeParameterState)
                  }
                >
                  Salary Range
                </Checkbox>
              </Form.Item>
            </div>
            <div className="col-xxl-8">
              <Form.Item
                name="salaryRangeParameter"
                rules={
                  salaryRangeParameterState
                    ? [
                        {
                          required: true,
                          message: 'Please Select Salary Range Parameter!',
                        },
                      ]
                    : []
                }
              >
                <Slider
                  className="slider"
                  step={1}
                  min={0}
                  max={Object.keys(educationLevelMarks).length - 1}
                  range
                  marks={educationLevelMarks}
                  disabled={!salaryRangeParameterState}
                />
              </Form.Item>
            </div>
          </div>
        </div>
        <div className="dash-input-wrapper mb-30">
          <div className="row">
            <div className="col-xxl-4">
              <Form.Item
                name="domicileParameterCheckbox"
                valuePropName="checked"
              >
                <Checkbox
                  className="checkbox"
                  value={domicileParamaterState}
                  onChange={() =>
                    setDomicileParamaterState(!domicileParamaterState)
                  }
                >
                  Domicile
                </Checkbox>
              </Form.Item>
            </div>
            <div className="col-xxl-8">
              <Form.Item
                name="domicileParameter"
                rules={
                  domicileParamaterState
                    ? [
                        {
                          required: true,
                          message: 'Please Select Domicile Parameter!',
                        },
                      ]
                    : []
                }
              >
                <Select
                  className="select"
                  mode="multiple"
                  disabled={!domicileParamaterState}
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
                  placeholder="Select Domicile Parameter"
                  options={[
                    { value: 'Yiminghe', label: 'yiminghe' },
                    { value: 'jack', label: 'Jack' },
                    { value: 'lucy', label: 'Lucy' },
                  ]}
                />
              </Form.Item>
            </div>
          </div>
        </div>
        <div className="dash-input-wrapper mb-30">
          <div className="row">
            <div className="col-xxl-4">
              <Form.Item
                name="maximumAgeParameterCheckbox"
                valuePropName="checked"
              >
                <Checkbox
                  className="checkbox"
                  value={maximumAgeParameterState}
                  onChange={() =>
                    setMaximumAgeParameterState(!maximumAgeParameterState)
                  }
                >
                  Maximum Age
                </Checkbox>
              </Form.Item>
            </div>
            <div className="col-xxl-8">
              <Form.Item
                name="maximumAgeParameter"
                rules={
                  maximumAgeParameterState
                    ? [
                        {
                          required: true,
                          message: 'Please Select Maximum Age Parameter',
                        },
                      ]
                    : []
                }
              >
                <InputNumber
                  className="select"
                  min={1}
                  placeholder="Select Maximum Age Parameter!"
                  disabled={!maximumAgeParameterState}
                />
              </Form.Item>
            </div>
          </div>
        </div>
        <div className="dash-input-wrapper mb-30">
          <div className="row">
            <div className="col-xxl-4">
              <Form.Item name="genderParameterCheckbox" valuePropName="checked">
                <Checkbox
                  className="checkbox"
                  value={genderParameterState}
                  onChange={() =>
                    setGenderParameterState(!genderParameterState)
                  }
                >
                  Gender
                </Checkbox>
              </Form.Item>
            </div>
            <div className="col-xxl-8">
              <Form.Item
                name="genderParameter"
                rules={
                  genderParameterState
                    ? [
                        {
                          required: true,
                          message: 'Please Select Gender Parameter!',
                        },
                      ]
                    : []
                }
              >
                <Select
                  className="select"
                  showSearch
                  disabled={!genderParameterState}
                  allowClear
                  placeholder="Select Gender Parameter"
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
        </div>
        <div className="dash-input-wrapper mb-30">
          <div className="row">
            <div className="col-xxl-4">
              <Form.Item
                name="religionParameterCheckbox"
                valuePropName="checked"
              >
                <Checkbox
                  className="checkbox"
                  value={religionParameterState}
                  onChange={() =>
                    setReligionParameterState(!religionParameterState)
                  }
                >
                  Religion
                </Checkbox>
              </Form.Item>
            </div>
            <div className="col-xxl-8">
              <Form.Item
                name="religionParameter"
                rules={
                  religionParameterState
                    ? [
                        {
                          required: true,
                          message: 'Please Select Religion Parameter!',
                        },
                      ]
                    : []
                }
              >
                <Select
                  className="select"
                  mode="multiple"
                  disabled={!religionParameterState}
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
                  placeholder="Select Religion Parameter"
                  options={[
                    { value: 'Yiminghe', label: 'yiminghe' },
                    { value: 'jack', label: 'Jack' },
                    { value: 'lucy', label: 'Lucy' },
                  ]}
                />
              </Form.Item>
            </div>
          </div>
        </div>
        <div className="dash-input-wrapper mb-30">
          <div className="row">
            <div className="col-xxl-4">
              <Form.Item name="raceParameterCheckbox" valuePropName="checked">
                <Checkbox
                  className="checkbox"
                  value={raceParameterState}
                  onChange={() => setRaceParameterState(!raceParameterState)}
                >
                  Race (Suku Bangsa)
                </Checkbox>
              </Form.Item>
            </div>
            <div className="col-xxl-8">
              <Form.Item
                name="raceParameter"
                rules={
                  raceParameterState
                    ? [
                        {
                          required: true,
                          message: 'Please Select Race Parameter!',
                        },
                      ]
                    : []
                }
              >
                <Select
                  className="select"
                  mode="multiple"
                  disabled={!raceParameterState}
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
                  placeholder="Select Race Parameter"
                  options={[
                    { value: 'Yiminghe', label: 'yiminghe' },
                    { value: 'jack', label: 'Jack' },
                    { value: 'lucy', label: 'Lucy' },
                  ]}
                />
              </Form.Item>
            </div>
          </div>
        </div>
        {/* <div className="dash-input-wrapper mb-30">
            <div className="row">
              <div className="col-xxl-4">
                <Checkbox className="checkbox">University</Checkbox>
              </div>
              <div className="col-xxl-8">
                <Form.Item
                  name="universityParameter"
                  rules={[
                    {
                      required: true,
                      message: 'Please Select University Parameter!',
                    },
                  ]}
                >
                  <Select
                    className="select"
                    mode="multiple"
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
                    placeholder="Select University Parameter"
                    options={[
                      { value: 'Yiminghe', label: 'yiminghe' },
                      { value: 'jack', label: 'Jack' },
                      { value: 'lucy', label: 'Lucy' },
                    ]}
                  />
                </Form.Item>
              </div>
            </div>
          </div> */}
        <div className="dash-input-wrapper mb-30">
          <div className="row">
            <div className="col-xxl-4">
              <Form.Item
                name="lineIndustryParameterCheckbox"
                valuePropName="checked"
              >
                <Checkbox
                  className="checkbox"
                  value={lineIndustryParameterState}
                  onChange={() =>
                    setLineIndustryParameterState(!lineIndustryParameterState)
                  }
                >
                  Line Industry
                </Checkbox>
              </Form.Item>
            </div>
            <div className="col-xxl-8">
              <Form.Item
                name="lineIndustryParameter"
                rules={
                  lineIndustryParameterState
                    ? [
                        {
                          required: true,
                          message: 'Please Select Line Industry Parameter!',
                        },
                      ]
                    : []
                }
              >
                <Select
                  className="select"
                  mode="multiple"
                  disabled={!lineIndustryParameterState}
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
                  placeholder="Select Line Industry Parameter"
                  options={[
                    { value: 'Yiminghe', label: 'yiminghe' },
                    { value: 'jack', label: 'Jack' },
                    { value: 'lucy', label: 'Lucy' },
                  ]}
                />
              </Form.Item>
            </div>
          </div>
        </div>
        <div className="dash-input-wrapper mb-30">
          <div className="row">
            <div className="col-xxl-4">
              <Form.Item
                name="jobFunctionParameterCheckbox"
                valuePropName="checked"
              >
                <Checkbox
                  className="checkbox"
                  value={jobFunctionParameterState}
                  onChange={() =>
                    setJobFunctionParameterState(!jobFunctionParameterState)
                  }
                >
                  Job Function
                </Checkbox>
              </Form.Item>
            </div>
            <div className="col-xxl-8">
              <Form.Item
                name="jobFunctionParameter"
                rules={
                  jobFunctionParameterState
                    ? [
                        {
                          required: true,
                          message: 'Please Select Job Function Parameter!',
                        },
                      ]
                    : []
                }
              >
                <Select
                  className="select"
                  showSearch
                  disabled={!jobFunctionParameterState}
                  allowClear
                  placeholder="Select Job Function Parameter"
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
        </div>
        <div className="dash-input-wrapper mb-30">
          <div className="row">
            <div className="col-xxl-4">
              <Form.Item
                name="positionLevelParameterCheckbox"
                valuePropName="checked"
              >
                <Checkbox
                  className="checkbox"
                  value={positionLevelParameterState}
                  onChange={() =>
                    setPositionLevelParameterState(!positionLevelParameterState)
                  }
                >
                  Position Level
                </Checkbox>
              </Form.Item>
            </div>
            <div className="col-xxl-8">
              <Form.Item
                name="positionLevelParameter"
                rules={
                  positionLevelParameterState
                    ? [
                        {
                          required: true,
                          message: 'Please Select Position Level Parameter!',
                        },
                      ]
                    : []
                }
              >
                <Select
                  className="select"
                  showSearch
                  disabled={!positionLevelParameterState}
                  allowClear
                  placeholder="Select Position Level Parameter"
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
        </div>

        <h4 className="dash-title-three pt-50 lg-pt-30">Benefit</h4>
        <div className="dash-input-wrapper mb-30">
          <Form.Item
            label="Show Benefit"
            name="showBenefit"
            rules={[
              {
                required: true,
                message: 'Please Select Show Benefit Or Not Show Benefit!',
              },
            ]}
          >
            <Radio.Group
              className="radio"
              buttonStyle="solid"
              value={showBenefit}
              onChange={(e) => setShowBenefit(e.target.value)}
            >
              <Radio.Button className="radio-children" value="show">
                Show Benefit
              </Radio.Button>
              <Radio.Button className="radio-children" value="notShow">
                Don&apos;t Show Benefit
              </Radio.Button>
            </Radio.Group>
          </Form.Item>
        </div>
        <div className="dash-input-wrapper mb-30">
          <Form.Item
            label="Benefit"
            name="jobBenefit"
            rules={
              showBenefit === 'show'
                ? [{ required: true, message: 'Please Select Job Benefit!' }]
                : []
            }
          >
            <Select
              className="select"
              mode="multiple"
              disabled={showBenefit === 'show' ? false : true}
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
              placeholder="Select Job Benefit"
              options={[
                { value: 'Yiminghe', label: 'yiminghe' },
                { value: 'jack', label: 'Jack' },
                { value: 'lucy', label: 'Lucy' },
              ]}
            />
          </Form.Item>
        </div>

        <h4 className="dash-title-three pt-50 lg-pt-30">Other Settings</h4>
        {/* <div className="dash-input-wrapper mb-30">
            <Form.Item
              label="Status Pipeline"
              name="jobStatusPipeline"
              rules={[
                {
                  required: true,
                  message: 'Please Select Job Status Pipeline!',
                },
              ]}
            >
              <Select
                className="select"
                showSearch
                allowClear
                placeholder="Select Job Status Pipeline"
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
          </div> */}
        <div className="dash-input-wrapper mb-30">
          <Form.Item
            label="FPK"
            name="jobFpk"
            rules={[
              {
                required: true,
                message: 'Please Select Job FPK!',
              },
            ]}
          >
            <Select
              className="select"
              mode="multiple"
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
              placeholder="Select Job FPK"
              options={[
                { value: 'Yiminghe', label: 'yiminghe' },
                { value: 'jack', label: 'Jack' },
                { value: 'lucy', label: 'Lucy' },
              ]}
            />
          </Form.Item>
        </div>
        {/* <div className="dash-input-wrapper mb-30">
            <Form.Item
              label="FPK User"
              name="jobFpkUser"
              rules={[
                {
                  required: true,
                  message: 'Please Select Job FPK User!',
                },
              ]}
            >
              <Select
                className="select"
                mode="multiple"
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
                placeholder="Select Job FPK User"
                options={[
                  { value: 'Yiminghe', label: 'yiminghe' },
                  { value: 'jack', label: 'Jack' },
                  { value: 'lucy', label: 'Lucy' },
                ]}
              />
            </Form.Item>
          </div> */}
        {/* <div className="dash-input-wrapper mb-30">
            <Form.Item
              label="HR AREA"
              name="jobHrArea"
              rules={[
                {
                  required: true,
                  message: 'Please Select Job HR AREA!',
                },
              ]}
            >
              <Select
                className="select"
                mode="multiple"
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
                placeholder="Select Job HR AREA"
                options={[
                  { value: 'Yiminghe', label: 'yiminghe' },
                  { value: 'jack', label: 'Jack' },
                  { value: 'lucy', label: 'Lucy' },
                ]}
              />
            </Form.Item>
          </div> */}
        {/* <div className="dash-input-wrapper mb-30">
            <Form.Item
              label="HRBP User"
              name="jobHrbpUser"
              rules={[
                {
                  required: true,
                  message: 'Please Select Job HRBP User!',
                },
              ]}
            >
              <Select
                className="select"
                mode="multiple"
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
                placeholder="Select Job HRBP User"
                options={[
                  { value: 'Yiminghe', label: 'yiminghe' },
                  { value: 'jack', label: 'Jack' },
                  { value: 'lucy', label: 'Lucy' },
                ]}
              />
            </Form.Item>
          </div> */}
        {/* <div className="dash-input-wrapper mb-30">
            <Form.Item
              label="Assessment User"
              name="jobAssessmentUser"
              rules={[
                {
                  required: true,
                  message: 'Please Select Job Assessment User!',
                },
              ]}
            >
              <Select
                className="select"
                showSearch
                allowClear
                placeholder="Select Job Assessment User"
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
          </div> */}
        <div className="dash-input-wrapper mb-30">
          <Form.Item
            label="Video Interview"
            name="jobVideoInterview"
            rules={[
              {
                required: true,
                message:
                  'Please Select Want Enable Video Interview Or Disable Video Interview!',
              },
            ]}
          >
            <Radio.Group className="radio" buttonStyle="solid">
              <Radio.Button className="radio-children" value="enable">
                Enable
              </Radio.Button>
              <Radio.Button className="radio-children" value="disable">
                Disable
              </Radio.Button>
            </Radio.Group>
          </Form.Item>
        </div>
        <div className="dash-input-wrapper mb-30">
          <Form.Item
            label="Auto Assessment"
            name="jobAutoAssessment"
            rules={[
              {
                required: true,
                message:
                  'Please Select Want Enable Auto Assessment Or Disable Auto Assessment!',
              },
            ]}
          >
            <Radio.Group className="radio" buttonStyle="solid">
              <Radio.Button className="radio-children" value="enable">
                Enable
              </Radio.Button>
              <Radio.Button className="radio-children" value="disable">
                Disable
              </Radio.Button>
            </Radio.Group>
          </Form.Item>
        </div>
        <div className="dash-input-wrapper mb-30">
          <Form.Item
            label="Is Confidential?"
            name="jobConfidential"
            rules={[
              {
                required: true,
                message: 'Please Select Job Confidential!',
              },
            ]}
          >
            <Radio.Group className="radio" buttonStyle="solid">
              <Radio.Button className="radio-children" value="yes">
                Yes
              </Radio.Button>
              <Radio.Button className="radio-children" value="no">
                No
              </Radio.Button>
            </Radio.Group>
          </Form.Item>
        </div>
        {/* <div className="dash-input-wrapper mb-30">
            <Form.Item
              label="Takedown"
              name="jobTakedown"
              rules={[
                {
                  required: true,
                  message:
                    'Please Select Want Takedown Or Don&apos;t Want Takedown!',
                },
              ]}
            >
              <Radio.Group className="radio" buttonStyle="solid">
                <Radio.Button className="radio-children" value="yes">
                  Yes
                </Radio.Button>
                <Radio.Button className="radio-children" value="no">
                  No
                </Radio.Button>
              </Radio.Group>
            </Form.Item>
          </div> */}
        <div className="dash-input-wrapper mb-30">
          <Form.Item
            label="Is Career Fest?"
            name="jobCareerFest"
            rules={[
              {
                required: true,
                message: 'Please Select Job Career Fest!',
              },
            ]}
          >
            <Radio.Group className="radio" buttonStyle="solid">
              <Radio.Button className="radio-children" value="yes">
                Yes
              </Radio.Button>
              <Radio.Button className="radio-children" value="no">
                No
              </Radio.Button>
            </Radio.Group>
          </Form.Item>
        </div>
        <div className="dash-input-wrapper mb-30">
          <Form.Item
            label="Collaborator"
            name="jobPostingCollaborator"
            rules={[
              {
                required: true,
                message: 'Please Select Job Posting Collaborator!',
              },
            ]}
          >
            <Select
              className="select"
              mode="multiple"
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
              placeholder="Select Job Collaborator"
              options={[
                { value: 'Yiminghe', label: 'yiminghe' },
                { value: 'jack', label: 'Jack' },
                { value: 'lucy', label: 'Lucy' },
              ]}
            />
          </Form.Item>
        </div>

        <div className="button-group d-flex flex-row align-items-center justify-content-start mt-50 w-100">
          <Form.Item className="mb-0">
            <Button className="dash-btn-two tran3s me-3" htmlType="submit">
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

export default SubmitJobArea;
