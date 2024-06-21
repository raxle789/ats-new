'use client';
import React from 'react';
// import { handleApplicant } from '@/app/components/message/confirm';
import { Status } from '@/status/applicant-status';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
// import { useAppSelector } from '@/redux/hook';
// import { useRouter } from 'next/navigation';
// import CreateInterviewModal from '../app/components/common/popup/create-interview-modal';

const ActionApplicant = (props) => {
  const pathname = usePathname();
  const router = useRouter();
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
            {props?.status === Status?.INTERVIEW && props?.interviewId && (
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
            )}
          </>
        )}
        {props?.status !== Status?.INTERVIEW && (
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
        )}
        {props?.status !== Status?.ASSESSMENT && (
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
        )}
        {props?.status !== Status?.REFCHECK && (
          <li>
            <button
              className="applicant-action"
              type="button"
              onClick={() => {
                props?.handleApplicant(
                  'assignRefcheck',
                  props?.candidateId,
                  props?.jobVacancyId,
                  0,
                  props?.api,
                  props?.router,
                  props?.setLoading,
                  Status?.REFCHECK,
                );
              }}
            >
              Assign to Reference Check
            </button>
          </li>
        )}
        {props?.status === Status?.OFFERING && (
          <li>
            <button
              className="applicant-action"
              type="button"
              onClick={() => router.push(`${pathname}/create-offering`)}
            >
              Create Offering
            </button>
          </li>
        )}
        <li>
          <button
            className="applicant-action red-action"
            type="button"
            onClick={() => {
              props?.handleApplicant(
                'moveRejected',
                props?.candidateId,
                props?.jobVacancyId,
                0,
                props?.api,
                props?.router,
                props?.setLoading,
                Status?.REJECTED,
              );
            }}
          >
            Reject Candidate
          </button>
        </li>
        <li>
          <button
            className="applicant-action red-action"
            type="button"
            onClick={() => {
              props?.handleApplicant(
                'moveBlacklisted',
                props?.candidateId,
                props?.jobVacancyId,
                0,
                props?.api,
                props?.router,
                props?.setLoading,
                Status?.BLACKLISTED,
              );
            }}
          >
            Blacklist Candidate
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
