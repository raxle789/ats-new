'use client';
import React, { useState, useEffect, useRef } from 'react';
// import Image from 'next/image';
// import DashboardHeader from '../candidate/dashboard-header';
import ReactQuill from 'react-quill';
// import StateSelect from '../candidate/state-select';
// import CitySelect from '../candidate/city-select';
// import CountrySelect from '../candidate/country-select';
// import EmployExperience from './employ-experience';
// import icon from '@/assets/dashboard/images/icon/icon_16.svg';
// import NiceSelect from '@/ui/nice-select';
// import { SmileOutlined } from '@ant-design/icons';
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
  Divider,
  Space,
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import type { InputRef } from 'antd';

import type { SelectProps } from 'antd';
import type { CheckboxProps } from 'antd';
import { ExclamationCircleFilled } from '@ant-design/icons';

// import {
//   yearOfExperienceMarks,
//   educationLevelMarks,
//   gradeMarks,
//   ageMarks,
// } from '@/data/job-posting-data';
// import { fpkData } from './job-fpk';
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const { confirm } = Modal;
let index = 0;

const optionValues: SelectProps['options'] = [
  { value: 'jack', label: 'jack' },
  { value: 'lucy', label: 'lucy' },
  { value: 'harper', label: 'harper' },
];

// for (let i = 10; i < 36; i++) {
//   optionValues.push({
//     value: i.toString(36) + i,
//     label: i.toString(36) + i,
//   });
// }

const onChange: CheckboxProps['onChange'] = (e) => {
  console.log(`checked = ${e.target.checked}`);
};

// props type
// type IProps = {
//   setIsOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>;
// };

