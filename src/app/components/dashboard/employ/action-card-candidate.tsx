'use client';
import React, { useState } from 'react';
import { useAppSelector } from '@/redux/hook';
import { useRouter } from 'next/navigation';
import CreateInterviewModal from '../../common/popup/create-interview-modal';

const ActionCandidate = () => {
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
          <a className="applicant-action">Assign to Job</a>
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
