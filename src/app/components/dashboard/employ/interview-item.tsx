'use client';

import React, { SetStateAction, useState } from 'react';
import * as messages from '@/utils/message';
import * as confirmations from '@/utils/confirmation';
import moment from 'moment';
import img_2 from '@/assets/images/candidates/img_02.jpg';
import CreateInterviewModal from '../../common/popup/create-interview-modal';
import ActionApplicant from '../../../../ui/action-card-applicant';
import { ICandidate } from '@/data/candidate-data';
import Image from 'next/image';
import { Tag, Modal, Select, Checkbox, Button } from 'antd';
import CandidateDetailsModal from '../../common/popup/candidate-details-modal';

const { confirm } = Modal;

// type TSub = {
//   name: string;
//   status: string;
// };

// type TInterviewer = {
//   [key: string]: {
//     date: string;
//     names: TSub[];
//   };
// };

// const interview: TInterviewer = {
//   interview1: {
//     date: '20-04-2023',
//     names: [
//       { name: 'Gusti', status: 'Hire' },
//       { name: 'Vladimir', status: 'Reject' },
//       { name: 'Gusti', status: 'Keep In View' },
//     ],
//   },
//   interview2: {
//     date: '14-04-2023',
//     names: [
//       { name: 'Aji', status: 'Waiting' },
//       { name: 'Vladimir', status: 'Waiting' },
//     ],
//   },
//   interview3: {
//     date: '10-04-2023',
//     names: [{ name: 'Gusti', status: 'Keep In View' }],
//   },
// };

