'use client';

import React, { useState, useEffect, useRef } from 'react';
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

import { fpkData } from './job-fpk';

const { RangePicker } = DatePicker;

const { TextArea } = Input;

const { confirm } = Modal;

// props type
// type IProps = {
//   setIsOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>;
// };

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

    setModalOpen(false);
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
      {/* header start */}
      {/* <DashboardHeader /> */}
      {/* header end */}
      <h2 className="main-title">Set A New Parameter</h2>

      {/* <div>
        <Modal
          title="Choose FPK"
          centered
          open={modalOpen}
          maskClosable={false}
          closable={false}
          onOk={() => formModalRef?.current?.submit()}
          onCancel={() => setModalOpen(false)}
          okText="Submit Job FPK"
          cancelText="Don't Have Job FPK"
        >
          <Form
            ref={formModalRef}
            layout="vertical"
            variant="filled"
            onFinish={handleFpkModal}
          >
            <Form.Item
              name="jobFpkModal"
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
                options={fpkData.map((data) => {
                  return {
                    value: data.fpkNo,
                    label: `${data.jobTitle} - ${data.fpkNo}`,
                  };
                })}
              />
            </Form.Item>
          </Form>
        </Modal>
      </div> */}

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
            {/* <TextArea
              className="select"
              placeholder="Select Job Level Parameter"
              autoSize
            /> */}
            <Select
              className="select"
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
          {/* <div className="row">
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
            </div> */}
          <div className="col-xxl-8">
            <Form.Item
              name="minimumYearOfExperienceParameter"
              label="Minimum Year of Experience"
              rules={[
                {
                  required: true,
                  message: 'Please Input Minimum Year of Experience Parameter!',
                },
              ]}
            >
              <Select
                className="select"
                showSearch
                allowClear
                // disabled={!minimumYearOfExperienceParameterState}
                placeholder="Select Minimum Year of Experience"
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
              {/* <InputNumber
                  className="select"
                  min={1}
                  placeholder="Input Minimum Year Of Experience Parameter"
                  disabled={!minimumYearOfExperienceParameterState}
                /> */}
            </Form.Item>
          </div>
        </div>
        {/* </div> */}
        <div className="dash-input-wrapper mb-30">
          {/* <div className="row">
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
            </div> */}
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
              {/* <Slider
                  className="slider"
                  step={1}
                  min={0}
                  max={Object.keys(educationLevelMarks).length - 1}
                  range
                  marks={educationLevelMarks}
                  tooltip={{ formatter: null }}
                  disabled={!educationLevelParameterState}
                /> */}
            </Form.Item>
          </div>
        </div>
        {/* </div> */}
        <div className="dash-input-wrapper mb-30">
          {/* <div className="row">
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
            </div> */}
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
              {/* <Select
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
                /> */}
            </Form.Item>
          </div>
        </div>
        {/* </div> */}
        <div className="dash-input-wrapper mb-30">
          {/* <div className="row">
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
            </div> */}
          <div className="col-xxl-8">
            <Form.Item
              label="Grade"
              name="gradeParameter"
              rules={[
                {
                  required: true,
                  message: 'Please Input Grade!',
                },
              ]}
            >
              <InputNumber
                className="select"
                min={1}
                max={4}
                step={0.01}
                placeholder="Input Grade"
                // disabled={!gradeParameterState}
              />
              {/* <Slider
                  className="slider"
                  step={0.01}
                  min={0}
                  max={Object.keys(gradeMarks).length - 1}
                  range
                  marks={gradeMarks}
                  disabled={!gradeParameterState}
                /> */}
            </Form.Item>
          </div>
        </div>
        {/* </div> */}
        <div className="dash-input-wrapper mb-30">
          {/* <div className="row">
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
            </div> */}
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
        </div>
        {/* </div> */}
        <div className="dash-input-wrapper mb-30">
          {/* <div className="row">
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
            </div> */}
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
        </div>
        {/* </div> */}
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
            {/*<div className="col-xxl-4">
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
            </div> */}
            <div className="col-xxl-6">
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
                  className="select"
                  min={0}
                  placeholder="Input Start Salary Range"
                  // disabled={!salaryRangeParameterState}
                />
              </Form.Item>
            </div>
            <div className="col-xxl-6">
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
                  className="select"
                  min={0}
                  placeholder="Input End Salary Range"
                  // disabled={!salaryRangeParameterState}
                />
              </Form.Item>
            </div>
          </div>
        </div>
        <div className="dash-input-wrapper mb-30">
          {/* <div className="row">
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
            </div> */}
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
        </div>
        {/* </div> */}
        <div className="dash-input-wrapper mb-30">
          {/* <div className="row">
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
            </div> */}
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
                className="select"
                min={17}
                max={50}
                placeholder="Select Maximum Age!"
              />
            </Form.Item>
          </div>
        </div>
        {/* </div> */}
        <div className="dash-input-wrapper mb-30">
          {/* <div className="row">
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
            </div> */}
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
        </div>
        {/* // </div> */}
        <div className="dash-input-wrapper mb-30">
          {/* <div className="row">
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
            </div> */}
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
        </div>
        {/* </div> */}
        <div className="dash-input-wrapper mb-30">
          {/* <div className="row">
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
            </div> */}
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
        </div>
        {/* </div> */}
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
              Check this parameter to enable filter Line Industry
              {/* <Form.Item
                name="lineIndustryParameter"
                rules={
                  lineIndustryParameterState
                    ? [
                        {
                          required: true,
                          message: 'Please Input Line Industry!',
                        },
                      ]
                    : []
                }
              >
                <TextArea
                  className="select"
                  placeholder="Input Line Industry"
                  disabled
                  autoSize
                />
              </Form.Item> */}
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
              Check this parameter to enable filter Job Function
              {/* <Form.Item
                name="jobFunctionParameter"
                rules={
                  jobFunctionParameterState
                    ? [
                        {
                          required: true,
                          message: 'Please Select Job Function!',
                        },
                      ]
                    : []
                }
              >
                <TextArea
                  className="select"
                  placeholder="Input Job Function"
                  disabled
                  autoSize
                />
              </Form.Item> */}
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
              Checked this parameter to enable filter Position Level
              {/* <Form.Item
                name="positionLevelParameter"
                rules={
                  positionLevelParameterState
                    ? [
                        {
                          required: true,
                          message: 'Please Select Position Level!',
                        },
                      ]
                    : []
                }
              >
                <TextArea
                  className="select"
                  placeholder="Input Position Level"
                  disabled
                  autoSize
                />
              </Form.Item> */}
            </div>
          </div>
        </div>

        {/* <h4 className="dash-title-three pt-50 lg-pt-30">Benefit</h4>
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
        </div> */}

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

export default EmployJobParameter;
