'use client';

import React, { useState } from 'react';
import { handleApplicant } from '@/app/components/message/confirm';
import { Status } from '@/status/applicant-status';
import { useAppSelector } from '@/redux/hook';
import { useRouter } from 'next/navigation';
import CreateInterviewModal from '../app/components/common/popup/create-interview-modal';

const ActionApplicant = (props) => {
  // const currentStep = useAppSelector((state) => state.applicantStep.step);

  // const [isModalOpen, setIsOpenModal] = useState(false);

  return (
    <>
      <ul className="dropdown-menu dropdown-menu-end">
        <li>
          <button
            className="applicant-action"
            type="button"
            onClick={() => props.setIsOpenModal(true)}
          >
            View Details
          </button>
        </li>
        <li>
          <button
            className="applicant-action"
            type="button"
            onClick={() => props.setIsOpenModal(true)}
          >
            Create Interview
          </button>
        </li>
        <li>
          <button
            className="applicant-action"
            type="button"
            onClick={() => {
              props.handleApplicant(
                'assignInterview',
                props.candidateId,
                props.jobVacancyId,
                props.api,
                props.router,
                props.setLoading,
                Status.INTERVIEW,
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
              props.handleApplicant(
                'assignAssessment',
                props.candidateId,
                props.jobVacancyId,
                props.api,
                props.router,
                props.setLoading,
                Status.ASSESSMENT,
              );
            }}
          >
            Assign to Assessment
          </button>
        </li>
        <li>
          <a className="applicant-action">Blacklist</a>
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
