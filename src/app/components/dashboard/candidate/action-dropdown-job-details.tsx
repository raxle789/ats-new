import React from 'react';
import { HiOutlineEye } from 'react-icons/hi';
import { FiEdit } from 'react-icons/fi';

const ActionDropdownJobDetails = () => {
  return (
    <ul className="dropdown-menu dropdown-menu-end">
      <li>
        <button
          className="dropdown-item"
          type="button"
          // onClick={() => handleJobVacancy('view', jobId)}
        >
          <HiOutlineEye className="me-1" style={{ fontSize: '16px' }} /> View
        </button>
      </li>
      <li>
        <button
          className="dropdown-item"
          type="button"
          // onClick={() => handleJobVacancy('view', jobId)}
        >
          <FiEdit className="me-1" style={{ fontSize: '16px' }} /> Edit
        </button>
      </li>
    </ul>
  );
};

export default ActionDropdownJobDetails;
