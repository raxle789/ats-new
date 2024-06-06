'use client';

import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import { pdfjs } from 'react-pdf';
import DocumentViewer from '../../documents/pdf-viewer';
import {
  Form,
  Input,
  InputNumber,
  Radio,
  message,
  Rate,
  Select,
  Button,
} from 'antd';
import type { RadioChangeEvent, FormProps } from 'antd';
// import { FaHistory } from 'react-icons/fa';
import InterviewHistoryModal from '../../common/popup/interview-history-modal';

const { TextArea } = Input;

interface FieldType {
  identityInfo?: {
    fullname?: string;
    age?: number;
    maritalStatus?: string;
    lastEducation?: string;
    position?: string;
    source?: string;
    assessmentResult?: string;
    discProfile?: string;
  };
  resultInfo?: {
    eduBackground?: number;
    eduBackgroundComment?: string;
    workExp?: number;
    workExpComment?: string;
    comSkills?: number;
    comSkillsComment?: string;
    qualityOriented?: number;
    qualityOrientedComment?: string;
    achievementOriented?: number;
    achievementOrientedComment?: string;
    devOthers?: number;
    devOthersComment?: string;
    creativeAgility?: number;
    creativeAgilityComment?: string;
    leadOthers?: number;
    leadOthersComment?: string;
    strategicThinking?: number;
    strategicThinkingComment?: string;
    reliablePartner?: number;
    reliablePartnerComment?: string;
    techSavvy?: number;
    techSavvyComment?: string;
    rejectComment?: string;
    keepInViewComment?: string;
    rescheduleReason?: string;
    interviewResult?: string;
  };
}

const desc = ['Poor', 'Fair', 'Good', 'Excellent'];

