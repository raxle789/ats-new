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
        <a className="dropdown-item" href="#">
          <Image src={edit} alt="icon" className="lazy-img" /> View
        </a>
      </li>
      <li>
        <Link
          className="dropdown-item"
          href="#"
          onClick={() => handleJobVacancy('edit', jobId)}
        >
          <Image src={edit} alt="icon" className="lazy-img" /> Edit
        </Link>
      </li>
      <li>
        <Link
          className="dropdown-item"
          href="#"
          onClick={() => {
            handleJobVacancy('duplicate', jobId);
          }}
        >
          <Image src={edit} alt="icon" className="lazy-img" /> Duplicate
        </Link>
      </li>
      <li>
        <Link
          className="dropdown-item"
          href="#"
          onClick={() => handleJobVacancy('delete', jobId)}
        >
          <Image src={delete_icon} alt="icon" className="lazy-img" /> Delete
        </Link>
      </li>
    </ul>
  );
};

export default ActionJobVacancies;
