import React from 'react';
import { useAppSelector } from '@/redux/hook';

const ActionApplicant = () => {
  const currentStep = useAppSelector((state) => state.applicantStep.step);
  return (
    <ul className="dropdown-menu dropdown-menu-end">
      {currentStep === 'assessment' && (
        <li>
          <a
            className="applicant-action"
            href="/dashboard/ta/preview-page/assessment/review"
          >
            View Result
          </a>
        </li>
      )}
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
