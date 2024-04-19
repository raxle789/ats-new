import React from 'react';
import { useAppSelector } from '@/redux/hook';
import { useRouter } from 'next/navigation';

const ActionApplicant = () => {
  const currentStep = useAppSelector((state) => state.applicantStep.step);
  const router = useRouter();
  return (
    <ul className="dropdown-menu dropdown-menu-end">
      {currentStep === 'assessment' && (
        <>
          <li>
            <a
              className="applicant-action"
              onClick={() => {
                router.push('/dashboard/ta/preview-page/assessment/review');
              }}
            >
              View Result
            </a>
          </li>
          <li>
            <a
              className="applicant-action"
              onClick={() => {
                router.push('');
              }}
            >
              Invite Assessment
            </a>
          </li>
          <li>
            <a
              className="applicant-action"
              onClick={() => {
                router.push('');
              }}
            >
              Reschedule Assessment
            </a>
          </li>
          <li>
            <a className="applicant-action">Assign to Interview</a>
          </li>
        </>
      )}
      {currentStep === 'interview' && (
        <>
          <li>
            <a
              className="applicant-action"
              onClick={() => {
                router.push('');
              }}
            >
              Create Interview
            </a>
          </li>
          <li>
            <a
              className="applicant-action"
              onClick={() => {
                router.push('');
              }}
            >
              Mark as Done
            </a>
          </li>
        </>
      )}
      {currentStep === 'initial' && (
        <>
          <li>
            <a className="applicant-action">Assign to Assessment</a>
          </li>
          <li>
            <a className="applicant-action">Assign to Interview</a>
          </li>
        </>
      )}
      <li>
        <a className="applicant-action">Assign to Offering</a>
      </li>
      <li>
        <a className="applicant-action">Assign to Ref Check</a>
      </li>
      <li>
        <a className="applicant-action">Assign to Agreement</a>
      </li>
      <li>
        <a className="applicant-action">Assign to Boarding</a>
      </li>
      <li>
        <a className="applicant-action">Reject</a>
      </li>
      <li>
        <a className="applicant-action">Blacklist</a>
      </li>
    </ul>
  );
};

export default ActionApplicant;
