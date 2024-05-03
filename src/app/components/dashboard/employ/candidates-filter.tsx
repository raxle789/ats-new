'use client';
import React from 'react';
import { Form, Select } from 'antd';

type FieldType = {
  educationLevel?: string;
  educationMajor?: string;
  jobFunction?: string;
  lineIndustry?: string;
  expectationSalary?: string;
  currentSalary?: string;
  workExpTotal?: string;
  ethnicity?: string;
  religion?: string;
};

const CandidatesFilter = () => {
  const handleFinish = () => {};
  const handleFinishFailed = () => {};
  return (
    <Form
      name="candidates-filter-form"
      variant="filled"
      onFinish={handleFinish}
      onFinishFailed={handleFinishFailed}
    >
      <div className="row popover-filter-form">
        <div className="col-6">
          <div className="input-group-meta position-relative mb-15">
            <label>Education Level</label>
            <Form.Item<FieldType> name="educationLevel" className="mb-0">
              <Select
                className="w-100"
                showSearch
                mode="multiple"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.label.toLowerCase() ?? '').includes(input)
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
        <div className="col-6">
          <div className="input-group-meta position-relative mb-15">
            <label>Education Major</label>
            <Form.Item<FieldType> name="educationMajor" className="mb-0">
              <Select
                className="w-100"
                showSearch
                mode="multiple"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.label.toLowerCase() ?? '').includes(input)
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
        <div className="col-6">
          <div className="input-group-meta position-relative mb-15">
            <label>Job Function</label>
            <Form.Item<FieldType> name="jobFunction" className="mb-0">
              <Select
                className="w-100"
                showSearch
                mode="multiple"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.label.toLowerCase() ?? '').includes(input)
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
        <div className="col-6">
          <div className="input-group-meta position-relative mb-15">
            <label>Line Industry</label>
            <Form.Item<FieldType> name="lineIndustry" className="mb-0">
              <Select
                className="w-100"
                showSearch
                mode="multiple"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.label.toLowerCase() ?? '').includes(input)
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
        <div className="col-6">
          <div className="input-group-meta position-relative mb-15">
            <label>Expectation Salary</label>
            <Form.Item<FieldType> name="expectationSalary" className="mb-0">
              <Select
                className="w-100"
                showSearch
                mode="multiple"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.label.toLowerCase() ?? '').includes(input)
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
        <div className="col-6">
          <div className="input-group-meta position-relative mb-15">
            <label>Current Salary</label>
            <Form.Item<FieldType> name="currentSalary" className="mb-0">
              <Select
                className="w-100"
                showSearch
                mode="multiple"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.label.toLowerCase() ?? '').includes(input)
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
        <div className="col-6">
          <div className="input-group-meta position-relative mb-15">
            <label>Working Experience Total</label>
            <Form.Item<FieldType> name="workExpTotal" className="mb-0">
              <Select
                className="w-100"
                showSearch
                mode="multiple"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.label.toLowerCase() ?? '').includes(input)
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
        <div className="col-6">
          <div className="input-group-meta position-relative mb-15">
            <label>Ethnicity</label>
            <Form.Item<FieldType> name="ethnicity" className="mb-0">
              <Select
                className="w-100"
                showSearch
                mode="multiple"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.label.toLowerCase() ?? '').includes(input)
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
        <div className="col-6">
          <div className="input-group-meta position-relative mb-15">
            <label>Religion</label>
            <Form.Item<FieldType> name="religion" className="mb-0">
              <Select
                className="w-100"
                showSearch
                mode="multiple"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.label.toLowerCase() ?? '').includes(input)
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
    </Form>
  );
};

export default CandidatesFilter;
