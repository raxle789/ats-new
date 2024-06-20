'use client';

import React, { useState } from 'react';
import { Form, Button, Input, message, Select, DatePicker, Radio } from 'antd';
import type { FormProps, RadioChangeEvent } from 'antd';

type FieldType = {
  refereeCheckData?: {
    [id: string]: {
      companyName?: string;
      introductionDate?: string;
      durationWithReferee?: string;
      relation?: string;
      positionOption?: string;
      position?: string;
      reason?: string;
      ethicalIssue?: string;
      strengthPoints?: string;
      improveArea?: string;
      considerOption?: string;
      considerReason?: string;
      additionalInformation?: string;
    };
  };
};

const RefereeForm = () => {
  const [form] = Form.useForm();
  const [index, setIndex] = useState(0);
  const initItems: any[] = [];
  const [activeKey, setActiveKey] = useState('');
  const [items, setItems] = useState(initItems);
  const newTabIndex = useRef(0);
  const [positionOption, setPositionOption] = useState<string>('you-choose');

  const onChangePosition = (e: RadioChangeEvent) => {
    setPositionOption(e.target.value);
  };

  type Tprops = {
    index: number;
  };
  const TabContent: React.FC<Tprops> = ({ index }) => {
    return (
      <div key={index} className="row">
        <div className="col-12">
          <div className="input-group-meta position-relative mb-0">
            <label>Name the company where you meet (Candidate_name)*</label>
            <Form.Item<FieldType>
              name={['refereeCheckData', index.toString(), 'companyName']}
              className="mb-3"
              rules={[
                {
                  required: true,
                  message: 'Please input company name!',
                },
              ]}
            >
              <Input placeholder="Company Name" />
            </Form.Item>
          </div>
        </div>

        <div className="col-12">
          <div className="input-group-meta position-relative mb-0">
            <label>When do you know (Candidate_name)?*</label>
            <Form.Item<FieldType>
              name={['refereeCheckData', index.toString(), 'introductionDate']}
              className="mb-3"
              rules={[
                {
                  required: true,
                  message: 'Please input date!',
                },
              ]}
            >
              <DatePicker
                className="w-100"
                placeholder="Select Year"
                picker="year"
              />
            </Form.Item>
          </div>
        </div>

        <div className="col-12">
          <div className="input-group-meta position-relative mb-0">
            <label>How long do you know (Candidate_name)?*</label>
            <Form.Item<FieldType>
              name={[
                'refereeCheckData',
                index.toString(),
                'durationWithReferee',
              ]}
              className="mb-3"
              rules={[
                {
                  required: true,
                  message: 'Please input date!',
                },
              ]}
            >
              <DatePicker
                className="w-100"
                format={'MMM YYYY'}
                placeholder="Select Date"
                picker="month"
              />
            </Form.Item>
          </div>
        </div>

        <div className="col-12">
          <div className="input-group-meta position-relative mb-0">
            <label>Relations with (Candidate_name)*</label>
            <Form.Item<FieldType>
              name={['refereeCheckData', index.toString(), 'relation']}
              className="mb-3"
              rules={[
                {
                  required: true,
                  message: 'Please select relation!',
                },
              ]}
            >
              <Select
                className="w-100"
                placeholder="Relation"
                options={[
                  {
                    value: 'Former Subordinate',
                    label: 'Former Subordinate',
                  },
                  {
                    value: 'Former Colleague',
                    label: 'Former Colleague',
                  },
                ]}
              />
            </Form.Item>
          </div>
        </div>

        <div className="col-12">
          <div className="input-group-meta position-relative mb-0">
            <label>
              What is position name of (Candidate_name) when you working
              together?*
            </label>
            <div className="row">
              <div className="col-1">
                <Form.Item<FieldType>
                  name={[
                    'refereeCheckData',
                    index.toString(),
                    'positionOption',
                  ]}
                  className="mb-3"
                  rules={[
                    {
                      required: true,
                      message: 'Please select option!',
                    },
                  ]}
                >
                  <Radio.Group
                    onChange={onChangePosition}
                    value={positionOption}
                  >
                    <Radio className="d-flex" value="Yes">
                      Yes
                    </Radio>
                    <Radio className="d-flex" value="No">
                      No
                    </Radio>
                  </Radio.Group>
                </Form.Item>
              </div>
              {positionOption === 'No' && (
                <div className="col-11 ps-3">
                  <Form.Item<FieldType>
                    name={['refereeCheckData', index.toString(), 'position']}
                    className="mb-3"
                    rules={[
                      {
                        required: true,
                        message: 'Please input position!',
                      },
                    ]}
                  >
                    <Input placeholder="State the Position" />
                  </Form.Item>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="col-12">
          <div className="input-group-meta position-relative mb-0">
            <label>Reason why (Candidate_name) left the company*</label>
            <Form.Item<FieldType>
              name={['refereeCheckData', index.toString(), 'reason']}
              className="mb-3"
              rules={[
                {
                  required: true,
                  message: 'Please select reason!',
                },
              ]}
            >
              <Select
                className="w-100"
                showSearch
                placeholder="Select Reason"
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
                  { value: 'Company Close', label: 'Company Close' },
                  {
                    value: 'Compensation and Benefits',
                    label: 'Compensation and Benefits',
                  },
                  {
                    value: 'Continue Study',
                    label: 'Continue Study',
                  },
                  {
                    value: 'End of Contract',
                    label: 'End of Contract',
                  },
                  {
                    value: 'Failed Probation',
                    label: 'Failed Probation',
                  },
                  {
                    value: 'Family Reason',
                    label: 'Family Reason',
                  },
                  {
                    value: 'Get Another Job',
                    label: 'Get Another Job',
                  },
                  {
                    value: 'Layoff',
                    label: 'Layoff',
                  },
                  {
                    value: 'Location of Work',
                    label: 'Location of Work',
                  },
                  {
                    value: 'Medical Reason',
                    label: 'Medical Reason',
                  },
                  {
                    value: 'Retire',
                    label: 'Retire',
                  },
                  {
                    value: 'Work Environment',
                    label: 'Work Environment',
                  },
                  {
                    value: 'Work Load',
                    label: 'Work Load',
                  },
                ]}
              />
            </Form.Item>
          </div>
        </div>

        <div className="col-12">
          <div className="input-group-meta position-relative mb-0">
            <label>
              Are there any ethical issues or disciplinary history or ongoing
              issues such as sanity/manner, money, solicitation, etc regarding
              to (Candidate_name)'s track record?*
            </label>
            <Form.Item<FieldType>
              name={['refereeCheckData', index.toString(), 'ethicalIssue']}
              className="mb-3"
              rules={[
                {
                  required: true,
                  message: 'Please input ethical issue!',
                },
              ]}
            >
              <Input placeholder="Ethical Issue" />
            </Form.Item>
          </div>
        </div>

        <div className="col-12">
          <div className="input-group-meta position-relative mb-0">
            <label>
              Please share the strength points of (Candidate_name) comparing
              another team member/subordinate?
            </label>
            <Form.Item<FieldType>
              name={['refereeCheckData', index.toString(), 'strengthPoints']}
              className="mb-3"
              rules={[
                {
                  required: true,
                  message: 'Please input strength points!',
                },
              ]}
            >
              <Input placeholder="Strength Points" />
            </Form.Item>
          </div>
        </div>

        <div className="col-12">
          <div className="input-group-meta position-relative mb-0">
            <label>
              Please share the area that you think (Candidate_name) need to
              improve?
            </label>
            <Form.Item<FieldType>
              name={['refereeCheckData', index.toString(), 'improveArea']}
              className="mb-3"
              rules={[
                {
                  required: true,
                  message: 'Please input improve area!',
                },
              ]}
            >
              <Input placeholder="Improve Area" />
            </Form.Item>
          </div>
        </div>

        <div className="col-12">
          <div className="input-group-meta position-relative mb-0">
            <label>
              If you have position that suitable for (Candidate_name), would you
              consider to rehire (Candidate_name)?
            </label>
            <div className="row">
              <div className="col-1">
                <Form.Item<FieldType>
                  name={[
                    'refereeCheckData',
                    index.toString(),
                    'considerOption',
                  ]}
                  className="mb-3"
                  rules={[
                    {
                      required: true,
                      message: 'Please select the option!',
                    },
                  ]}
                >
                  <Radio.Group>
                    <Radio className="d-flex" value="Yes">
                      Yes
                    </Radio>
                    <Radio className="d-flex" value="No">
                      No
                    </Radio>
                  </Radio.Group>
                </Form.Item>
              </div>
              <div className="col-11 ps-3">
                <Form.Item<FieldType>
                  name={[
                    'refereeCheckData',
                    index.toString(),
                    'considerReason',
                  ]}
                  className="mb-3"
                  rules={[
                    {
                      required: true,
                      message: 'Please input the reason!',
                    },
                  ]}
                >
                  <Input placeholder="The Reason" />
                </Form.Item>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12">
          <div className="input-group-meta position-relative mb-0">
            <label>
              Is there any additional information that you would like to share
              with us related to (Candidate_name)?
            </label>
            <Form.Item<FieldType>
              name={[
                'refereeCheckData',
                index.toString(),
                'additionalInformation',
              ]}
              className="mb-3"
              rules={[
                {
                  required: true,
                  message: 'Please input additional information!',
                },
              ]}
            >
              <Input placeholder="Additional Information" />
            </Form.Item>
          </div>
        </div>
      </div>
    );
  };

  const add = (tabTotal: number) => {
    let newPanes = [...items];
    let tabIndex = index;
    for (let i = 0; i < tabTotal; i++) {
      const newActiveKey = `newTab${newTabIndex.current++}`;
      newPanes.push({
        label: `Reference Details ${items.length + 1}`,
        children: <TabContent index={tabIndex} />,
        key: newActiveKey,
        closable: false,
      });
      tabIndex++;
      setActiveKey(newActiveKey);
    }
    setItems(newPanes);
    setIndex(index + 1);
  };

  const onChangeTabs = (newActiveKey: string) => {
    setActiveKey(newActiveKey);
  };

  function handleSubmit() {
    const values = form.getFieldsValue();
    console.log('submittedValues: ', values);
  }

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (
    errorInfo,
  ) => {
    if (errorInfo.errorFields && errorInfo.errorFields.length > 0) {
      const errorMessage = errorInfo.errorFields
        .map((field: any) => field.errors.join(', '))
        .join('; ');
      message.error(`Failed: ${errorMessage}`);
    }
  };

  useEffect(() => {
    add(3);
  }, []);
  return (
    <>
      {/* <p>Reference Form Checklist</p> */}
      <div className="row">
        <div className="col-3">
          <p className="mb-0">Name: </p>
          <p className="mb-0">Position: </p>
          <p className="mb-0">Email: </p>
          <p className="mb-0">Phone Number: </p>
        </div>
        <div className="col-9 mb-10">
          <p className="mb-0">(candidate-data)</p>
          <p className="mb-0">(candidate-data)</p>
          <p className="mb-0">(candidate-data)</p>
          <p className="mb-0">(candidate-data)</p>
        </div>
      </div>
      <Form form={form} onFinish={handleSubmit} onFinishFailed={onFinishFailed}>
        <div className="row">
          <Tabs
            type="editable-card"
            hideAdd
            onChange={onChangeTabs}
            activeKey={activeKey}
            items={items}
          />

          <div className="d-flex justify-content-end">
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </div>
        </div>
      </Form>
    </>
  );
};

export default RefereeForm;
