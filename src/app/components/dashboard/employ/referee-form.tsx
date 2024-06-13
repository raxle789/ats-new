'use client';
import React, { useEffect, useState, useRef } from 'react';
import {
  Form,
  Modal,
  Button,
  Input,
  message,
  Select,
  DatePicker,
  Tabs,
} from 'antd';
import type { FormProps } from 'antd';

type TargetKey = React.MouseEvent | React.KeyboardEvent | string;

type FieldType = {
  companyName?: string;
  introductionDate?: string;
  durationWithReferee?: string;
  relation?: string;
  position?: string;
  reason?: string;
  ethicalIssue?: string;
  strengthPoints?: string;
  improveArea?: string;
  considerOption?: string;
  additionalInformation?: string;
};

const RefereeForm = () => {
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
    return <div key={index} className="row"></div>;
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
      <p>Reference Form Checklist</p>
      <div>
        <Form
          form={form}
          onFinish={handleSubmit}
          onFinishFailed={onFinishFailed}
        >
          <div className="row">
            <div className="col-6">
              <div className="input-group-meta position-relative mb-0">
                <label>Name the company where you meet (Candidate_name)*</label>
                <Form.Item<FieldType>
                  name="companyName"
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

            <div className="col-6">
              <div className="input-group-meta position-relative mb-0">
                <label>When do you know (Candidate_name)?*</label>
                <Form.Item<FieldType>
                  name="introductionDate"
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
              <div className="input-group-meta position-relative mb-0">
                <label>How long do you know (Candidate_name)?*</label>
                <Form.Item<FieldType>
                  name="durationWithReferee"
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

            <div className="col-6">
              <div className="input-group-meta position-relative mb-0">
                <label>Relations with (Candidate_name)*</label>
                <Form.Item<FieldType>
                  name="relation"
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

            <div className="col-6">
              <div className="input-group-meta position-relative mb-0">
                <label>
                  What is position name of (Candidate_name) when you working
                  together?*
                </label>
                <Form.Item<FieldType>
                  name="position"
                  className="mb-3"
                  rules={[
                    {
                      required: true,
                      message: 'Please input position!',
                    },
                  ]}
                >
                  <Input placeholder="Position" />
                </Form.Item>
              </div>
            </div>

            <div className="d-flex justify-content-end">
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </div>
          </div>
        </Form>
      </div>
    </>
  );
};

export default RefereeForm;
