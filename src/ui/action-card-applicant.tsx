'use client';
import React from 'react';
// import { handleApplicant } from '@/app/components/message/confirm';
import { Status } from '@/status/applicant-status';
// import { useAppSelector } from '@/redux/hook';
// import { useRouter } from 'next/navigation';
// import CreateInterviewModal from '../app/components/common/popup/create-interview-modal';

type ActionProp = {
  props?: any;
};

const ActionApplicant = (props) => {
  // const currentStep = useAppSelector((state) => state.applicantStep.step);

  // const [isModalOpen, setIsOpenModal] = useState(false);

  return (
    <>
      <ul className="dropdown-menu dropdown-menu-end">
        {props?.status === Status?.ASSESSMENT && (
          <>
            <li>
              <button
                className="applicant-action"
                type="button"
                onClick={() => props?.setIsOpenModal(true)}
              >
                View Assessment Detail
              </button>
            </li>
            <li>
              <button
                className="applicant-action"
                type="button"
                onClick={() => {
                  props?.handleApplicant(
                    'resendAssessment',
                    props?.candidateId,
                    props?.jobVacancyId,
                    0,
                    props?.api,
                    props?.router,
                    props?.setLoading,
                    Status?.ASSESSMENT,
                  );
                }}
              >
                Resend Assessment
              </button>
            </li>
          </>
        )}
        {props?.status === Status?.INTERVIEW && (
          <>
            <li>
              <button
                className="applicant-action"
                type="button"
                onClick={() => props?.setIsOpenModal(true)}
              >
                Create Interview
              </button>
            </li>
            <li>
              <button
                className="applicant-action"
                type="button"
                onClick={() => {
                  props?.handleApplicant(
                    'resendCandidateInterviewInvitation',
                    '',
                    '',
                    props?.interviewId,
                    props?.api,
                    props?.router,
                    props?.setLoading,
                    Status?.INTERVIEW,
                  );
                }}
              >
                Resend Interview Invitation to Candidate
              </button>
            </li>
          </>
        )}
        <li>
          <button
            className="applicant-action"
            type="button"
            onClick={() => {
              props?.handleApplicant(
                'assignInterview',
                props?.candidateId,
                props?.jobVacancyId,
                0,
                props?.api,
                props?.router,
                props?.setLoading,
                Status?.INTERVIEW,
              );
            }}
          >
            Assign to Interview
          </button>
        </li>
        <li>
          <button
            className="applicant-action"
            type="button"
            onClick={() => {
              props?.handleApplicant(
                'assignAssessment',
                props?.candidateId,
                props?.jobVacancyId,
                0,
                props?.api,
                props?.router,
                props?.setLoading,
                Status?.ASSESSMENT,
              );
            }}
          >
            Assign to Assessment
          </button>
        </li>
        <li>
          <button className="applicant-action" type="button">
            Blacklist
          </button>
        </li>
      </ul>

      {/* <CreateInterviewModal
        isOpen={isModalOpen}
        setIsOpenModal={setModalOpen}
      /> */}
    </>
  );
};

export default ActionApplicant;
