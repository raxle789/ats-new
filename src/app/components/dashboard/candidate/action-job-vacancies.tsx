import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import edit from '@/assets/dashboard/images/icon/icon_20.svg';
import delete_icon from '@/assets/dashboard/images/icon/icon_21.svg';
import JobDetails from '@/app/(pages)/main/jobs/[id]/page';

const ActionJobVacancies = ({ jobId, setLoading, handleJobVacancy }) => {
  return (
    <ul className="dropdown-menu dropdown-menu-end">
      <li>
        <button
          className="dropdown-item"
          type="button"
          onClick={() => handleJobVacancy('view', jobId)}
        >
          <Image src={edit} alt="icon" className="lazy-img" /> View
        </button>
      </li>
      <li>
        <button
          className="dropdown-item"
          type="button"
          onClick={() => handleJobVacancy('edit', jobId)}
        >
          <Image src={edit} alt="icon" className="lazy-img" /> Edit
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
          <Image src={edit} alt="icon" className="lazy-img" /> Duplicate
        </button>
      </li>
      <li>
        <button
          className="dropdown-item"
          type="button"
          onClick={() => handleJobVacancy('delete', jobId)}
        >
          <Image src={delete_icon} alt="icon" className="lazy-img" /> Delete
        </button>
      </li>
    </ul>
  );
};

export default ActionJobVacancies;
