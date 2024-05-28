'use client';

import React, { useState, useEffect } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import * as utils from '@/lib/utils/utils';
import * as messages from '@/utils/message';
import * as confirmations from '@/utils/confirmation';
import moment from 'moment';
import EmailPreview from '@/lib/services/messages/email/preview';
import {
  Modal,
  Form,
  Input,
  Radio,
  Select,
  DatePicker,
  TimePicker,
  Button,
  message,
} from 'antd';
import type { RadioChangeEvent } from 'antd';
import ReactQuill from 'react-quill';

const { confirm } = Modal;

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

const CreateInterviewModal = ({
  isOpenModal,
  router,
  api,
  setLoading,
  setIsOpenModal,
  typeData,
  interviewerData,
  messageTemplateData,
  placeData,
  insertInterview,
  candidateId,
  jobVacancyId,
  candidateName,
  jobTitleAliases,
}) => {
  const [form] = Form.useForm();

  const [interviewType, setInterviewType] = useState(2);

  const [interviewMessageTemplate, setInterviewMessageTemplate] = useState(-1);

  useEffect(() => {
    form.setFieldsValue({
      type: interviewType,
    });
  });

  useEffect(() => {
    const value = form.getFieldValue('messageTemplate') ?? '-';

    const interviewDateTime = form.getFieldValue('dateTime') ?? '-';

    const interviewMeetingLink = form.getFieldValue('meetingLink') ?? '-';

    if (value !== '-') {
      utils
        .formatHtml(
          messageTemplateData[Number(value) - 1]?.message,
          candidateName,
          jobTitleAliases,
          interviewDateTime,
          'Audrey Harnov',
          interviewMeetingLink,
        )
        .then((res) => {
          setInterviewMessageTemplate(value);

          form.setFieldValue('message', res);
        });
    }
  }, [candidateName, jobTitleAliases, messageTemplateData]);

  const onChangeRadio = (e) => {
    setInterviewType(e.target.value);

    form.setFieldValue('type', e.target.value);
  };

  function handleTemplate(value) {
    const interviewDateTime = form.getFieldValue('dateTime') ?? '-';

    const interviewMeetingLink = form.getFieldValue('meetingLink') ?? '-';

    // console.info('interviewDateTime', interviewDateTime);

    // console.info(
    //   moment(interviewDateTime, 'YYYY-MM-DD HH:mm:ss').format('DD-MM-YYYY'),
    // );

    utils
      .formatHtml(
        messageTemplateData[value - 1]?.message,
        candidateName,
        jobTitleAliases,
        interviewDateTime,
        'Audrey Harnov',
        interviewMeetingLink,
      )
      .then((res) => {
        setInterviewMessageTemplate(value);

        form.setFieldValue('message', res);
      });
  }

  function handleDateTime(value) {
    const messageTemplate = form.getFieldValue('messageTemplate') ?? '-';

    const interviewMeetingLink = form.getFieldValue('meetingLink') ?? '-';

    if (messageTemplate !== '-') {
      utils
        .formatHtml(
          messageTemplateData[messageTemplate - 1]?.message,
          candidateName,
          jobTitleAliases,
          value,
          'Audrey Harnov',
          interviewMeetingLink,
        )
        .then((res) => {
          setInterviewMessageTemplate(value);

          form.setFieldValue('message', res);
        });
    }
  }

  const handleMeetingLink = useDebouncedCallback((value) => {
    const messageTemplate = form.getFieldValue('messageTemplate') ?? '-';

    const interviewDateTime = form.getFieldValue('dateTime') ?? '-';

    if (messageTemplate !== '-') {
      utils
        .formatHtml(
          messageTemplateData[messageTemplate - 1]?.message,
          candidateName,
          jobTitleAliases,
          interviewDateTime,
          'Audrey Harnov',
          value,
        )
        .then((res) => {
          setInterviewMessageTemplate(value);

          form.setFieldValue('message', res);
        });
    }
  }, 500);

  const handleCancel = () => {
    setIsOpenModal(false);
  };

  function handleSubmitInterview(values) {
    setLoading(true);

    confirm({
      ...confirmations.submitConfirmation('interview'),
      onOk() {
        return new Promise<void>((resolve, reject) => {
          setTimeout(async () => {
            const validate = await insertInterview(
              candidateId,
              jobVacancyId,
              values,
            );

            if (validate && Array.isArray(validate) && validate?.length) {
              for (let i = 0; i < validate.length; i++) {
                if (validate[i]?.success) {
                  messages.success(
                    api,
                    `Interview Invitation Sent Successfully to ${validate[i]?.name} (${validate[i]?.role})`,
                  );
                } else {
                  messages.error(
                    api,
                    `Interview Invitation Failed Sent to ${validate[i]?.name} (${validate[i]?.role})`,
                  );
                }
              }

              router.refresh();

              handleCancel();

              resolve(setLoading(false));
            } else if (validate?.success) {
              messages.success(api, validate?.message);

              router.refresh();

              handleCancel();

              resolve(setLoading(false));
            } else {
              messages.error(api, validate?.message);

              form.resetFields();

              router.refresh();

              handleCancel();

              resolve(setLoading(false));
            }
          }, 2000);
        }).catch((e) => console.log('Failed Creating Interview', e));
      },
      onCancel() {
        router.refresh();

        handleCancel();

        setLoading(false);
      },
    });
  }

  // const onFinishFailed = () => {
  //   console.log('failed');
  // };

  return (
    <>
      <Modal
        title="Create Interview"
        maskClosable={false}
        centered
        open={isOpenModal}
        onOk={() => form.submit()}
        onCancel={handleCancel}
        okText="Submit"
        cancelText="Cancel"
        width={700}
        wrapClassName="custom-modal-wrapper"
      >
        <Form
          name="createInterviewForm"
          form={form}
          className="overflow-x-hidden"
          variant="filled"
          onFinish={handleSubmitInterview}
        >
          <div className="row mt-20">
            <div className="col-lg-6">
              <div className="input-group-meta position-relative mb-15">
                <label>Interview Type</label>
                <Form.Item
                  name="type"
                  className="mb-0"
                  rules={[
                    {
                      required: true,
                      message: 'Please Choose Interview Type',
                    },
                  ]}
                >
                  <Radio.Group
                    className="radio d-flex align-items-center"
                    options={typeData}
                    buttonStyle="solid"
                    onChange={onChangeRadio}
                  />
                  {/* <Radio.Button className="radio-children" value="Online">
                      Online
                    </Radio.Button>
                    <Radio.Button className="radio-children" value="Offline">
                      Offline
                    </Radio.Button> */}
                  {/* </Radio.Group> */}
                </Form.Item>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="input-group-meta position-relative mb-15">
                <label>Interview Title</label>
                <Form.Item
                  name="title"
                  className="mb-0"
                  rules={[
                    {
                      required: true,
                      message: 'Please Input Interview Title',
                    },
                  ]}
                >
                  <Input placeholder="Input Interview Title" />
                </Form.Item>
              </div>
            </div>
            <div className="col-6">
              <div className="input-group-meta position-relative mb-15">
                <label>Interview Date and Time</label>
                <div className="d-flex align-items-center">
                  <Form.Item
                    name="dateTime"
                    className="mb-0 me-2"
                    rules={[
                      {
                        required: true,
                        message: 'Please Select Interview Date and Time!',
                      },
                    ]}
                  >
                    <DatePicker
                      className="w-100"
                      onChange={handleDateTime}
                      showTime
                      placeholder="Select Date and Time"
                    />
                  </Form.Item>
                  {/* <Form.Item<FieldType>
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
                  </Form.Item> */}
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="input-group-meta position-relative mb-15">
                <label>Interviewers</label>
                <Form.Item
                  name="interviewers"
                  className="mb-0"
                  rules={[
                    {
                      required: true,
                      message: 'Please Select Interviewers',
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
                    options={interviewerData}
                  />
                </Form.Item>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="input-group-meta position-relative mb-15">
                <label>Interview Message Template</label>
                <Form.Item
                  name="messageTemplate"
                  className="mb-0"
                  rules={[
                    {
                      required: true,
                      message: 'Please Select Interview Message Template',
                    },
                  ]}
                >
                  <Select
                    className="w-100"
                    showSearch
                    placeholder="Select Interview Message Template"
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
                    options={messageTemplateData}
                  />
                </Form.Item>
              </div>
            </div>

            {interviewType === 1 && (
              <div className="col-lg-6">
                <div className="input-group-meta position-relative mb-15">
                  <label>Interview Link</label>
                  <Form.Item
                    name="meetingLink"
                    className="mb-0"
                    rules={[
                      {
                        required: true,
                        message: 'Please Input Interview Link',
                      },
                    ]}
                  >
                    <Input
                      placeholder="Input Interview Link"
                      onChange={(e) => handleMeetingLink(e.target.value)}
                    />
                  </Form.Item>
                </div>
              </div>
            )}
            {interviewType === 2 && (
              <div className="col-lg-6">
                <div className="input-group-meta position-relative mb-15">
                  <label>Interview Place</label>
                  <Form.Item
                    name="place"
                    className="mb-0"
                    rules={[
                      {
                        required: true,
                        message: 'Please Select Interview Place',
                      },
                    ]}
                  >
                    <Select
                      className="w-100"
                      showSearch
                      placeholder="Select Interview Place"
                      optionFilterProp="children"
                      filterOption={(input, option) =>
                        (option?.label.toLowerCase() ?? '').includes(input)
                      }
                      filterSort={(optionA, optionB) =>
                        (optionA?.label ?? '')
                          .toLowerCase()
                          .localeCompare((optionB?.label ?? '').toLowerCase())
                      }
                      options={placeData}
                    />
                  </Form.Item>
                </div>
              </div>
            )}
            {/* {interviewType === 'choose' && <div className="col-lg-6"></div>} */}

            {messageTemplateData?.length && interviewMessageTemplate !== -1 ? (
              <div className="col-lg-12">
                <div className="input-group-meta position-relative mb-15">
                  <label>Interview Message</label>
                  <Form.Item
                    name="message"
                    className="mb-0"
                    rules={[
                      {
                        required: true,
                        message: 'Please Input Interview Message',
                      },
                    ]}
                  >
                    <ReactQuill
                      className="textArea"
                      theme="snow"
                      modules={modules}
                      placeholder="Input Interview Message"
                    />
                  </Form.Item>
                  {/* <EmailPreview
                    emailHtml={String(
                      messageTemplateData[interviewMessageTemplate]?.message,
                    )}
                  /> */}
                </div>
              </div>
            ) : (
              <></>
            )}

            {/* <div className="col-lg-6">
              <div className="input-group-meta position-relative mb-15">
                <Form.Item>
                  <Button htmlType="submit" type="primary">
                    Submit
                  </Button>
                </Form.Item>
              </div>
            </div> */}
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default CreateInterviewModal;
