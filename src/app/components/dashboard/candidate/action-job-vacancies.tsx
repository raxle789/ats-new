import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import edit from '@/assets/dashboard/images/icon/icon_20.svg';
import delete_icon from '@/assets/dashboard/images/icon/icon_21.svg';

const ActionJobVacancies = ({ jobId, setLoading }) => {
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
          href={{
            pathname: `/dashboard/ta/submit-job/${jobId}}`,
          }}
          onClick={() => setLoading(true)}
        >
          <Image src={edit} alt="icon" className="lazy-img" /> Edit
        </Link>
      </li>
      <li>
        <a className="dropdown-item" href="#">
          <Image src={edit} alt="icon" className="lazy-img" /> Duplicate
        </a>
      </li>
      <li>
        <a className="dropdown-item" href="#">
          <Image src={delete_icon} alt="icon" className="lazy-img" /> Delete
        </a>
      </li>
    </ul>
  );
};

export default ActionJobVacancies;
