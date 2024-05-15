'use client';
import React, { useState } from 'react';
import { useAppSelector } from '@/redux/hook';
import { useRouter } from 'next/navigation';
import AssessmentResultModal from '../../common/popup/assessment-result-modal';
import CreateInterviewModal from '../../common/popup/create-interview-modal';

const ActionApplicant = () => {
  const currentStep = useAppSelector((state) => state.applicantStep.step);
  const router = useRouter();
  const [isModalOpen, setModalOpen] = useState(false);
  const showModal = () => {
    setModalOpen(true);
  };

  const [resultModalState, setResultModalState] = useState(false);
  const showResultModal = () => {
    setResultModalState(true);
  };
  return (
    <>
      <ul className="dropdown-menu dropdown-menu-end">
        {currentStep === 4 && (
          <>
            <li>
              <a className="applicant-action" onClick={showResultModal}>
                View Result
              </a>
            </li>
            <li>
              <a
                className="applicant-action"
                onClick={() => {
                  router.push('');
                }}
              >
                Invite Assessment
              </a>
            </li>
            <li>
              <a
                className="applicant-action"
                onClick={() => {
                  router.push('');
                }}
              >
                Reschedule Assessment
              </a>
            </li>
            <li>
              <a className="applicant-action">Assign to Interview</a>
            </li>
          </>
        )}
        {currentStep === 5 && (
          <li>
            <a className="applicant-action" onClick={showModal}>
              Create Interview
            </a>
          </li>
        )}
        {currentStep === 7 && (
          <li>
            <a
              className="applicant-action"
              onClick={() => {
                router.push('/dashboard/ta/preview-page/create-offering');
              }}
            >
              Create Offering
            </a>
          </li>
        )}
        {currentStep < 4 && (
          <li>
            <a className="applicant-action">Assign to Assessment</a>
          </li>
        )}
        {currentStep < 5 && (
          <li>
            <a className="applicant-action">Assign to Interview</a>
          </li>
        )}
        {currentStep < 6 && (
          <li>
            <a className="applicant-action">Assign to Ref Check</a>
          </li>
        )}
        {currentStep < 7 && (
          <li>
            <a className="applicant-action">Assign to Offering</a>
          </li>
        )}
        {currentStep < 8 && (
          <li>
            <a className="applicant-action">Assign to MCU</a>
          </li>
        )}
        {currentStep < 9 && (
          <li>
            <a className="applicant-action">Assign to Agreement</a>
          </li>
        )}
        {currentStep < 10 && (
          <li>
            <a className="applicant-action">Assign to Boarding</a>
          </li>
        )}
        {currentStep < 11 && (
          <li>
            <a className="applicant-action">Reject</a>
          </li>
        )}
        {currentStep < 12 && (
          <li>
            <a className="applicant-action">Blacklist</a>
          </li>
        )}
      </ul>

      <AssessmentResultModal
        isOpen={resultModalState}
        setIsOpenModal={setResultModalState}
      />
      <CreateInterviewModal
        isOpen={isModalOpen}
        setIsOpenModal={setModalOpen}
      />
    </>
  );
};

export default ActionApplicant;
