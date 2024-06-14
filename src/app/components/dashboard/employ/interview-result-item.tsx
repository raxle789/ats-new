'use client';
import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import * as confirmations from '@/utils/confirmation';
import * as messages from '@/utils/message';
import _ from 'lodash';
// import { pdfjs } from 'react-pdf';
// import DocumentViewer from '../../documents/pdf-viewer';
import {
  Form,
  Modal,
  Input,
  // InputNumber,
  Radio,
  message,
  Rate,
  Select,
  Button,
} from 'antd';
import InterviewHistoryModal from '../../common/popup/interview-history-modal';
// import type { RadioChangeEvent, FormProps } from 'antd';
// import { FaHistory } from 'react-icons/fa';

const { TextArea } = Input;
const { confirm } = Modal;
const desc = ['Poor', 'Fair', 'Good', 'Excellent'];

// interface FieldType {
//   identityInfo?: {
//     fullname?: string;
//     age?: number;
//     maritalStatus?: string;
//     lastEducation?: string;
//     position?: string;
//     source?: string;
//     assessmentResult?: string;
//     discProfile?: string;
//   };
//   resultInfo?: {
//     eduBackground?: number;
//     eduBackgroundComment?: string;
//     workExp?: number;
//     workExpComment?: string;
//     comSkills?: number;
//     comSkillsComment?: string;
//     qualityOriented?: number;
//     qualityOrientedComment?: string;
//     achievementOriented?: number;
//     achievementOrientedComment?: string;
//     devOthers?: number;
//     devOthersComment?: string;
//     creativeAgility?: number;
//     creativeAgilityComment?: string;
//     leadOthers?: number;
//     leadOthersComment?: string;
//     strategicThinking?: number;
//     strategicThinkingComment?: string;
//     reliablePartner?: number;
//     reliablePartnerComment?: string;
//     techSavvy?: number;
//     techSavvyComment?: string;
//     rejectComment?: string;
//     keepInViewComment?: string;
//     rescheduleReason?: string;
//     interviewResult?: string;
//   };
// }

type Props = {
  interviewResultData?: any;
  submitInterviewResult?: any;
  params?: {} | any;
  searchParams?: {} | any;
};

