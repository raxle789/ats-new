import React, { useState, useRef, useEffect } from 'react';
import {
  Input,
  Form,
  Select,
  DatePicker,
  Tabs,
  Radio,
  Upload,
  Button,
  message,
} from 'antd';
import type { FormProps, RadioChangeEvent } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { MdOutlineModeEdit } from 'react-icons/md';

type TargetKey = React.MouseEvent | React.KeyboardEvent | string;

type FieldType = {
  families?: {
    [id: string]: {
      relation?: string;
      name?: string;
      gender?: string;
      dateOfBirth?: string;
    };
  };
  everWorkedOption?: string;
  diseaseOption?: string;
  relationOption?: string;
  others?: {
    emergencyContactName?: string;
    emergencyContactPhoneNumber?: string;
    emergencyContactRelation?: string;
    noticePeriod: string;
    everWorkedMonth: string;
    everWorkedYear: string;
    diseaseName: string;
    diseaseYear: string;
    relationName: string;
    relationPosition: string;
    uploadCV?: string;
  };
};

type MasterData = {};

const AdditionalInformationForm = () => {
  const [form] = Form.useForm();
  const [masterData, setMasterData] = useState<MasterData | null>(null);
  const [editState, setEditState] = useState(false);
  const editOnChange = () => {
    setEditState(!editState);
  };

  const [index, setIndex] = useState<number>(0);

  const tabContent: JSX.Element[] = [
    <div key={index} className="row">
      <div className="col-6">
        <div className="input-group-meta position-relative mb-15">
          <label className="fw-bold">Relation</label>
          <Form.Item<FieldType>
            name={['families', index.toString(), 'relation']}
            className="mb-0"
            // rules={
            //   marriedValue === 'Married'
            //     ? [
            //         {
            //           required: true,
            //           message:
            //             'Please input your family relation especially spouse!',
            //         },
            //       ]
            //     : undefined
            // }
          >
            <Select
              className="w-100"
              placeholder="Your Family Relation"
              options={[
                { value: 'Father', label: 'Father' },
                { value: 'Mother', label: 'Mother' },
                { value: 'Sibling', label: 'Sibling' },
                { value: 'Spouse', label: 'Spouse' },
                { value: 'Children', label: 'Children' },
              ]}
            />
          </Form.Item>
        </div>
      </div>
      <div className="col-6">
        <div className="input-group-meta position-relative mb-15">
          <label className="fw-bold">Name</label>
          <Form.Item<FieldType>
            name={['families', index.toString(), 'name']}
            className="mb-0"
            // rules={
            //   marriedValue === 'Married'
            //     ? [
            //         {
            //           required: true,
            //           message: 'Please input your relation name!',
            //         },
            //       ]
            //     : undefined
            // }
          >
            <Input placeholder="Your Relation Name" />
          </Form.Item>
        </div>
      </div>
      <div className="col-6">
        <div className="input-group-meta position-relative mb-15">
          <label className="fw-bold">Gender</label>
          <Form.Item<FieldType>
            name={['families', index.toString(), 'gender']}
            className="mb-0"
            // rules={
            //   marriedValue === 'Married'
            //     ? [
            //         {
            //           required: true,
            //           message: 'Please input your family gender!',
            //         },
            //       ]
            //     : undefined
            // }
          >
            <Select
              className="w-100"
              placeholder="Your Family Gender"
              options={[
                { value: 'Male', label: 'Male' },
                { value: 'Female', label: 'Female' },
              ]}
            />
          </Form.Item>
        </div>
      </div>
      <div className="col-6">
        <div className="input-group-meta position-relative mb-15">
          <label className="fw-bold">Date of Birth</label>
          <Form.Item<FieldType>
            name={['families', index.toString(), 'dateOfBirth']}
            // rules={
            //   marriedValue === 'Married'
            //     ? [
            //         {
            //           required: true,
            //           message: 'Please input your relation date of birth!',
            //         },
            //       ]
            //     : undefined
            // }
          >
            <DatePicker
              className="w-100"
              placeholder="Select Date"
              // onChange={onChangeDate}
            />
          </Form.Item>
        </div>
      </div>
    </div>,
  ];

  const displayedTabContent: JSX.Element[] = [
    <div key={index} className="row">
      <div className="col-6">
        <div className="input-group-meta position-relative mb-15">
          <label className="fw-bold">Relation</label>
          <p className="mb-0">Father</p>
        </div>
      </div>
      <div className="col-6">
        <div className="input-group-meta position-relative mb-15">
          <label className="fw-bold">Name</label>
          <p className="mb-0">Budi sedunia</p>
        </div>
      </div>
      <div className="col-6">
        <div className="input-group-meta position-relative mb-15">
          <label className="fw-bold">Gender</label>
          <p className="mb-0">Female</p>
        </div>
      </div>
      <div className="col-6">
        <div className="input-group-meta position-relative mb-15">
          <label className="fw-bold">Date of Birth</label>
          <p className="mb-0">pokok tahun 1991</p>
        </div>
      </div>
    </div>,
  ];

  const initialItems = [
    { label: 'Relation 1', children: tabContent, key: '1' },
  ];
  const displayedInit = [
    {
      label: 'Relation 1',
      children: displayedTabContent,
      key: '1',
      closable: false,
    },
  ];
  const [activeKey, setActiveKey] = useState(initialItems[0].key);
  const [items, setItems] = useState(initialItems);
  const [displayedItems, setDisplayedItems] = useState(displayedInit);
  const newTabIndex = useRef(0);

  const onChangeTabs = (newActiveKey: string) => {
    setActiveKey(newActiveKey);
  };

  const add = () => {
    const newActiveKey = `newTab${newTabIndex.current++}`;
    const newPanes = [...items];
    newPanes.push({
      label: `Relation ${items.length + 1}`,
      children: tabContent,
      key: newActiveKey,
    });

    const newDisplayed = [...displayedItems];
    newDisplayed.push({
      label: `Relation ${items.length + 1}`,
      children: displayedTabContent,
      key: newActiveKey,
      closable: false,
    });

    setItems(newPanes);
    setDisplayedItems(newDisplayed);
    setActiveKey(newActiveKey);
    setIndex((prevState) => prevState + 1);
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

  const [everWorked, setEverWorked] = useState<string>('you-choose');
  const everWorkedChange = (e: RadioChangeEvent) => {
    setEverWorked(e.target.value);
  };

  const [disease, setdisease] = useState<string>('you-choose');
  const diseaseChange = (e: RadioChangeEvent) => {
    setdisease(e.target.value);
  };

  const [haveRelation, setHaveRelation] = useState<string>('you-choose');
  const haveRelationChange = (e: RadioChangeEvent) => {
    setHaveRelation(e.target.value);
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

  useEffect(() => {
    setIndex((prevState) => prevState + 1);
  }, []);

  // useEffect(() => {
  //   if (families.length > 1) {
  //     families.forEach((val) => {
  //       add();
  //     });
  //   }
  // }, [families]);
  return (
    <>
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
            <label className="fw-bold sub-section-profile">
              Family Structure
            </label>
            {editState && (
              <Tabs
                type="editable-card"
                onChange={onChangeTabs}
                activeKey={activeKey}
                onEdit={onEdit}
                items={items}
              />
            )}
            {!editState && (
              <Tabs
                type="editable-card"
                hideAdd
                onChange={onChangeTabs}
                activeKey={activeKey}
                items={displayedItems}
              />
            )}

            <label className="fw-bold mt-5 sub-section-profile">Others</label>
            <div className="col-3">
              <div className="input-group-meta position-relative mb-15">
                <label className="fw-bold">Emergency Contact Relation</label>
                <Form.Item<FieldType>
                  name={['others', 'emergencyContactRelation']}
                  className="mb-0"
                >
                  {editState && (
                    <Select
                      className="w-100"
                      placeholder="Your Emergency Contact Relation"
                      options={[
                        { value: 'Father', label: 'Father' },
                        { value: 'Mother', label: 'Mother' },
                        { value: 'Sibling', label: 'Sibling' },
                        { value: 'Spouse', label: 'Spouse' },
                        { value: 'Children', label: 'Children' },
                      ]}
                      disabled={!editState}
                    />
                  )}
                  {!editState && <p className="mb-0">Father</p>}
                </Form.Item>
              </div>
            </div>
            <div className="col-3">
              <div className="input-group-meta position-relative mb-15">
                <label className="fw-bold">Name</label>
                <Form.Item<FieldType>
                  name={['others', 'emergencyContactName']}
                  className="mb-0"
                >
                  {editState && (
                    <Input
                      placeholder="Your Emergency Contact Name"
                      disabled={!editState}
                    />
                  )}
                  {!editState && <p className="mb-0">bapakmu udin</p>}
                </Form.Item>
              </div>
            </div>
            <div className="col-3">
              <div className="input-group-meta position-relative mb-15">
                <label className="fw-bold">Phone Number</label>
                <Form.Item<FieldType>
                  name={['others', 'emergencyContactPhoneNumber']}
                  className="mb-0"
                >
                  {editState && (
                    <Input
                      placeholder="Your Emergency Contact Phone Number"
                      disabled={!editState}
                    />
                  )}
                  {!editState && <p className="mb-0">0865566553</p>}
                </Form.Item>
              </div>
            </div>
            <div className="col-3">
              <div className="input-group-meta position-relative mb-15">
                <label className="fw-bold">How long your notice period?*</label>
                <Form.Item<FieldType>
                  name={['others', 'noticePeriod']}
                  className="mb-0"
                  // rules={[
                  //   {
                  //     required: true,
                  //     message: 'Please input your notice period!',
                  //   },
                  // ]}
                >
                  {editState && (
                    <Select
                      className="w-100"
                      placeholder="Your Notice Period"
                      disabled={!editState}
                      options={[
                        { value: 'Ready join now', label: 'Ready join now' },
                        {
                          value: 'Less than 1 month',
                          label: 'Less than 1 month',
                        },
                        { value: '1 month', label: '1 month' },
                        { value: '2 months', label: '2 months' },
                        { value: '3 months', label: '3 months' },
                        {
                          value: 'More than 3 months',
                          label: 'More than 3 months',
                        },
                      ]}
                    />
                  )}
                  {!editState && <p className="mb-0">Ready join boss</p>}
                </Form.Item>
              </div>
            </div>
            <div className="col-12">
              <div className="input-group-meta position-relative mb-15">
                <label className="fw-bold">
                  Have you ever worked in Erajaya group of companies?*
                </label>
                <Form.Item<FieldType>
                  name="everWorkedOption"
                  className="mb-0"
                  // rules={[
                  //   {
                  //     required: true,
                  //     message: 'Please choose!',
                  //   },
                  // ]}
                >
                  {editState && (
                    <Radio.Group
                      onChange={everWorkedChange}
                      value={everWorked}
                      disabled={!editState}
                    >
                      <Radio className="d-flex" value="No">
                        No
                      </Radio>
                      <Radio className="d-flex" value="Yes">
                        Yes
                      </Radio>
                    </Radio.Group>
                  )}
                  {!editState && <p className="mb-0">Nooo</p>}
                </Form.Item>
                {everWorked === 'Yes' && (
                  <div className="row mt-2">
                    <div className="col-3">
                      <Form.Item<FieldType>
                        name={['others', 'everWorkedMonth']}
                        className="mb-0"
                        // rules={[
                        //   {
                        //     required: true,
                        //     message: 'Please input year!',
                        //   },
                        // ]}
                      >
                        <DatePicker
                          className="w-100"
                          placeholder="Start Year"
                          picker="month"
                          disabled={!editState}
                        />
                      </Form.Item>
                    </div>
                    <div className="col-3">
                      <Form.Item<FieldType>
                        name={['others', 'everWorkedYear']}
                        className="mb-0"
                        // rules={[
                        //   {
                        //     required: true,
                        //     message: 'Please input year!',
                        //   },
                        // ]}
                      >
                        <DatePicker
                          className="w-100"
                          placeholder="End Year"
                          picker="month"
                          disabled={!editState}
                        />
                      </Form.Item>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="col-12">
              <div className="input-group-meta position-relative mb-15">
                <label className="fw-bold">
                  Do you have any prior medical conditions, illnesses, or
                  congenital diseases?*
                </label>
                <Form.Item<FieldType>
                  name="diseaseOption"
                  className="mb-0"
                  // rules={[
                  //   {
                  //     required: true,
                  //     message: 'Please choose!',
                  //   },
                  // ]}
                >
                  {editState && (
                    <Radio.Group
                      onChange={diseaseChange}
                      value={disease}
                      disabled={!editState}
                    >
                      <Radio className="d-flex" value="No">
                        No
                      </Radio>
                      <Radio className="d-flex" value="Yes">
                        Yes
                      </Radio>
                    </Radio.Group>
                  )}
                  {!editState && <p className="mb-0">Nooo</p>}
                </Form.Item>
                {disease === 'Yes' && (
                  <div className="row mt-2">
                    <div className="col-3">
                      <Form.Item<FieldType>
                        name={['others', 'diseaseName']}
                        className="mb-0"
                        // rules={[
                        //   {
                        //     required: true,
                        //     message: 'Please input medical condition!',
                        //   },
                        // ]}
                      >
                        <Input
                          placeholder="Medical Condition"
                          disabled={!editState}
                        />
                      </Form.Item>
                    </div>
                    <div className="col-3">
                      <Form.Item<FieldType>
                        name={['others', 'diseaseYear']}
                        className="mb-0"
                        // rules={[
                        //   {
                        //     required: true,
                        //     message: 'Please input year!',
                        //   },
                        // ]}
                      >
                        <DatePicker
                          className="w-100"
                          placeholder="Select Year"
                          picker="year"
                          disabled={!editState}
                        />
                      </Form.Item>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="col-12">
              <div className="input-group-meta position-relative mb-15">
                <label className="fw-bold">
                  Do you have any friends, colleague, relative or family who is
                  working at Erajaya Group Companies?*
                </label>
                <Form.Item<FieldType>
                  name="relationOption"
                  className="mb-0"
                  // rules={[
                  //   {
                  //     required: true,
                  //     message: 'Please choose!',
                  //   },
                  // ]}
                >
                  {editState && (
                    <Radio.Group
                      onChange={haveRelationChange}
                      value={haveRelation}
                      disabled={!editState}
                    >
                      <Radio className="d-flex" value="No">
                        No
                      </Radio>
                      <Radio className="d-flex" value="Yes">
                        Yes
                      </Radio>
                    </Radio.Group>
                  )}
                  {!editState && <p className="mb-0">Nooo</p>}
                </Form.Item>
                {haveRelation === 'Yes' && (
                  <div className="row mt-2">
                    <div className="col-3">
                      <Form.Item<FieldType>
                        name={['others', 'relationName']}
                        className="mb-0"
                        // rules={[
                        //   {
                        //     required: true,
                        //     message: 'Please input name!',
                        //   },
                        // ]}
                      >
                        <Input placeholder="Name" disabled={!editState} />
                      </Form.Item>
                    </div>
                    <div className="col-3">
                      <Form.Item<FieldType>
                        name={['others', 'relationPosition']}
                        className="mb-0"
                        // rules={[
                        //   {
                        //     required: true,
                        //     message: 'Please input position!',
                        //   },
                        // ]}
                      >
                        <Input placeholder="Position" disabled={!editState} />
                      </Form.Item>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {editState && (
              <div className="button-group d-inline-flex align-items-center mt-30 mb-0">
                <button type="submit" className="dash-btn-two tran3s me-3">
                  Submit
                </button>
              </div>
            )}
          </div>
        </Form>
      </div>
    </>
  );
};

export default AdditionalInformationForm;