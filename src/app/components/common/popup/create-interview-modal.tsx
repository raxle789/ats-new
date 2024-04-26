import React, { useState } from 'react';
import {
  Modal,
  Form,
  Input,
  Radio,
  Select,
  DatePicker,
  TimePicker,
  Button,
} from 'antd';
import type { RadioChangeEvent } from 'antd';
import ReactQuill from 'react-quill';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { setIsOpen } from '@/redux/features/createInterviewSlice';

type FieldType = {
  interviewTitle?: string;
  interviewType?: string;
  interviewers?: string;
  interviewTemplate?: string;
  interviewInfo?: string;
  interviewDate?: string;
  interviewTime?: string;
  interviewLink?: string;
  interviewPlace?: string;
};

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
};

// type TProps = {
//   isOpen?: boolean;
//   setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
// };

const CreateInterviewModal = () => {
  const dispatch = useAppDispatch();
  const isModalOpen = useAppSelector(
    (state) => state.createInterviewModal.isOpen,
  );
  const handleCancel = () => {
    dispatch(setIsOpen(!isModalOpen));
  };

  const handleSubmit = () => {
    console.log('success');
  };
  const onFinishFailed = () => {
    console.log('failed');
  };

  const [interviewType, setInterviewType] = useState('choose');
  const onChangeRadio = (e: RadioChangeEvent) => {
    setInterviewType(e.target.value);
  };

  const [interviewTemplate, setInterviewTemplate] = useState('');
  const handleTemplate = (value: string) => {
    setInterviewTemplate(value);
  };
  return (
    <>
      <Modal
        title="Create Interview"
        centered
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        width={700}
        wrapClassName="custom-modal-wrapper"
      >
        <Form
          name="createInterviewForm"
          // form={form}
          className="overflow-x-hidden"
          variant="filled"
          initialValues={{ remember: true }}
          onFinish={handleSubmit}
          onFinishFailed={onFinishFailed}
        >
          <div className="row mt-20">
            <div className="col-lg-6">
              <div className="input-group-meta position-relative mb-15">
                <label>Interview Type*</label>
                <Form.Item<FieldType>
                  name="interviewType"
                  className="mb-0"
                  rules={[
                    {
                      required: true,
                      message: 'Please choose interview type!',
                    },
                  ]}
                >
                  <Radio.Group
                    className="radio d-flex align-items-center"
                    buttonStyle="solid"
                    onChange={onChangeRadio}
                  >
                    <Radio.Button className="radio-children" value="Online">
                      Online
                    </Radio.Button>
                    <Radio.Button className="radio-children" value="Offline">
                      Offline
                    </Radio.Button>
                  </Radio.Group>
                </Form.Item>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="input-group-meta position-relative mb-15">
                <label>Interview Title*</label>
                <Form.Item<FieldType>
                  name="interviewTitle"
                  className="mb-0"
                  rules={[
                    {
                      required: true,
                      message: 'Please input interview title!',
                    },
                  ]}
                >
                  <Input placeholder="Input Interview Title" />
                </Form.Item>
              </div>
            </div>
            <div className="col-6">
              <div className="input-group-meta position-relative mb-15">
                <label>Interview Date*</label>
                <div className="d-flex align-items-center">
                  <Form.Item<FieldType>
                    name="interviewDate"
                    className="mb-0 me-2"
                    rules={[
                      {
                        required: true,
                        message: 'Please select date!',
                      },
                    ]}
                  >
                    <DatePicker className="w-100" placeholder="Select Date" />
                  </Form.Item>
                  <Form.Item<FieldType>
                    name="interviewTime"
                    className="mb-0"
                    rules={[
                      {
                        required: true,
                        message: 'Please select time!',
                      },
                    ]}
                  >
                    <TimePicker className="w-100" placeholder="Select Time" />
                  </Form.Item>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="input-group-meta position-relative mb-15">
                <label>Interviewers*</label>
                <Form.Item<FieldType>
                  name="interviewers"
                  className="mb-0"
                  rules={[
                    {
                      required: true,
                      message: 'Please choose interviewers!',
                    },
                  ]}
                >
                  <Select
                    className="w-100"
                    showSearch
                    mode="multiple"
                    placeholder="Select Interviewers"
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
            <div className="col-lg-6">
              <div className="input-group-meta position-relative mb-15">
                <label>Interview Template*</label>
                <Form.Item<FieldType>
                  name="interviewTemplate"
                  className="mb-0"
                  rules={[
                    {
                      required: true,
                      message: 'Please choose interview template!',
                    },
                  ]}
                >
                  <Select
                    className="w-100"
                    showSearch
                    placeholder="Select Interview Template"
                    optionFilterProp="children"
                    onChange={handleTemplate}
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

            {interviewType === 'Online' && (
              <div className="col-lg-6">
                <div className="input-group-meta position-relative mb-15">
                  <label>Interview Link*</label>
                  <Form.Item<FieldType>
                    name="interviewLink"
                    className="mb-0"
                    rules={[
                      {
                        required: true,
                        message: 'Please input interview link!',
                      },
                    ]}
                  >
                    <Input placeholder="Input Interview Link" />
                  </Form.Item>
                </div>
              </div>
            )}
            {interviewType === 'Offline' && (
              <div className="col-lg-6">
                <div className="input-group-meta position-relative mb-15">
                  <label>Interview Place*</label>
                  <Form.Item<FieldType>
                    name="interviewPlace"
                    className="mb-0"
                    rules={[
                      {
                        required: true,
                        message: 'Please choose interview place!',
                      },
                    ]}
                  >
                    <Select
                      className="w-100"
                      showSearch
                      placeholder="Select Place"
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
            )}
            {interviewType === 'choose' && <div className="col-lg-6"></div>}

            {interviewTemplate && (
              <div className="col-lg-12">
                <div className="input-group-meta position-relative mb-15">
                  <label>Interview Info*</label>
                  <Form.Item<FieldType>
                    name="interviewInfo"
                    className="mb-0"
                    rules={[
                      {
                        required: true,
                        message: 'Please input interview info!',
                      },
                    ]}
                  >
                    <ReactQuill
                      className="textArea"
                      theme="snow"
                      modules={modules}
                      placeholder="Input Interview Info"
                    />
                  </Form.Item>
                </div>
              </div>
            )}

            <div className="col-lg-6">
              <div className="input-group-meta position-relative mb-15">
                <Form.Item>
                  <Button type="primary">Submit</Button>
                </Form.Item>
              </div>
            </div>
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default CreateInterviewModal;