const InterviewResultItem: React.FC<Props> = ({
  interviewResultData,
  submitInterviewResult,
  params,
  searchParams,
}) => {
  const router = useRouter();

  const pathname = usePathname();

  const [form] = Form.useForm();

  const [api, contextHolder] = message.useMessage();

  const [loading, setLoading] = useState(false);

  const [formMode, setFormMode] = useState(interviewResultData?.mode);

  // const [radioValues, setRadioValues] = useState<number[]>([]);

  // const [scoreTotal, setScoreTotal] = useState('');

  const [rating, setRating] = useState<number[]>([
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ]);

  type TInterviewResultCategoriesRate = {
    [key: string]: number;
  };

  const [
    isInterviewResultCategoryDisabled,
    setIsInterviewResultCategoryDisabled,
  ] = useState({});

  const [interviewResultCategoriesRate, setInterviewResultCategoriesRate] =
    useState<TInterviewResultCategoriesRate>({});

  const [interviewResultStatusValue, setInterviewResultStatusValue] =
    useState(0);

  const [isOpenModal, setIsOpenModal] = useState(false);

  // Functions
  // const onChange = (index: number, e: RadioChangeEvent) => {
  //   const newValues = [...radioValues];
  //   newValues[index] = e.target.value;
  //   setRadioValues(newValues);
  // };

  useEffect(() => {
    setFormMode(interviewResultData?.mode);

    if (
      interviewResultData?.interviewResultCategories &&
      interviewResultData?.interviewResultCategories?.length
    ) {
      interviewResultData?.interviewResultCategories?.map((item: {} | any) => {
        if (
          item?.interviewResultCategories &&
          item?.interviewResultCategories?.length
        ) {
          item?.interviewResultCategories?.map((data: {} | any) => {
            setInterviewResultCategoriesRate((prev) => ({
              ...prev,
              [`${_.camelCase(data?.categoryName)}Rate`]: data?.score ?? 0,
            }));

            form.setFieldsValue({
              [`${_.camelCase(data?.categoryName)}Rate`]: data?.score ?? 0,
              [`${_.camelCase(data?.categoryName)}Comment`]:
                data?.comment ?? null,
            });
          });
        }
      });
    }

    if (
      interviewResultData?.interviewResultData &&
      !_.isEmpty(interviewResultData?.interviewResultData)
    ) {
      if (
        interviewResultData?.interviewResultCategories &&
        interviewResultData?.interviewResultCategories?.length
      ) {
        interviewResultData?.interviewResultCategories?.map(
          (item: {} | any) => {
            // console.info(item);

            if (
              interviewResultData?.interviewResultData?.statusName ===
              'Reschedule'
            ) {
              setIsInterviewResultCategoryDisabled((prev) => ({
                ...prev,
                [`${_.camelCase(item?.name)}Rate`]: true,
                [`${_.camelCase(item?.name)}Comment`]: true,
              }));

              setInterviewResultCategoriesRate((prev) => ({
                ...prev,
                [`${_.camelCase(item?.name)}Rate`]: 1,
              }));

              form.setFieldsValue({
                [`${_.camelCase(item?.name)}Rate`]: 1,
                [`${_.camelCase(item?.name)}Comment`]: '-',
              });
            } else {
              setIsInterviewResultCategoryDisabled((prev) => ({
                ...prev,
                [`${_.camelCase(item?.name)}Rate`]: false,
                [`${_.camelCase(item?.name)}Comment`]: false,
              }));

              if (
                item?.interviewResultCategories &&
                item?.interviewResultCategories?.length
              ) {
                item?.interviewResultCategories?.map((data: {} | any) => {
                  setInterviewResultCategoriesRate((prev) => ({
                    ...prev,
                    [`${_.camelCase(item?.name)}Rate`]: data?.score ?? 0,
                  }));

                  form.setFieldsValue({
                    [`${_.camelCase(item?.name)}Rate`]: data?.score ?? 0,
                    [`${_.camelCase(item?.name)}Comment`]:
                      data?.comment ?? null,
                  });
                });
              } else {
                setInterviewResultCategoriesRate((prev) => ({
                  ...prev,
                  [`${_.camelCase(item?.name)}Rate`]: 0,
                }));

                form.setFieldsValue({
                  [`${_.camelCase(item?.name)}Rate`]: 0,
                  [`${_.camelCase(item?.name)}Comment`]: null,
                });
              }
            }
          },
        );
      }

      form.setFieldsValue({
        status: interviewResultData?.interviewResultData?.statusName,
        reason: interviewResultData?.interviewResultData?.reason,
        rescheduler:
          interviewResultData?.interviewResultData?.statusName === 'Reschedule'
            ? interviewResultData?.interviewResultData?.candidateReschedulerId
              ? `${interviewResultData?.interviewResultData?.candidateReschedulerId}#candidate`
              : `${interviewResultData?.interviewResultData?.userReschedulerNIK}#user`
            : null,
      });

      handleInterviewResultStatus(
        interviewResultData?.interviewResultData?.statusName,
      );
    }
  }, [interviewResultData]);

  const handleInterviewModal = () => {
    setIsOpenModal(true);
  };

  const handleRatingClick = (index: number, value: number) => {
    let stateChanged = [...rating];
    stateChanged[index] = value;
    setRating(stateChanged);
  };

  function handleRateChange(name: string, value: number) {
    form.setFieldValue(name, value);

    setInterviewResultCategoriesRate((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleInterviewResultStatus(status: string | any) {
    // console.log('radio checked', e.target.value);

    const value = interviewResultData?.interviewResultStatus?.findIndex(
      (item: {} | any) => item?.name === status,
    );

    setInterviewResultStatusValue(value);

    if (
      interviewResultData?.interviewResultCategories &&
      interviewResultData?.interviewResultCategories?.length
    ) {
      interviewResultData?.interviewResultCategories?.map((item: {} | any) => {
        // console.info(item);

        if (
          interviewResultData?.interviewResultStatus[value]?.name ===
          'Reschedule'
        ) {
          setIsInterviewResultCategoryDisabled((prev) => ({
            ...prev,
            [`${_.camelCase(item?.name)}Rate`]: true,
            [`${_.camelCase(item?.name)}Comment`]: true,
          }));

          setInterviewResultCategoriesRate((prev) => ({
            ...prev,
            [`${_.camelCase(item?.name)}Rate`]: 1,
          }));

          form.setFieldsValue({
            [`${_.camelCase(item?.name)}Rate`]: 1,
            [`${_.camelCase(item?.name)}Comment`]: '-',
          });
        } else {
          setIsInterviewResultCategoryDisabled((prev) => ({
            ...prev,
            [`${_.camelCase(item?.name)}Rate`]: false,
            [`${_.camelCase(item?.name)}Comment`]: false,
          }));

          if (
            item?.interviewResultCategories &&
            item?.interviewResultCategories?.length
          ) {
            item?.interviewResultCategories?.map((data: {} | any) => {
              if (
                interviewResultData?.interviewResultData &&
                !_.isEmpty(interviewResultData?.interviewResultData)
              ) {
                if (
                  interviewResultData?.interviewResultData?.statusName ===
                  'Reschedule'
                ) {
                  setInterviewResultCategoriesRate((prev) => ({
                    ...prev,
                    [`${_.camelCase(item?.name)}Rate`]: 0,
                  }));

                  form.setFieldsValue({
                    [`${_.camelCase(item?.name)}Rate`]: 0,
                    [`${_.camelCase(item?.name)}Comment`]: null,
                  });
                } else {
                  setInterviewResultCategoriesRate((prev) => ({
                    ...prev,
                    [`${_.camelCase(item?.name)}Rate`]: data?.score ?? 0,
                  }));

                  form.setFieldsValue({
                    [`${_.camelCase(item?.name)}Rate`]: data?.score ?? 0,
                    [`${_.camelCase(item?.name)}Comment`]:
                      data?.comment ?? null,
                  });
                }
              }
            });
          } else {
            setInterviewResultCategoriesRate((prev) => ({
              ...prev,
              [`${_.camelCase(item?.name)}Rate`]: 0,
            }));

            form.setFieldsValue({
              [`${_.camelCase(item?.name)}Rate`]: 0,
              [`${_.camelCase(item?.name)}Comment`]: null,
            });
          }
        }

        // if (
        //   item?.interviewResultCategories &&
        //   item?.interviewResultCategories?.length
        // ) {
        //   item?.interviewResultCategories?.map((data: {} | any) => {
        //     setInterviewResultCategoriesRate((prev) => ({
        //       ...prev,
        //       [`${_.camelCase(data?.categoryName)}Rate`]: 1,
        //     }));

        //     form.setFieldsValue({
        //       [`${_.camelCase(data?.categoryName)}Rate`]: 1,
        //       [`${_.camelCase(data?.categoryName)}Comment`]: '-',
        //     });
        //   });
        // }
      });
    }
  }

  function handleSubmit(values: any) {
    setLoading(true);

    confirm({
      ...confirmations.submitConfirmation('interviewResult', formMode),
      onOk() {
        return new Promise<void>((resolve, reject) => {
          setTimeout(async () => {
            const validate = await submitInterviewResult(
              params,
              searchParams,
              values,
            );

            if (validate?.success) {
              messages.success(api, validate?.message);

              resolve(
                new Promise<void>((resolve) => {
                  setTimeout(() => resolve(router.back()), 1000);
                }),
              );
            } else {
              messages.error(api, validate?.message);

              form.resetFields();

              router.refresh();

              resolve(setLoading(false));
            }
          }, 2000);
        }).catch((e) =>
          console.log(
            `Failed ${formMode} Interview Result For This Candidate: `,
            e,
          ),
        );
      },
      onCancel() {
        router.refresh();

        setLoading(false);
      },
    });

    // showModal();
    // let values = form.getFieldsValue();
    // values = {
    //   ...values,
    //   resultInfo: { ...values.resultInfo, scoreTotal: scoreTotal },
    // };

    // insertInterviewResult(params, searchParams, values);
  }

  // function onFinishFailed(errorInfo: {} | any) {
  //   if (errorInfo.errorFields && errorInfo.errorFields.length > 0) {
  //     const errorMessage = errorInfo.errorFields
  //       .map((field: any) => field.errors.join(', '))
  //       .join('; ');
  //     message.error(`Failed: ${errorMessage}`);
  //   }
  // }

  useEffect(() => {
    console.log('ratingUseEffect: ', rating);
  }, [rating]);

  return (
    <>
      {isOpenModal && (
        <InterviewHistoryModal
          isOpen={isOpenModal}
          setIsOpenModal={setIsOpenModal}
          interviewHistoryData={interviewResultData?.interviewHistoryData}
        />
      )}

      <div className="job-fpk-header mb-40 lg-mb-30">
        <div className="d-sm-flex align-items-start justify-content-between mb-40 lg-mb-30">
          <h2 className="main-title m0 flex-grow-1">Interview Report Form</h2>
        </div>
      </div>
      <div className="bg-white card-box border-20">
        <div className="row">
          <div className="col-12 d-flex justify-content-end mb-10">
            <Button type="primary" onClick={handleInterviewModal}>
              Interview History
            </Button>
          </div>

          <div className="col-6">
            <div className="row">
              <div className="col-6">
                <div className="input-group-meta position-relative mb-15">
                  <label>Name: </label>
                  <p>{interviewResultData?.applicantName ?? '-'}</p>
                </div>
              </div>
              <div className="col-6">
                <div className="input-group-meta position-relative mb-15">
                  <label>Age: </label>
                  <p>{interviewResultData?.applicantAge ?? '-'}</p>
                </div>
              </div>
              <div className="col-6">
                <div className="input-group-meta position-relative mb-15">
                  <label>Marital Status: </label>
                  <p>{interviewResultData?.applicantMaritalStatus ?? '-'}</p>
                </div>
              </div>
              <div className="col-6">
                <div className="input-group-meta position-relative mb-15">
                  <label>Latest Education Level: </label>
                  <p>
                    {interviewResultData?.applicantLastEducationLevel ?? '-'}
                  </p>
                </div>
              </div>
              <div className="col-6">
                <div className="input-group-meta position-relative mb-15">
                  <label>Latest Position Level: </label>
                  <p>
                    {interviewResultData?.applicantLastPositionLevel ?? '-'}
                  </p>
                </div>
              </div>
              <div className="col-6">
                <div className="input-group-meta position-relative mb-15">
                  <label>Source: </label>
                  <p>{interviewResultData?.applicantSource ?? '-'}</p>
                </div>
              </div>
              <div className="col-6">
                <div className="input-group-meta position-relative mb-15">
                  <label>Assessment Result: </label>
                  <p>{interviewResultData?.applicantAssessmentResult ?? '-'}</p>
                </div>
              </div>
              <div className="col-6">
                <div className="input-group-meta position-relative mb-15">
                  <label>DISC Profile: </label>
                  <p>{interviewResultData?.applicantDiscProfile ?? '-'}</p>
                </div>
              </div>
            </div>

            <Form
              form={form}
              scrollToFirstError={true}
              onFinish={handleSubmit}
              // onFinishFailed={onFinishFailed}
            >
              <div className="row">
                {interviewResultData?.interviewResultCategories?.length &&
                  // interviewResultData?.interviewResultStatus[
                  //   interviewResultStatusValue
                  // ]?.name !== 'Reschedule' &&
                  interviewResultData?.interviewResultCategories?.map(
                    (item: {} | any, index: number) => {
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
                                      disabled={
                                        isInterviewResultCategoryDisabled[
                                          `${_.camelCase(item?.name)}Rate`
                                        ]
                                      }
                                      allowClear={true}
                                      onChange={(value) =>
                                        handleRateChange(
                                          `${_.camelCase(item?.name)}Rate`,
                                          value,
                                        )
                                      }
                                      value={
                                        interviewResultCategoriesRate[
                                          `${_.camelCase(item?.name)}Rate`
                                        ] ?? 0
                                      }
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
                                    disabled={
                                      isInterviewResultCategoryDisabled[
                                        `${_.camelCase(item?.name)}Comment`
                                      ]
                                    }
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
                          onChange={(e) =>
                            handleInterviewResultStatus(e.target.value)
                          }
                          value={
                            interviewResultData?.interviewResultStatus[
                              interviewResultStatusValue
                            ]?.name
                          }
                        >
                          {interviewResultData?.interviewResultStatus?.map(
                            (item: {} | any, index: number) => (
                              <Radio key={index} value={item?.name}>
                                {item?.name}
                              </Radio>
                            ),
                          )}
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
                    {formMode === 'create' ? 'Submit' : 'Update'}
                  </button>
                </div>
              </div>
            </Form>
          </div>

          {interviewResultData?.applicantCv && (
            <div className="col-6">
              <embed
                title="candidateCv"
                src={interviewResultData?.applicantCv}
                width="100%"
                height="28%"
                style={{ position: 'sticky', top: '90px' }}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default InterviewResultItem;
