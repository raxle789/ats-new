'use client';
import React, { useState } from 'react';
import { useAppSelector } from '@/redux/hook';
import { useRouter } from 'next/navigation';
import CreateInterviewModal from '../../common/popup/create-interview-modal';

const ActionApplicant = () => {
  const currentStep = useAppSelector((state) => state.applicantStep.step);
  const router = useRouter();
  const [isModalOpen, setModalOpen] = useState(false);
  const showModal = () => {
    setModalOpen(true);
  };
  return (
    <>
      <ul className="dropdown-menu dropdown-menu-end">
        {currentStep === 'assessment' && (
          <>
            <li>
              <a
                className="applicant-action"
                onClick={() => {
                  router.push('/dashboard/ta/preview-page/assessment/review');
                }}
              >
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
        {currentStep === 'interview' && (
          <>
            <li>
              <a className="applicant-action" onClick={showModal}>
                Create Interview
              </a>
            </li>
          </>
        )}
        {currentStep === 'initial' && (
          <>
            <li>
              <a className="applicant-action">Assign to Assessment</a>
            </li>
            <li>
              <a className="applicant-action">Assign to Interview</a>
            </li>
          </>
        )}
        <li>
          <a className="applicant-action">Assign to Offering</a>
        </li>
        <li>
          <a className="applicant-action">Assign to Ref Check</a>
        </li>
        <li>
          <a className="applicant-action">Assign to Agreement</a>
        </li>
        <li>
          <a className="applicant-action">Assign to Boarding</a>
        </li>
        <li>
          <a className="applicant-action">Reject</a>
        </li>
        <li>
          <a className="applicant-action">Blacklist</a>
        </li>
      </ul>

      <CreateInterviewModal
        isOpen={isModalOpen}
        setIsOpenModal={setModalOpen}
      />
    </>
  );
};

export default ActionApplicant;
