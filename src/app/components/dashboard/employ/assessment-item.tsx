'use client';
import React, { SetStateAction } from 'react';
import AssessmentResultModal from '../../common/popup/assessment-result-modal';
import { useState } from 'react';
import img_2 from '@/assets/images/candidates/img_02.jpg';
import ActionApplicant from '../../../../ui/action-card-applicant';
import Image from 'next/image';
// import { useAppDispatch } from '@/redux/hook';
// import { setIsOpen } from '@/redux/features/candidateDetailsSlice';
import { Checkbox } from 'antd';

type Props = {
  item?:
    | {
        candidateId?: string;
        candidatePhoto?: string;
        candidateName?: string;
        candidateLastPosition?: string;
        candidateLastEducation?: string;
        candidateExpectedSalary?: string;
        candidateYearOfExperience?: number;
        candidateStatus?: string;
        candidateSkills?: string[];
        candidateScore?: string;
      }
    | any;
  status?: string | any;
  checkboxState?: { [key: string]: boolean };
  checkboxAllValue?: boolean;
  setCheckbox?: React.Dispatch<SetStateAction<{ [key: string]: boolean }>>;
  setCheckboxAllValue?: React.Dispatch<boolean>;
  jobVacancyId?: number | any;
  api?: any;
  router?: any;
  setLoading?: any;
  handleApplicant?: (
    handleType:
      | 'assignAssessment'
      | 'detailAssessment'
      | 'resendAssessment'
      | 'assignInterview'
      | 'resendCandidateInterviewInvitation',
    candidateId: number,
    jobVacancyId: number | any,
    interviewId: number | null,
    api: any,
    router: any,
    setLoading: (loading: boolean) => void,
    status: string,
  ) => void | any;
};

const AssessmentItem: React.FC<Props> = ({
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
}) => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const onChangeCheckbox = (index: string) => {
    if (setCheckbox && setCheckboxAllValue && checkboxState) {
      setCheckbox((prevState: any) => ({
        ...prevState,
        [index]: !prevState[index],
      }));

      if (checkboxAllValue || !checkboxState[index]) {
        setCheckboxAllValue(false);
      }
    }
  };

  function showModal() {}

  return (
    <>
      {isOpenModal && (
        <AssessmentResultModal
          isOpenModal={isOpenModal}
          setIsOpenModal={setIsOpenModal}
          item={item}
        />
      )}

      <div className="candidate-profile-card list-layout border-0 mb-25">
        <div className="d-flex">
          <div className="cadidate-avatar online position-relative d-block me-auto ms-auto mt-auto mb-auto">
            <div className="checkbox-pipeline-action">
              <Checkbox
                className="me-2"
                checked={checkboxState && checkboxState[item?.candidateId]}
                onChange={() => onChangeCheckbox(item?.candidateId)}
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
                  {/* <div className="candidate-info mt-5">
                    <ul className="candidate-skills style-none d-flex align-items-center">
                      {item?.candidateSkills
                        ? item?.candidateSkills
                            .slice(0, 4)
                            .map((s: string, i: number) => <li key={i}>{s}</li>)
                        : null}
                      {item?.candidateSkills?.length > 4 && (
                        <li className="more">
                          {item?.candidateSkills?.length -
                            item?.candidateSkills?.slice(0, 4).length}
                          +
                        </li>
                      )}
                    </ul>
                  </div> */}
                </div>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-6">
                <div className="candidate-info">
                  <span>Start Test</span>
                  <div>{item?.candidateAssessmentStartDate ?? '-'}</div>
                </div>
                <div className="candidate-info mt-2">
                  <span>End Test</span>
                  <div>{item?.candidateAssessmentFinishedDate ?? '-'}</div>
                </div>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-6">
                <div className="candidate-info">
                  <span>Test Name</span>
                  <div>{item?.candidateAssessmentTestName ?? '-'}</div>
                </div>
                <div className="candidate-info mt-2">
                  <span>Status</span>
                  <div>{item?.candidateAssessmentStatus ?? '-'}</div>
                </div>
                {/* <div className="candidate-info mt-2">
                <span>Score</span>
                <div>{item?.candidateScore ?? '-'}</div>
              </div> */}
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
      </div>
    </>
  );
};

export default AssessmentItem;
