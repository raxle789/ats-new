import React from 'react';
// import Link from 'next/link';
import { HiOutlineEye } from 'react-icons/hi';
import { FiEdit } from 'react-icons/fi';
import { IoDuplicateOutline } from 'react-icons/io5';
import { AiOutlineDelete } from 'react-icons/ai';
// import JobDetails from '@/app/(pages)/main/jobs/[id]/page';

type Props = {
  jobId?: string | any;
  setLoading?: React.Dispatch<boolean>;
  handleJobVacancy?: any;
};

const ActionJobVacancies: React.FC<Props> = ({
  jobId,
  setLoading,
  handleJobVacancy,
}) => {
  return (
    <ul className="dropdown-menu dropdown-menu-end">
      <li>
        <button
          className="dropdown-item"
          type="button"
          onClick={() => handleJobVacancy('view', jobId)}
        >
          <HiOutlineEye className="me-1" style={{ fontSize: '16px' }} /> View
        </button>
      </li>
      <li>
        <button
          className="dropdown-item"
          type="button"
          onClick={() => handleJobVacancy('edit', jobId)}
        >
          <FiEdit className="me-1" style={{ fontSize: '15px' }} /> Edit
        </button>
      </li>
      <li>
        <button
          className="dropdown-item"
          type="button"
          onClick={() => {
            handleJobVacancy('duplicate', jobId);
          }}
        >
          <IoDuplicateOutline className="me-1" style={{ fontSize: '15px' }} />{' '}
          Duplicate
        </button>
      </li>
      <li>
        <button
          className="dropdown-item"
          type="button"
          onClick={() => handleJobVacancy('delete', jobId)}
        >
          <AiOutlineDelete className="me-1" style={{ fontSize: '16px' }} />{' '}
          Delete
        </button>
      </li>
    </ul>
  );
};

export default ActionJobVacancies;
