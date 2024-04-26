import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { useRouter } from 'next/navigation';
import CreateInterviewModal from '../../common/popup/create-interview-modal';
import { setIsOpen } from '@/redux/features/createInterviewSlice';

const ActionApplicant = () => {
  const dispatch = useAppDispatch();
  const currentStep = useAppSelector((state) => state.applicantStep.step);
  const isModalOpen = useAppSelector(
    (state) => state.createInterviewModal.isOpen,
  );
  const router = useRouter();
  const showModal = () => {
    dispatch(setIsOpen(!isModalOpen));
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

      <CreateInterviewModal />
    </>
  );
};

export default ActionApplicant;
