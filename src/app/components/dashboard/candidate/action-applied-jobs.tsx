import React from 'react';
import Link from 'next/link';
import { HiOutlineEye } from 'react-icons/hi';

const ActionAppliedJobs = () => {
  return (
    <ul className="dropdown-menu dropdown-menu-end">
      <li>
        <Link className="dropdown-item" href="#">
          <HiOutlineEye className="me-1" style={{ fontSize: '16px' }} /> View
          Jobs
        </Link>
      </li>
    </ul>
  );
};

export default ActionAppliedJobs;