const InterviewResultItem = ({
  interviewResultData,
  insertInterviewResult,
  params,
  searchParams,
}) => {
  // UseState
  const [form] = Form.useForm();

  const [radioValues, setRadioValues] = useState<number[]>([]);

  const [scoreTotal, setScoreTotal] = useState('');

  const [rating, setRating] = useState<number[]>([
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ]);

  const [interviewResultStatusValue, setInterviewResultStatusValue] =
    useState(0);

  const [isModalOpen, setIsModalOpen] = useState(false);

  // Functions
  // const onChange = (index: number, e: RadioChangeEvent) => {
  //   const newValues = [...radioValues];
  //   newValues[index] = e.target.value;
  //   setRadioValues(newValues);
  // };

  const handleInterviewModal = () => {
    setIsModalOpen(true);
  };

  const handleRatingClick = (index: number, value: number) => {
    let stateChanged = [...rating];
    stateChanged[index] = value;
    setRating(stateChanged);
  };

  function handleInterviewResultStatus(e) {
    // console.log('radio checked', e.target.value);
    setInterviewResultStatusValue(
      interviewResultData?.interviewResultStatus?.findIndex(
        (item) => item?.name === e.target.value,
      ),
    );
  }

  function handleSubmit(values) {
    // showModal();
    // let values = form.getFieldsValue();
    // values = {
    //   ...values,
    //   resultInfo: { ...values.resultInfo, scoreTotal: scoreTotal },
    // };

    insertInterviewResult(params, searchParams, values);
  }

  // function onFinishFailed(errorInfo) {
  //   if (errorInfo.errorFields && errorInfo.errorFields.length > 0) {
  //     // const errorMessage = errorInfo.errorFields
  //     //   .map((field) => field.errors.join(', '))
  //     //   .join('; ');
  //     // message.error(`Failed: ${errorMessage}`);
  //   }
  // }

  // UseEffect
  // useEffect(() => {
  //   console.log('radio values: ', radioValues);
  //   if (radioValues) {
  //     const initialValue = 0;
  //     const sumWithInitial = radioValues.reduce(
  //       (accumulator, currentValue) => accumulator + currentValue,
  //       initialValue,
  //     );
  //     const mean = sumWithInitial / 11;
  //     const score = mean.toFixed(2);
  //     setScoreTotal(score);
  //   }
  // }, [radioValues]);

  useEffect(() => {
    console.log('ratingUseEffect: ', rating);
  }, [rating]);

  // useEffect(() => {
  //   pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;
  // }, []);
  return (
    <>
      <div className="job-fpk-header mb-40 lg-mb-30">
        <div className="d-sm-flex align-items-start justify-content-between mb-40 lg-mb-30">
          <h2 className="main-title m0 flex-grow-1">Interview Report Form</h2>
        </div>
      </div>
      <div className="bg-white card-box border-20">
        <div className="row">
          <div className="row">
            <div className="col-12 d-flex justify-content-end">
              {/* <Tooltip title="Interview Result"> */}
              <Button
                type="primary"
                // className="d-flex justify-content-center align-items-center"
                onClick={handleInterviewModal}
              >
                Interview History
              </Button>
              {/* </Tooltip> */}
            </div>
            <div className="col-6">
              <div className="input-group-meta position-relative mb-15">
                <label>Name: </label>
                <p>{interviewResultData?.applicantName ?? '-'}</p>
                {/* <Form.Item<FieldType>
                  name={['identityInfo', 'fullname']}
                  className="mb-0"
                  validateStatus={errors?.fullname ? 'error' : ''}
                  help={errors && errors.fullname}
                >
                  <Input placeholder="Full Name" />
                </Form.Item> */}
              </div>
            </div>
            <div className="col-6">
              <div className="input-group-meta position-relative mb-15">
                <label>Age: </label>
                <p>{interviewResultData?.applicantAge ?? '-'}</p>
                {/* <Form.Item<FieldType>
                  name={['identityInfo', 'age']}
                  className="mb-0"
                  validateStatus={
                    errors && errors.education && errors.education.gpa
                      ? 'error'
                      : ''
                  }
                  help={
                    errors &&
                    errors.education &&
                    errors.education.gpa?._errors.toString()
                  }
                >
                  <InputNumber
                    className="w-100"
                    min={1}
                    step={11}
                    placeholder="Age"
                  />
                </Form.Item> */}
              </div>
            </div>
            <div className="col-6">
              <div className="input-group-meta position-relative mb-15">
                <label>Marital Status: </label>
                <p>{interviewResultData?.applicantMaritalStatus ?? '-'}</p>
                {/* <Form.Item<FieldType>
                  name={['identityInfo', 'maritalStatus']}
                  className="mb-0"
                  validateStatus={
                    errors && errors.profile && errors.profile.maritalStatus
                      ? 'error'
                      : ''
                  }
                  help={
                    errors &&
                    errors.profile &&
                    errors.profile.maritalStatus?._errors.toString()
                  }
                >
                  <Input placeholder="Marital Status" />
                </Form.Item> */}
              </div>
            </div>
            <div className="col-6">
              <div className="input-group-meta position-relative mb-15">
                <label>Latest Education Level: </label>
                <p>{interviewResultData?.applicantLastEducationLevel ?? '-'}</p>
                {/* <Form.Item<FieldType>
                  name={['identityInfo', 'lastEducation']}
                  className="mb-0"
                  validateStatus={
                    errors &&
                    errors.education &&
                    errors.education.educationLevel
                      ? 'error'
                      : ''
                  }
                  help={
                    errors &&
                    errors.education &&
                    errors.education.educationLevel?._errors.toString()
                  }
                >
                  <Input placeholder="Last Education" />
                </Form.Item> */}
              </div>
            </div>
            <div className="col-6">
              <div className="input-group-meta position-relative mb-15">
                <label>Latest Position Level: </label>
                <p>{interviewResultData?.applicantLastPositionLevel ?? '-'}</p>
                {/* <Form.Item<FieldType>
                  name={['identityInfo', 'position']}
                  className="mb-0"
                  validateStatus={
                    errors && errors.profile && errors.profile.maritalStatus
                      ? 'error'
                      : ''
                  }
                  help={
                    errors &&
                    errors.profile &&
                    errors.profile.maritalStatus?._errors.toString()
                  }
                >
                  <Input placeholder="Position" />
                </Form.Item> */}
              </div>
            </div>
            <div className="col-6">
              <div className="input-group-meta position-relative mb-15">
                <label>Source: </label>
                <p>{interviewResultData?.applicantSource ?? '-'}</p>
                {/* <Form.Item<FieldType>
                  name={['identityInfo', 'source']}
                  className="mb-0"
                  validateStatus={
                    errors && errors.profile && errors.profile.maritalStatus
                      ? 'error'
                      : ''
                  }
                  help={
                    errors &&
                    errors.profile &&
                    errors.profile.maritalStatus?._errors.toString()
                  }
                >
                  <Input placeholder="Source" />
                </Form.Item> */}
              </div>
            </div>
            <div className="col-6">
              <div className="input-group-meta position-relative mb-15">
                <label>Assessment Result: </label>
                <p>{interviewResultData?.applicantAssessmentResult ?? '-'}</p>
                {/* <Form.Item<FieldType>
                  name={['identityInfo', 'assessmentResult']}
                  className="mb-0"
                  validateStatus={
                    errors && errors.profile && errors.profile.maritalStatus
                      ? 'error'
                      : ''
                  }
                  help={
                    errors &&
                    errors.profile &&
                    errors.profile.maritalStatus?._errors.toString()
                  }
                >
                  <Input placeholder="Assessment Result" />
                </Form.Item> */}
              </div>
            </div>
            <div className="col-6">
              <div className="input-group-meta position-relative mb-15">
                <label>DISC Profile: </label>
                <p>{interviewResultData?.applicantDiscProfile ?? '-'}</p>
                {/* <Form.Item<FieldType>
                  name={['identityInfo', 'discProfile']}
                  className="mb-0"
                  validateStatus={
                    errors && errors.profile && errors.profile.maritalStatus
                      ? 'error'
                      : ''
                  }
                  help={
                    errors &&
                    errors.profile &&
                    errors.profile.maritalStatus?._errors.toString()
                  }
                >
                  <Input placeholder="DISC Profile" />
                </Form.Item> */}
              </div>
            </div>
          </div>
          <div className="col-6">
            <Form
              form={form}
              scrollToFirstError={true}
              onFinish={handleSubmit}
              // onFinishFailed={onFinishFailed}
            >
              <div className="row">
                {interviewResultData?.interviewResultCategories?.length &&
                  interviewResultData?.interviewResultCategories?.map(
                    (item, index) => {
                      return (
                        <div className="col-12 mt-3" key={index}>
                          <div className="input-group-meta position-relative mb-15">
                            <label className="fw-bold d-block">
                              {item?.name}
                            </label>
                            <label>{item?.description}</label>
                            <div className="row">
                              <div className="col-4">
                                <Form.Item
                                  name={`${_.camelCase(item?.name)}Rate`}
                                  className="mt-2 mb-0"
                                  rules={[
                                    {
                                      required: true,
                                      message: `Please Select Rate For ${item?.name}!`,
                                    },
                                  ]}
                                >
                                  <div>
                                    <Rate
                                      tooltips={desc}
                                      allowClear={true}
                                      onChange={(value) =>
                                        form.setFieldValue(
                                          `${_.camelCase(item?.name)}Rate`,
                                          value,
                                        )
                                      }
                                      value={form.getFieldValue(
                                        `${_.camelCase(item?.name)}Rate`,
                                      )}
                                      count={4}
                                    />
                                  </div>
                                </Form.Item>
                              </div>
                              <div className="col-8">
                                <Form.Item
                                  name={`${_.camelCase(item?.name)}Comment`}
                                  className="mb-0"
                                  rules={[
                                    ({ getFieldValue }) => ({
                                      transform: (value) => {
                                        return value?.trim();
                                      },
                                      validator: (rule, value) => {
                                        const rate = getFieldValue(
                                          `${_.camelCase(item?.name)}Rate`,
                                        );

                                        if (rate <= 1 && !value) {
                                          return Promise.reject(
                                            `Please Input Comment For ${item?.name}!`,
                                          );
                                        } else {
                                          return Promise.resolve();
                                        }
                                      },
                                    }),
                                  ]}
                                >
                                  <TextArea
                                    placeholder="Comment"
                                    autoSize={{ minRows: 3 }}
                                  />
                                </Form.Item>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    },
                  )}

                {/* <div className="col-12 mt-3">
                  <div className="input-group-meta position-relative mb-15">
                    <label className="fw-bold d-block">
                      Education Background
                    </label>
                    <label>
                      Candidate has an educational/training background that is
                      relevant to the position
                    </label>
                    <div className="row">
                      <div className="col-4">
                        <Form.Item<FieldType>
                          name={['resultInfo', 'eduBackground']}
                          className="mt-2 mb-0"
                        >
                          <div>
                            <button
                              type="button"
                              className={`${rating[0] === 1 ? 'rating-active1' : 'rating-icon'}`}
                              onClick={() => handleRatingClick(0, 1)}
                            >
                              <FiThumbsDown />
                            </button>
                            <button
                              type="button"
                              className={`${rating[0] === 2 ? 'rating-active2' : 'rating-icon'}`}
                              onClick={() => handleRatingClick(0, 2)}
                            >
                              <FiThumbsDown />
                            </button>
                            <button
                              type="button"
                              className={`${rating[0] === 3 ? 'rating-active2' : 'rating-icon'}`}
                              onClick={() => handleRatingClick(0, 3)}
                            >
                              <FiThumbsUp />
                            </button>
                            <button
                              type="button"
                              className={`${rating[0] === 4 ? 'rating-active3' : 'rating-icon2'}`}
                              onClick={() => handleRatingClick(0, 4)}
                            >
                              <FiThumbsUp />
                            </button>
                            <Rate
                              tooltips={desc}
                              onChange={(value) => handleRatingClick(0, value)}
                              value={rating[0]}
                              count={4}
                            />
                          </div>
                        </Form.Item>
                      </div>
                      <div className="col-8">
                        <Form.Item<FieldType>
                          name={['resultInfo', 'eduBackgroundComment']}
                          className="mb-0"
                        >
                          <TextArea
                            placeholder="Comment"
                            autoSize={{ minRows: 3, maxRows: 5 }}
                          />
                        </Form.Item>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-12 mt-3">
                  <div className="input-group-meta position-relative mb-15">
                    <label className="fw-bold d-block">
                      Working Experience
                    </label>
                    <label>
                      Candidate has work experience with the skills and
                      qualifications which are the same or similar to the
                      position
                    </label>
                    <div className="row">
                      <div className="col-4">
                        <Form.Item<FieldType>
                          name={['resultInfo', 'workExp']}
                          className="mt-2 mb-0"
                        >
                          <div>
                            <Rate
                              tooltips={desc}
                              onChange={(value) => handleRatingClick(1, value)}
                              value={rating[1]}
                              count={4}
                            />
                          </div>
                        </Form.Item>
                      </div>
                      <div className="col-8">
                        <Form.Item<FieldType>
                          name={['resultInfo', 'workExpComment']}
                          className="mb-0"
                        >
                          <TextArea
                            placeholder="Comment"
                            autoSize={{ minRows: 3, maxRows: 5 }}
                          />
                        </Form.Item>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-12 mt-3">
                  <div className="input-group-meta position-relative mb-15">
                    <label className="fw-bold d-block">
                      Communication Skills
                    </label>
                    <label>
                      Candidate is able to express ideas systematically and
                      clearly
                    </label>
                    <div className="row">
                      <div className="col-4">
                        <Form.Item<FieldType>
                          name={['resultInfo', 'comSkills']}
                          className="mt-2 mb-0"
                        >
                          <div>
                            <Rate
                              tooltips={desc}
                              onChange={(value) => handleRatingClick(2, value)}
                              value={rating[2]}
                              count={4}
                            />
                          </div>
                        </Form.Item>
                      </div>
                      <div className="col-8">
                        <Form.Item<FieldType>
                          name={['resultInfo', 'comSkillsComment']}
                          className="mb-0"
                        >
                          <TextArea
                            placeholder="Comment"
                            autoSize={{ minRows: 3, maxRows: 5 }}
                          />
                        </Form.Item>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-12 mt-3">
                  <div className="input-group-meta position-relative mb-15">
                    <label className="fw-bold d-block">Quality Oriented</label>
                    <label>
                      Candidate demonstrates a focus on quality by striving to
                      meet high performance standards and improve work process
                    </label>
                    <div className="row">
                      <div className="col-4">
                        <Form.Item<FieldType>
                          name={['resultInfo', 'qualityOriented']}
                          className="mt-2 mb-0"
                        >
                          <div>
                            <Rate
                              tooltips={desc}
                              onChange={(value) => handleRatingClick(3, value)}
                              value={rating[3]}
                              count={4}
                            />
                          </div>
                        </Form.Item>
                      </div>
                      <div className="col-8">
                        <Form.Item<FieldType>
                          name={['resultInfo', 'qualityOrientedComment']}
                          className="mb-0"
                        >
                          <TextArea
                            placeholder="Comment"
                            autoSize={{ minRows: 3, maxRows: 5 }}
                          />
                        </Form.Item>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-12 mt-3">
                  <div className="input-group-meta position-relative mb-15">
                    <label className="fw-bold d-block">
                      Achievement Oriented
                    </label>
                    <label>
                      Candidate has an orientation towards achieving better work
                      performance that exceeds the company's standards
                    </label>
                    <div className="row">
                      <div className="col-4">
                        <Form.Item<FieldType>
                          name={['resultInfo', 'achievementOriented']}
                          className="mt-2 mb-0"
                        >
                          <div>
                            <Rate
                              tooltips={desc}
                              onChange={(value) => handleRatingClick(4, value)}
                              value={rating[4]}
                              count={4}
                            />
                          </div>
                        </Form.Item>
                      </div>
                      <div className="col-8">
                        <Form.Item<FieldType>
                          name={['resultInfo', 'achievementOrientedComment']}
                          className="mb-0"
                        >
                          <TextArea
                            placeholder="Comment"
                            autoSize={{ minRows: 3, maxRows: 5 }}
                          />
                        </Form.Item>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-12 mt-3">
                  <div className="input-group-meta position-relative mb-15">
                    <label className="fw-bold d-block">Developing Others</label>
                    <label>
                      Candidate is able to encourage themselves and/or others to
                      develop/grow
                    </label>
                    <div className="row">
                      <div className="col-4">
                        <Form.Item<FieldType>
                          name={['resultInfo', 'devOthers']}
                          className="mt-2 mb-0"
                        >
                          <div>
                            <Rate
                              tooltips={desc}
                              onChange={(value) => handleRatingClick(5, value)}
                              value={rating[5]}
                              count={4}
                            />
                          </div>
                        </Form.Item>
                      </div>
                      <div className="col-8">
                        <Form.Item<FieldType>
                          name={['resultInfo', 'devOthersComment']}
                          className="mb-0"
                        >
                          <TextArea
                            placeholder="Comment"
                            autoSize={{ minRows: 3, maxRows: 5 }}
                          />
                        </Form.Item>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-12 mt-3">
                  <div className="input-group-meta position-relative mb-15">
                    <label className="fw-bold d-block">Creative Agility</label>
                    <label>
                      Candidate is able to identify, propose, and develop the
                      use of new methods, technologies, and systems
                    </label>
                    <div className="row">
                      <div className="col-4">
                        <Form.Item<FieldType>
                          name={['resultInfo', 'creativeAgility']}
                          className="mt-2 mb-0"
                        >
                          <div>
                            <Rate
                              tooltips={desc}
                              onChange={(value) => handleRatingClick(6, value)}
                              value={rating[6]}
                              count={4}
                            />
                          </div>
                        </Form.Item>
                      </div>
                      <div className="col-8">
                        <Form.Item<FieldType>
                          name={['resultInfo', 'creativeAgilityComment']}
                          className="mb-0"
                        >
                          <TextArea
                            placeholder="Comment"
                            autoSize={{ minRows: 3, maxRows: 5 }}
                          />
                        </Form.Item>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-12 mt-3">
                  <div className="input-group-meta position-relative mb-15">
                    <label className="fw-bold d-block">Leading Others</label>
                    <label>
                      Candidate is able to manage own tasks and other's task.
                      Able to manage, monitor, provide feedback, and make
                      decisions appropriately
                    </label>
                    <div className="row">
                      <div className="col-4">
                        <Form.Item<FieldType>
                          name={['resultInfo', 'leadOthers']}
                          className="mt-2 mb-0"
                        >
                          <div>
                            <Rate
                              tooltips={desc}
                              onChange={(value) => handleRatingClick(7, value)}
                              value={rating[7]}
                              count={4}
                            />
                          </div>
                        </Form.Item>
                      </div>
                      <div className="col-8">
                        <Form.Item<FieldType>
                          name={['resultInfo', 'leadOthersComment']}
                          className="mb-0"
                        >
                          <TextArea
                            placeholder="Comment"
                            autoSize={{ minRows: 3, maxRows: 5 }}
                          />
                        </Form.Item>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-12 mt-3">
                  <div className="input-group-meta position-relative mb-15">
                    <label className="fw-bold d-block">
                      Strategic Thinking
                    </label>
                    <label>
                      Candidate is able to predict various risk, opportunities
                      and take actions based on the organization's strategic
                      plan
                    </label>
                    <div className="row">
                      <div className="col-4">
                        <Form.Item<FieldType>
                          name={['resultInfo', 'strategicThinking']}
                          className="mt-2 mb-0"
                        >
                          <div>
                            <Rate
                              tooltips={desc}
                              onChange={(value) => handleRatingClick(8, value)}
                              value={rating[8]}
                              count={4}
                            />
                          </div>
                        </Form.Item>
                      </div>
                      <div className="col-8">
                        <Form.Item<FieldType>
                          name={['resultInfo', 'strategicThinkingComment']}
                          className="mb-0"
                        >
                          <TextArea
                            placeholder="Comment"
                            autoSize={{ minRows: 3, maxRows: 5 }}
                          />
                        </Form.Item>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-12 mt-3">
                  <div className="input-group-meta position-relative mb-15">
                    <label className="fw-bold d-block">Reliable Partner</label>
                    <label>
                      Candidate is able to adapt and collaborate with colleagues
                      in their own department and other departments
                    </label>
                    <div className="row">
                      <div className="col-4">
                        <Form.Item<FieldType>
                          name={['resultInfo', 'reliablePartner']}
                          className="mt-2 mb-0"
                        >
                          <div>
                            <Rate
                              tooltips={desc}
                              onChange={(value) => handleRatingClick(9, value)}
                              value={rating[9]}
                              count={4}
                            />
                          </div>
                        </Form.Item>
                      </div>
                      <div className="col-8">
                        <Form.Item<FieldType>
                          name={['resultInfo', 'reliablePartnerComment']}
                          className="mb-0"
                        >
                          <TextArea
                            placeholder="Comment"
                            autoSize={{ minRows: 3, maxRows: 5 }}
                          />
                        </Form.Item>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-12 mt-3">
                  <div className="input-group-meta position-relative mb-15">
                    <label className="fw-bold d-block">Technology Savvy</label>
                    <label>
                      Candidate is able to use technology/systems to support
                      work processes
                    </label>
                    <div className="row">
                      <div className="col-4">
                        <Form.Item<FieldType>
                          name={['resultInfo', 'techSavvy']}
                          className="mt-2 mb-0"
                        >
                          <div>
                            <Rate
                              tooltips={desc}
                              onChange={(value) => handleRatingClick(10, value)}
                              value={rating[10]}
                              count={4}
                            />
                          </div>
                        </Form.Item>
                      </div>
                      <div className="col-8">
                        <Form.Item<FieldType>
                          name={['resultInfo', 'techSavvyComment']}
                          className="mb-0"
                        >
                          <TextArea
                            placeholder="Comment"
                            autoSize={{ minRows: 3, maxRows: 5 }}
                          />
                        </Form.Item>
                      </div>
                    </div>
                  </div>
                </div> */}

                {interviewResultData?.interviewResultStatus?.length && (
                  <div className="col-12 mt-3">
                    <div className="input-group-meta position-relative mb-15">
                      <label>Result for Position</label>
                      <Form.Item
                        name="status"
                        className="mb-0"
                        rules={[
                          {
                            required: true,
                            message: 'Please Select Interview Result!',
                          },
                        ]}
                      >
                        <Radio.Group
                          onChange={handleInterviewResultStatus}
                          value={
                            interviewResultData?.interviewResultStatus[
                              interviewResultStatusValue
                            ]?.name
                          }
                        >
                          {interviewResultData?.interviewResultStatus?.map(
                            (item, index) => (
                              <Radio key={index} value={item?.name}>
                                {item?.name}
                              </Radio>
                            ),
                          )}
                          {/* <Radio value="Hire">Hire</Radio>
                        <Radio value="Reject">Reject</Radio>
                        <Radio value="Keep in View">Keep in View</Radio>
                        <Radio value="Reschedule">Reschedule</Radio> */}
                        </Radio.Group>
                      </Form.Item>

                      {interviewResultData?.interviewResultStatus[
                        interviewResultStatusValue
                      ]?.isComment &&
                        interviewResultData?.interviewResultStatus[
                          interviewResultStatusValue
                        ]?.name !== 'Reschedule' && (
                          <Form.Item
                            name="reason"
                            className="mb-0"
                            rules={[
                              {
                                transform: (value) => {
                                  return value?.trim();
                                },
                                required: true,
                                message: `Please Input Reason For ${interviewResultData?.interviewResultStatus[interviewResultStatusValue]?.name}!`,
                              },
                            ]}
                          >
                            <TextArea
                              placeholder="Reason"
                              autoSize={{ minRows: 3 }}
                            />
                          </Form.Item>
                        )}
                      {interviewResultData?.interviewResultStatus[
                        interviewResultStatusValue
                      ]?.name == 'Reschedule' && (
                        <Form.Item
                          name="rescheduler"
                          className="mb-0"
                          rules={[
                            {
                              required: true,
                              message: "Please Select Rescheduler's Name!",
                            },
                          ]}
                        >
                          <Select
                            className="w-100"
                            allowClear
                            placeholder="Select"
                            options={interviewResultData?.reschedulers}
                          />
                        </Form.Item>
                      )}
                    </div>
                  </div>
                )}

                <div className="button-group d-inline-flex align-items-center mt-30 mb-0">
                  <button type="submit" className="dash-btn-two tran3s me-3">
                    Submit
                  </button>
                </div>
              </div>
            </Form>
          </div>
          {interviewResultData?.applicantCv && (
            <div className="col-6">
              <p>DISPLAY CV</p>
              {/* <DocumentViewer data={data} /> */}
              <embed
                title="candidateCv"
                src={interviewResultData?.applicantCv}
                width="100%"
                height="100%"
              />
            </div>
          )}
        </div>
      </div>

      {/* start modal */}
      <InterviewHistoryModal
        isOpen={isModalOpen}
        setIsOpenModal={setIsModalOpen}
      />
      {/* end modal */}
    </>
  );
};

export default InterviewResultItem;
