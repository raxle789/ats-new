'use client';
import React, { useState } from 'react';
import { Status } from '@/status/applicant-status';
import { useAppSelector } from '@/redux/hook';
import { useRouter } from 'next/navigation';
import CreateInterviewModal from '../../common/popup/create-interview-modal';

const ActionCandidate = ({ status, candidateId }) => {
  const currentStep = useAppSelector((state) => state.applicantStep.step);

  const router = useRouter();

  const [isModalOpen, setModalOpen] = useState(false);

  const showModal = () => {
    setModalOpen(true);
  };

  return (
    <>
      <ul className="dropdown-menu dropdown-menu-end">
        <li>
          <a className="applicant-action">View Details</a>
        </li>
        <li>
          <button className="applicant-action" type="button" onClick={() => {}}>
            Assign to Assessment
          </button>
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

export default ActionCandidate;
