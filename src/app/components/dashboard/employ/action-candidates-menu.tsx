'use client';
import React, { useState } from 'react';
import { Status } from '@/status/applicant-status';

const ActionCandidatesMenu = ({}) => {
  return (
    <>
      <ul className="dropdown-menu dropdown-menu-end">
        <li>
          <a className="applicant-action">View Details</a>
        </li>
        <li>
          <button className="applicant-action" type="button">
            Assign to Job
          </button>
        </li>
        <li>
          <a className="applicant-action">Blacklist</a>
        </li>
      </ul>
    </>
  );
};

export default ActionCandidatesMenu;
