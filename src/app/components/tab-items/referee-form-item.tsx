'use client';

import React, { useEffect, useState, useRef } from 'react';
import { Form, Button, Input, message, Select, DatePicker, Tabs } from 'antd';
import type { FormProps } from 'antd';

type TargetKey = React.MouseEvent | React.KeyboardEvent | string;

type FieldType = {
  refereeData?: {
    [id: string]: {
      name?: string;
      phoneNumber?: string;
      email?: string;
      position?: string;
      relation?: string;
      companyName?: string;
      introductionDate?: string;
      durationWithReferee?: string;
    };
  };
};

const RefereeFormItem = () => {
  const [form] = Form.useForm();
  const [index, setIndex] = useState(0);
  const initItems: any[] = [];
  const [activeKey, setActiveKey] = useState('');
  const [items, setItems] = useState(initItems);
  const newTabIndex = useRef(0);

  const sanitizePhoneNumber = (input: string) => {
    let numericInput = input.replace(/\D/g, '');
    if (numericInput.length > 0 && numericInput[0] === '0') {
      numericInput = '0' + numericInput.slice(1);
    }
    form.setFieldsValue({
      phoneNumber: numericInput,
    });
  };

  const sanitizeFullname = (input: string) => {
    let nameInput = input.replace(/[^a-zA-Z\s]/g, '');
    form.setFieldsValue({
      name: nameInput,
    });
  };

  type Tprops = {
    index: number;
  };

  const TabContent: React.FC<Tprops> = ({ index }) => {
    return (
      <div key={index} className="row">
        <div className="col-6">
          <div className="input-group-meta position-relative mb-0">
            <label>Name*</label>
            <Form.Item<FieldType>
              name={['refereeData', index.toString(), 'name']}
              className="mb-3"
              rules={[
                {
                  required: true,
                  message: 'Please input referee name!',
                },
              ]}
            >
              <Input
                placeholder="Referee Name"
                onChange={(e) => sanitizeFullname(e.target.value)}
              />
            </Form.Item>
          </div>
        </div>

        <div className="col-6">
          <div className="input-group-meta position-relative mb-0">
            <label>Phone Number*</label>
            <Form.Item<FieldType>
              name={['refereeData', index.toString(), 'phoneNumber']}
              className="mb-3"
              rules={[
                {
                  required: true,
                  message: 'Please input referee phone number!',
                },
              ]}
            >
              <Input
                placeholder="Referee Phone Number"
                onChange={(e) => sanitizePhoneNumber(e.target.value)}
              />
            </Form.Item>
          </div>
        </div>

        <div className="col-6">
          <div className="input-group-meta position-relative mb-0">
            <label>Email*</label>
            <Form.Item<FieldType>
              name={['refereeData', index.toString(), 'email']}
              className="mb-3"
              rules={[
                {
                  required: true,
                  message: 'Please input referee email!',
                },
              ]}
            >
              <Input placeholder="Referee Email" />
            </Form.Item>
          </div>
        </div>

        <div className="col-6">
          <div className="input-group-meta position-relative mb-0">
            <label>Position*</label>
            <Form.Item<FieldType>
              name={['refereeData', index.toString(), 'position']}
              className="mb-3"
              rules={[
                {
                  required: true,
                  message: 'Please input referee position!',
                },
              ]}
            >
              <Input placeholder="Referee Position" />
            </Form.Item>
          </div>
        </div>

        <div className="col-6">
          <div className="input-group-meta position-relative mb-0">
            <label>Relations with referee*</label>
            <Form.Item<FieldType>
              name={['refereeData', index.toString(), 'relation']}
              className="mb-3"
              rules={[
                {
                  required: true,
                  message: 'Please select referee relation!',
                },
              ]}
            >
              <Select
                className="w-100"
                placeholder="Referee Relation"
                options={[
                  { value: 'Former Superior', label: 'Former Superior' },
                  {
                    value: 'Former Colleague',
                    label: 'Former Colleague',
                  },
                ]}
              />
            </Form.Item>
          </div>
        </div>

        <div className="col-6">
          <div className="input-group-meta position-relative mb-0">
            <label>Company where do you work with the referee*</label>
            <Form.Item<FieldType>
              name={['refereeData', index.toString(), 'companyName']}
              className="mb-3"
              rules={[
                {
                  required: true,
                  message: 'Please input the company name!',
                },
              ]}
            >
              <Input placeholder="Referee Company Name" />
            </Form.Item>
          </div>
        </div>

        <div className="col-6">
          <div className="input-group-meta position-relative mb-15">
            <label>When do you know the referee?*</label>
            <Form.Item<FieldType>
              name={['refereeData', index.toString(), 'introductionDate']}
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

        <div className="col-6">
          <div className="input-group-meta position-relative mb-15">
            <label>How long do you know the referee?*</label>
            <Form.Item<FieldType>
              name={['refereeData', index.toString(), 'durationWithReferee']}
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
      </div>
    );
  };

  const onChangeTabs = (newActiveKey: string) => {
    setActiveKey(newActiveKey);
  };

  const add = () => {
    if (index < 3) {
      const newActiveKey = `newTab${newTabIndex.current++}`;
      const newPanes = [...items];
      newPanes.push({
        label: `Reference Details ${items.length + 1}`,
        children: <TabContent index={index} />,
        key: newActiveKey,
      });
      setItems(newPanes);
      setActiveKey(newActiveKey);
      setIndex(index + 1);
    }
  };

  const remove = (targetKey: TargetKey) => {
    let newActiveKey = activeKey;
    let lastIndex = -1;
    items.forEach((item, i) => {
      if (item.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const newPanes = items.filter((item) => item.key !== targetKey);
    if (newPanes.length && newActiveKey === targetKey) {
      if (lastIndex >= 0) {
        newActiveKey = newPanes[lastIndex].key;
      } else {
        newActiveKey = newPanes[0].key;
      }
    }
    setItems(newPanes);
    setActiveKey(newActiveKey);
    setIndex(index - 1);
  };

  const onEdit = (
    targetKey: React.MouseEvent | React.KeyboardEvent | string,
    action: 'add' | 'remove',
  ) => {
    if (action === 'add') {
      add();
    } else {
      remove(targetKey);
    }
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
    add();
  }, []);

  return (
    <>
      {/* <p>Candidate Ref Check Form</p> */}
      <Form form={form} onFinish={handleSubmit} onFinishFailed={onFinishFailed}>
        <div className="row">
          <div className="row">
            <div className="col-6">
              <div className="input-group-meta position-relative mb-0">
                <label>Name*</label>
                <Form.Item<FieldType>
                  name={['refereeData', index.toString(), 'name']}
                  className="mb-3"
                  rules={[
                    {
                      required: true,
                      message: 'Please input referee name!',
                    },
                  ]}
                >
                  <Input
                    placeholder="Referee Name"
                    onChange={(e) => sanitizeFullname(e.target.value)}
                  />
                </Form.Item>
              </div>
            </div>

            <div className="col-6">
              <div className="input-group-meta position-relative mb-0">
                <label>Phone Number*</label>
                <Form.Item<FieldType>
                  name={['refereeData', index.toString(), 'phoneNumber']}
                  className="mb-3"
                  rules={[
                    {
                      required: true,
                      message: 'Please input referee phone number!',
                    },
                  ]}
                >
                  <Input
                    placeholder="Referee Phone Number"
                    onChange={(e) => sanitizePhoneNumber(e.target.value)}
                  />
                </Form.Item>
              </div>
            </div>

            <div className="col-6">
              <div className="input-group-meta position-relative mb-0">
                <label>Email*</label>
                <Form.Item<FieldType>
                  name={['refereeData', index.toString(), 'email']}
                  className="mb-3"
                  rules={[
                    {
                      required: true,
                      message: 'Please input referee email!',
                    },
                  ]}
                >
                  <Input placeholder="Referee Email" />
                </Form.Item>
              </div>
            </div>

            <div className="col-6">
              <div className="input-group-meta position-relative mb-0">
                <label>Position*</label>
                <Form.Item<FieldType>
                  name={['refereeData', index.toString(), 'position']}
                  className="mb-3"
                  rules={[
                    {
                      required: true,
                      message: 'Please input referee position!',
                    },
                  ]}
                >
                  <Input placeholder="Referee Position" />
                </Form.Item>
              </div>
            </div>

            <div className="col-6">
              <div className="input-group-meta position-relative mb-0">
                <label>Relations with referee*</label>
                <Form.Item<FieldType>
                  name={['refereeData', index.toString(), 'relation']}
                  className="mb-3"
                  rules={[
                    {
                      required: true,
                      message: 'Please select referee relation!',
                    },
                  ]}
                >
                  <Select
                    className="w-100"
                    placeholder="Referee Relation"
                    options={[
                      { value: 'Former Superior', label: 'Former Superior' },
                      {
                        value: 'Former Colleague',
                        label: 'Former Colleague',
                      },
                    ]}
                  />
                </Form.Item>
              </div>
            </div>

            <div className="col-6">
              <div className="input-group-meta position-relative mb-0">
                <label>Company where do you work with the referee*</label>
                <Form.Item<FieldType>
                  name={['refereeData', index.toString(), 'companyName']}
                  className="mb-3"
                  rules={[
                    {
                      required: true,
                      message: 'Please input the company name!',
                    },
                  ]}
                >
                  <Input placeholder="Referee Company Name" />
                </Form.Item>
              </div>
            </div>

            <div className="col-6">
              <div className="input-group-meta position-relative mb-15">
                <label>When do you know the referee?*</label>
                <Form.Item<FieldType>
                  name={['refereeData', index.toString(), 'introductionDate']}
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

            <div className="col-6">
              <div className="input-group-meta position-relative mb-15">
                <label>How long do you know the referee?*</label>
                <Form.Item<FieldType>
                  name={[
                    'refereeData',
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
          </div>
          {/* <Tabs
            type="editable-card"
            onChange={onChangeTabs}
            activeKey={activeKey}
            onEdit={onEdit}
            items={items}
          /> */}

          {/* <div className="button-group d-inline-flex align-items-center mt-30 mb-0">
              <button type="submit" className="dash-btn-two tran3s me-3">
                Submit
              </button>
            </div> */}
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

export default RefereeFormItem;