const SubmitJobArea = () => {
  const [api, contextHolder] = notification.useNotification();
  const [inputState, setInputState] = useState({
    age: false,
    gender: false,
    skill: false,
    certificate: false,
  });

  const [items, setItems] = useState(['jack', 'lucy']);
  const [name, setName] = useState('');
  const inputRef = useRef<InputRef>(null);

  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const addItem = (
    e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>,
  ) => {
    e.preventDefault();
    setItems([...items, name || `New item ${index++}`]);
    setName('');
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  const handleCheckboxChange = (inputName: string) => (e: any) => {
    setInputState({
      ...inputState,
      [inputName]: e.target.checked,
    });
  };

  async function handleFpkModal(values: boolean) {
    console.info(values);
    setModalOpen(false);
  }

  const formModalRef = useRef(null);
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ font: [] }],
      [{ size: [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { align: [] },
        { indent: '-1' },
        { indent: '+1' },
      ],
      ['link', 'image', 'video'],
    ],
    // clipboard: {
    //   matchers: [
    //     [
    //       '\n',
    //       (node, delta) => {
    //         return delta.compose(
    //           new Delta().retain(delta.length(), { list: 'bullet' }),
    //         );
    //       },
    //     ],
    //   ],
    // },
  };

  function handleJobPost(values: any) {
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
            form.resetFields();
            resolve();
          }, 2000);
        }).catch(() => console.log('Oops errors!'));
      },
      onCancel() {},
    });
  }

  const [modalOpen, setModalOpen] = useState(false);
  const [form] = Form.useForm();
  useEffect(() => {
    setModalOpen(true);
  }, []);

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

      <div>
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
                showSearch
                allowClear
                placeholder="Select Job FPK"
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
          </Form>
        </Modal>
      </div>

      <Form
        form={form}
        className="bg-white card-box border-20"
        layout="vertical"
        variant="filled"
        onFinish={handleJobPost}
      >
        <h4 className="dash-title-three">FPK</h4>
        <div className="dash-input-wrapper mb-50">
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
              size="large"
              showSearch
              allowClear
              placeholder="Select Job FPK"
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

        <h4 className="dash-title-three">Job Position</h4>
        <div className="dash-input-wrapper mb-30">
          <Form.Item
            label="Job Title"
            name="jobTitle"
            rules={[{ required: true, message: 'Please Input Job Title!' }]}
          >
            <Select
              className="select"
              showSearch
              size="large"
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
              options={optionValues}
            />
          </Form.Item>
        </div>
        <div className="dash-input-wrapper mb-30">
          <Form.Item
            label="Job Title Aliases"
            name="jobTitleAliases"
            rules={[
              { required: true, message: 'Please Input Job Title Aliases!' },
            ]}
          >
            <Input
              placeholder="Input Job Title Aliases"
              size="large"
              style={{ height: '40px' }}
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
              size="large"
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
              size="large"
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
              size="large"
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
            label="Vertical"
            name="jobVertical"
            rules={[{ required: true, message: 'Please Select Job Vertical!' }]}
          >
            <Select
              className="select"
              size="large"
              showSearch
              allowClear
              placeholder="Select Job Vertical"
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
              size="large"
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
              showSearch
              size="large"
              mode="tags"
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
              options={optionValues}
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
              size="large"
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
            label="Work Location"
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
              size="large"
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
            label="Work Location Address"
            name="jobWorkLocation"
            rules={[
              { required: true, message: 'Please Input Job Work Location!' },
            ]}
          >
            <TextArea
              className="select"
              placeholder="Input Job Work Location"
              autoSize={{ minRows: 1 }}
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
              size="small"
              placeholder={['Published Date', 'Expired Date']}
              style={{ height: '50px', paddingLeft: '12px' }}
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
            <ReactQuill
              className="textArea"
              theme="snow"
              modules={modules}
              placeholder="Input Job Description"
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
            <ReactQuill
              className="textArea"
              theme="snow"
              modules={modules}
              placeholder="Input Job Requirement"
            />
          </Form.Item>
        </div>

        <h4 className="dash-title-three pt-50 lg-pt-30">
          Parameter/Filter Set
        </h4>
        <div>
          <Form.Item name="jobParameterAge">
            <div className="d-flex align-items-center">
              <Checkbox
                onChange={handleCheckboxChange('age')}
                style={{ width: '115px' }}
              >
                Age
              </Checkbox>
              <InputNumber
                className="select d-flex align-items-center w-100"
                min={0}
                step={1}
                placeholder="Input Age"
                style={{ height: '40px' }}
                disabled={!inputState.age}
              />
            </div>
          </Form.Item>
        </div>
        <div>
          <Form.Item name="jobParameterGender">
            <div className="d-flex align-items-center">
              <Checkbox
                onChange={handleCheckboxChange('gender')}
                style={{ width: '115px' }}
              >
                Gender
              </Checkbox>
              <Select
                className="select"
                size="large"
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
                disabled={!inputState.gender}
                options={[
                  {
                    value: '1',
                    label: 'Female',
                  },
                  {
                    value: '2',
                    label: 'Male',
                  },
                ]}
              />
            </div>
          </Form.Item>
        </div>
        <div>
          <Form.Item name="jobParameterSkill">
            <div className="d-flex align-items-center">
              <Checkbox
                onChange={handleCheckboxChange('skill')}
                style={{ width: '115px' }}
              >
                Skill
              </Checkbox>
              <Select
                className="select"
                mode="multiple"
                size="large"
                showSearch
                allowClear
                placeholder="Select Skill"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.label ?? '').includes(input)
                }
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? '')
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? '').toLowerCase())
                }
                disabled={!inputState.skill}
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
            </div>
          </Form.Item>
        </div>
        <div>
          <Form.Item name="jobParameter">
            <div className="d-flex align-items-center">
              <Checkbox
                onChange={handleCheckboxChange('certificate')}
                style={{ width: '115px' }}
              >
                Certificate
              </Checkbox>
              <Select
                className="select"
                mode="multiple"
                size="large"
                showSearch
                allowClear
                placeholder="Select Certificate"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.label ?? '').includes(input)
                }
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? '')
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? '').toLowerCase())
                }
                disabled={!inputState.certificate}
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
            </div>
          </Form.Item>
        </div>

        <h4 className="dash-title-three pt-50 lg-pt-30">Other Settings</h4>
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
            <Radio.Group
              className="radio d-flex align-items-center"
              buttonStyle="solid"
            >
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
            <Radio.Group
              className="radio d-flex align-items-center"
              buttonStyle="solid"
              defaultValue="enable"
            >
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
            <Radio.Group
              className="radio d-flex align-items-center"
              buttonStyle="solid"
            >
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
            label="Is Career Fest?"
            name="jobCareerFest"
            rules={[
              {
                required: true,
                message: 'Please Select Job Career Fest!',
              },
            ]}
          >
            <Radio.Group
              className="radio d-flex align-items-center"
              buttonStyle="solid"
            >
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
            label="TA Collaborator"
            name="jobPostingTaCollaborator"
            rules={[
              {
                required: true,
                message: 'Please Select Job Posting TA Collaborator!',
              },
            ]}
          >
            <Select
              className="select"
              size="large"
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
              placeholder="Select Job TA Collaborator"
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
            label="User Collaborator"
            name="jobPostingUserCollaborator"
            rules={[
              {
                required: true,
                message: 'Please Select Job Posting User Collaborator!',
              },
            ]}
          >
            <Select
              className="select"
              size="large"
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
              placeholder="Select Job User Collaborator"
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
          <button className="dash-cancel-btn tran3s" type="button">
            Cancel
          </button>
        </div>
      </Form>
    </>
  );
};

export default SubmitJobArea;
