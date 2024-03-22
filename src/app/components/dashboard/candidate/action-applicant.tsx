import React from 'react';

const ActionApplicant = () => {
  return (
    <ul className="dropdown-menu dropdown-menu-end">
      <li>
        <a className="applicant-action" href="#">
          Assign to Assessment
        </a>
      </li>
      <li>
        <a className="applicant-action" href="#">
          Assign to Interview
        </a>
      </li>
      <li>
        <a className="applicant-action" href="#">
          Assign to Offering
        </a>
      </li>
      <li>
        <a className="applicant-action" href="#">
          Assign to Ref Check
        </a>
      </li>
      <li>
        <a className="applicant-action" href="#">
          Assign to Agreement
        </a>
      </li>
      <li>
        <a className="applicant-action" href="#">
          Assign to Boarding
        </a>
      </li>
      <li>
        <a className="applicant-action" href="#">
          Reject
        </a>
      </li>
      <li>
        <a className="applicant-action" href="#">
          Blacklist
        </a>
      </li>
    </ul>
  );
};

export default ActionApplicant;