const InterviewItem = ({
  item,
  status,
  checkboxState,
  checkboxAllValue,
  setCheckbox,
  setCheckboxAllValue,
  jobVacancyId,
  api,
  router,
  setLoading,
  handleApplicant,
  typeData,
  interviewerData,
  messageTemplateData,
  placeData,
  insertInterview,
  resendEmail,
}) => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const showModal = () => {
    setIsOpenModal(true);
  };

  const [interviewValue, setInterviewValue] = useState(0);

  const [buttonDisabled, setButtonDisabled] = useState({});

  const handleInterviewChange = (value) => {
    setInterviewValue(
      item?.candidateInterviews?.findIndex((data) => data?.value === value),
    );
  };

  const onChangeCheckbox = (index: number) => {
    setCheckbox((prevState: any) => ({
      ...prevState,
      [index]: !prevState[index],
    }));

    if (checkboxAllValue || !checkboxState[index]) {
      setCheckboxAllValue(false);
    }
  };

  function handleResendEmail(
    handleType: 'candidate' | 'interviewer',
    interviewId,
    interviewerNik = '',
  ) {
    setLoading(true);

    if (handleType === 'candidate') {
      setButtonDisabled((prevState) => ({
        ...prevState,
        [`candidate${interviewId}`]: true,
      }));

      confirm({
        ...confirmations.resendEmailConfirmation('candidate'),
        onOk() {
          return new Promise<void>((resolve, reject) => {
            setTimeout(async () => {
              const validate = await resendEmail('candidate', interviewId);

              if (validate?.success) {
                messages.success(
                  api,
                  `${validate?.message} to ${validate?.name} (${validate?.role})`,
                );

                // router.refresh();

                resolve(setLoading(false));
              } else {
                messages.error(
                  api,
                  `${validate?.message} to ${validate?.name} (${validate?.role})`,
                );

                // router.refresh();

                resolve(
                  new Promise((resolve, reject) => {
                    setButtonDisabled((prevState) => ({
                      ...prevState,
                      [`candidate${interviewId}`]: false,
                    }));

                    resolve(setLoading(false));
                  }),
                );
              }
            }, 2000);
          }).catch((e) => console.log('Failed Resend Email to Candidate', e));
        },
        onCancel() {
          // router.refresh();

          setLoading(false);

          setButtonDisabled((prevState) => ({
            ...prevState,
            [`candidate${interviewId}`]: false,
          }));
        },
      });
    } else if (handleType === 'interviewer') {
      setButtonDisabled((prevState) => ({
        ...prevState,
        [`interviewer${interviewerNik}`]: true,
      }));

      confirm({
        ...confirmations.resendEmailConfirmation('interviewer'),
        onOk() {
          return new Promise<void>((resolve, reject) => {
            setTimeout(async () => {
              const validate = await resendEmail(
                'interviewer',
                interviewId,
                interviewerNik,
              );

              if (validate?.success) {
                messages.success(
                  api,
                  `${validate?.message} to ${validate?.name} (${validate?.role})`,
                );

                // router.refresh();

                // resolve(setLoading(false));

                resolve(
                  new Promise((resolve, reject) => {
                    setTimeout(() => {
                      setButtonDisabled((prevState) => ({
                        ...prevState,
                        [`interviewer${interviewerNik}`]: false,
                      }));

                      resolve(setLoading(false));
                    }, 2000);
                  }),
                );
              } else {
                messages.error(api, validate?.message);

                // router.refresh();

                resolve(
                  new Promise((resolve, reject) => {
                    setTimeout(() => {
                      setButtonDisabled((prevState) => ({
                        ...prevState,
                        [`interviewer${interviewerNik}`]: false,
                      }));

                      resolve(setLoading(false));
                    }, 2000);

                    // setButtonDisabled((prevState) => ({
                    //   ...prevState,
                    //   [`interviewer${interviewerNik}`]: false,
                    // }));

                    // resolve(setLoading(false));
                  }),
                );
              }
            }, 2000);
          }).catch((e) =>
            console.log('Failed to Resend This Email to Interviewer', e),
          );
        },
        onCancel() {
          // router.refresh();

          setLoading(false);

          setButtonDisabled((prevState) => ({
            ...prevState,
            [`interviewer${interviewerNik}`]: false,
          }));
        },
      });
    }
  }

  return (
    <>
      {isOpenModal && (
        <CreateInterviewModal
          isOpenModal={isOpenModal}
          router={router}
          api={api}
          setLoading={setLoading}
          setIsOpenModal={setIsOpenModal}
          typeData={typeData}
          interviewerData={interviewerData}
          messageTemplateData={messageTemplateData}
          placeData={placeData}
          insertInterview={insertInterview}
          candidateId={item?.candidateId}
          jobVacancyId={jobVacancyId}
          candidateName={item?.candidateName}
          jobTitleAliases={item?.jobTitleAliases}
        />
      )}

      <div className="candidate-profile-card list-layout border-0 mb-25">
        <div className="d-flex">
          <div className="cadidate-avatar online position-relative d-block me-auto ms-auto mt-auto mb-auto">
            <div className="checkbox-pipeline-action">
              <Checkbox
                className="me-2"
                checked={checkboxState[item.id]}
                onChange={() => onChangeCheckbox(item.id)}
              ></Checkbox>
            </div>
            <a href="#" className="rounded-circle">
              <Image
                src={item?.candidatePhoto ?? img_2}
                alt="image"
                className="lazy-img rounded-circle"
                width="80"
                height="80"
                // style={{ width: '80', height: '80' }}
              />
            </a>
          </div>
          <div className="right-side">
            <div className="row gx-1 align-items-start">
              <div className="col-lg-3">
                <div className="position-relative mt-1">
                  <h4 className="candidate-name mb-0">
                    <a
                      className="tran3s"
                      style={{ cursor: 'pointer' }}
                      onClick={showModal}
                    >
                      {item?.candidateName ?? '-'}
                    </a>
                  </h4>
                  <div className="candidate-info mt-2 mb-4">
                    <span>Last Position</span>
                    <div>{item?.candidateLastPosition ?? '-'}</div>
                  </div>
                  <div className="candidate-info mt-5 mb-65">
                    <ul className="candidate-skills style-none d-flex align-items-center">
                      {item?.candidateSkills
                        ? item?.candidateSkills
                            .slice(0, 4)
                            .map((s, i) => <li key={i}>{s}</li>)
                        : null}
                      {item?.candidateSkills?.length > 4 && (
                        <li className="more">
                          {item?.candidateSkills?.length -
                            item?.candidateSkills?.slice(0, 4).length}
                          +
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-6">
                <div className="candidate-info">
                  <span>Interview Title</span>
                  <div>
                    {item?.candidateInterviews?.length ? (
                      <Select
                        defaultValue={
                          item?.candidateInterviews[interviewValue]?.value
                        }
                        style={{ width: '230px' }}
                        onChange={handleInterviewChange}
                        options={item?.candidateInterviews}
                      />
                    ) : (
                      <Select
                        defaultValue={0}
                        style={{ width: '230px' }}
                        options={[{ label: 'No Interview', value: 0 }]}
                        disabled={true}
                      />
                    )}
                  </div>
                </div>
                <div className="candidate-info mt-2">
                  <span>Date</span>
                  <div>
                    {item?.candidateInterviews?.length
                      ? moment(
                          item?.candidateInterviews[interviewValue]?.dateTime,
                          'YYYY-MM-DD HH:mm:ss',
                        ).format('DD-MMM-YYYY HH:mm:ss')
                      : '-'}
                  </div>
                </div>
                {/* <div className="candidate-info mt-2">
                  <div>
                    {item?.candidateInterviews?.length &&
                    !item?.candidateInterviews[interviewValue]?.isEmailSent ? (
                      <Button
                        disabled={
                          buttonDisabled[
                            `candidate${item?.candidateInterviews[interviewValue]?.value}`
                          ]
                        }
                        onClick={() =>
                          handleResendEmail(
                            'candidate',
                            item?.candidateInterviews[interviewValue]?.value,
                          )
                        }
                      >
                        Resend Interview Invitation to Candidate
                      </Button>
                    ) : (
                      <></>
                    )}
                  </div>
                </div> */}
              </div>
              <div className="col-lg-4 col-md-4 col-sm-6">
                <div className="candidate-info">
                  <span>Interviewer</span>
                  <div>
                    {item?.candidateInterviews?.length &&
                      item?.candidateInterviews[
                        interviewValue
                      ]?.interviewers?.map((data, index) => (
                        <div key={index} className="row">
                          <div className="col-lg-9">
                            <p className="d-inline me-3">
                              {data?.interviewerName}
                            </p>
                          </div>
                          <div className="col-lg-3">
                            {!data?.interviewResult && (
                              <Tag color="#1e87f0" style={{ color: 'white' }}>
                                Waiting
                              </Tag>
                            )}
                            {data?.interviewResult === 'Hire' && (
                              <Tag color="#29d259" style={{ color: 'white' }}>
                                Hire
                              </Tag>
                            )}
                            {data?.interviewResult === 'Reject' && (
                              <Tag color="#ff2730" style={{ color: 'white' }}>
                                Reject
                              </Tag>
                            )}
                            {data?.interviewResult === 'Keep In View' && (
                              <Tag color="#f0f000" style={{ color: 'white' }}>
                                Keep In View
                              </Tag>
                            )}
                            {
                              /* {!data?.isEmailSent &&  */
                              <Button
                                disabled={
                                  buttonDisabled[
                                    `interviewer${data?.interviewerNik}`
                                  ]
                                }
                                onClick={() =>
                                  handleResendEmail(
                                    'interviewer',
                                    item?.candidateInterviews[interviewValue]
                                      ?.value,
                                    data?.interviewerNik,
                                  )
                                }
                              >
                                Resend Interview Invitation
                              </Button>
                            }
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
              <div className="col-xl-1 col-md-4">
                <div className="d-flex justify-content-md-end align-items-center">
                  <div className="action-dots float-end mt-10 ms-2">
                    <button
                      className="action-btn dropdown-toggle"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <span>
                        <ActionApplicant
                          status={status}
                          candidateId={item?.candidateId}
                          jobVacancyId={jobVacancyId}
                          interviewId={
                            item?.candidateInterviews[interviewValue]?.value
                          }
                          api={api}
                          router={router}
                          setLoading={setLoading}
                          handleApplicant={handleApplicant}
                          setIsOpenModal={setIsOpenModal}
                        />
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <ActionApplicant
            status={status}
            candidateId={item?.candidateId}
            jobVacancyId={jobVacancyId}
            api={api}
            router={router}
            setLoading={setLoading}
            handleApplicant={handleApplicant}
            setIsOpenModal={setIsOpenModal}
          /> */}
      </div>
    </>
  );
};

export default InterviewItem;
