'use client';

import ReactQuill from 'react-quill';
// import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useState } from 'react';
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
const { RangePicker } = DatePicker;
const { TextArea } = Input;

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

const JobVacancyForm = ({
  efpkData,
  jobTitleData,
  jobFunctionData,
  employmentStatusData,
  positionLevelData,
  verticalData,
  departmentData,
  lineIndustryData,
  regionData,
  workLocationData,
  genderData,
  skillData,
  certificateData,
  taData,
  userData,
  form,
  handleJobVacancy,
  handleEfpkChange,
  handlePositionLevelChange,
  handleVerticalChange,
}) => {
  const [ageParameterState, setAgeParameterState] = useState(false);

  const [genderParameterState, setGenderParameterState] = useState(false);

  const [skillParameterState, setSkillParameterState] = useState(false);

  const [certificateParameterState, setCertificateParameterState] =
    useState(false);

  return (
    <>
      <Form
        form={form}
        className="bg-white card-box border-20"
        layout="vertical"
        variant="filled"
        onFinish={handleJobVacancy}
      >
        <h4 className="dash-title-three">FPK</h4>
        <div className="dash-input-wrapper mb-50">
          <Form.Item
            label="FPK"
            name="jobEfpk"
            rules={[
              {
                required: true,
                message: 'Please Select Job FPK!',
              },
            ]}
          >
            <Select
              className="select"
              onChange={(value) => handleEfpkChange(value)}
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
              options={efpkData}
            />
          </Form.Item>
        </div>

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
              placeholder="Select Job Title"
              options={jobTitleData}
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
              options={jobFunctionData}
            />
          </Form.Item>
        </div>
        <div className="dash-input-wrapper mb-30">
          <Form.Item
            label="Employment Status"
            name="jobEmploymentStatus"
            rules={[
              {
                required: true,
                message: 'Please Select Job Employment Status!',
              },
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
              options={employmentStatusData}
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
              onChange={(value) => handlePositionLevelChange(value)}
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
              options={positionLevelData}
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
              onChange={(value) => handleVerticalChange(value)}
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
              options={verticalData}
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
              options={departmentData}
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
              options={lineIndustryData}
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
              options={regionData}
            />
          </Form.Item>
        </div>
        <div className="dash-input-wrapper mb-30">
          <Form.Item
            label="Work Location"
            name="jobWorkLocation"
            rules={[
              {
                required: true,
                message: 'Please Select Job Work Location!',
              },
            ]}
          >
            <Select
              className="select"
              size="large"
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
              options={workLocationData}
            />
          </Form.Item>
        </div>
        <div className="dash-input-wrapper mb-30">
          <Form.Item
            label="Work Location Address"
            name="jobWorkLocationAddress"
            rules={[
              {
                required: true,
                message: 'Please Input Job Work Location Address!',
              },
            ]}
          >
            <TextArea
              className="select"
              placeholder="Input Job Work Address"
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
        <div className="dash-input-wrapper mb-30">
          <div className="row">
            <div className="col-xxl-2">
              <Form.Item
                name="ageParameterCheckbox"
                valuePropName="checked"
                className="form-item-custom-ant"
              >
                <Checkbox
                  className="checkbox d-flex align-items-center"
                  checked={ageParameterState}
                  onChange={(e) => setAgeParameterState(e.target.checked)}
                >
                  Age
                </Checkbox>
              </Form.Item>
            </div>
            <div className="col-xxl-10">
              <Form.Item
                name="ageParameter"
                rules={
                  ageParameterState
                    ? [
                        {
                          required: true,
                          message: 'Please Input Age!',
                        },
                      ]
                    : []
                }
              >
                <InputNumber
                  className="select d-flex align-items-center w-100"
                  disabled={!ageParameterState}
                  min={17}
                  placeholder="Input Age!"
                  style={{ height: '40px' }}
                />
              </Form.Item>
            </div>
          </div>
        </div>
        <div className="dash-input-wrapper mb-30">
          <div className="row">
            <div className="col-xxl-2">
              <Form.Item name="genderParameterCheckbox" valuePropName="checked">
                <Checkbox
                  className="checkbox d-flex align-items-center"
                  checked={genderParameterState}
                  onChange={(e) => setGenderParameterState(e.target.checked)}
                >
                  Gender
                </Checkbox>
              </Form.Item>
            </div>
            <div className="col-xxl-10">
              <Form.Item
                name="genderParameter"
                rules={
                  genderParameterState
                    ? [
                        {
                          required: true,
                          message: 'Please Select Gender!',
                        },
                      ]
                    : []
                }
              >
                <Select
                  className="select"
                  size="large"
                  showSearch
                  allowClear
                  disabled={!genderParameterState}
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
                  options={genderData}
                />
              </Form.Item>
            </div>
          </div>
        </div>
        <div className="dash-input-wrapper mb-30">
          <div className="row">
            <div className="col-xxl-2">
              <Form.Item name="skillParameterCheckbox" valuePropName="checked">
                <Checkbox
                  className="checkbox d-flex align-items-center"
                  checked={skillParameterState}
                  onChange={(e) => setSkillParameterState(e.target.checked)}
                >
                  Skill
                </Checkbox>
              </Form.Item>
            </div>
            <div className="col-xxl-10">
              <Form.Item
                name="skillParameter"
                rules={
                  skillParameterState
                    ? [
                        {
                          required: true,
                          message: 'Please Select Skill!',
                        },
                      ]
                    : []
                }
              >
                <Select
                  className="select"
                  mode="tags"
                  size="large"
                  showSearch
                  allowClear
                  disabled={!skillParameterState}
                  placeholder="Select skill"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.label ?? '').includes(input)
                  }
                  filterSort={(optionA, optionB) =>
                    (optionA?.label ?? '')
                      .toLowerCase()
                      .localeCompare((optionB?.label ?? '').toLowerCase())
                  }
                  options={skillData}
                />
              </Form.Item>
            </div>
          </div>
        </div>
        <div className="dash-input-wrapper mb-30">
          <div className="row">
            <div className="col-xxl-2">
              <Form.Item
                name="certificateParameterCheckbox"
                valuePropName="checked"
              >
                <Checkbox
                  className="checkbox d-flex align-items-center"
                  checked={certificateParameterState}
                  onChange={(e) =>
                    setCertificateParameterState(e.target.checked)
                  }
                >
                  Certificate
                </Checkbox>
              </Form.Item>
            </div>
            <div className="col-xxl-10">
              <Form.Item
                name="certificateParameter"
                rules={
                  certificateParameterState
                    ? [
                        {
                          required: true,
                          message: 'Please Select Certificate!',
                        },
                      ]
                    : []
                }
              >
                <Select
                  className="select"
                  mode="tags"
                  size="large"
                  showSearch
                  allowClear
                  disabled={!certificateParameterState}
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
                  options={certificateData}
                />
              </Form.Item>
            </div>
          </div>
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
            initialValue="enable"
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
                message:
                  'Please Select Want Enable Career Fest Or Disable Career Fest!',
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
          <Form.Item label="TA Collaborator" name="jobTaCollaborator">
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
              options={taData}
            />
          </Form.Item>
        </div>
        <div className="dash-input-wrapper mb-30">
          <Form.Item label="User Collaborator" name="jobUserCollaborator">
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
              options={userData}
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

export default JobVacancyForm;
