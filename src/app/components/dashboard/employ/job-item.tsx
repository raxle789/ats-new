import React from 'react';
import ActionDropdown from '../candidate/action-dropdown-job-details';

const EmployJobItem = ({
  jobTitle,
  jobDeparment,
  jobStatus,
  jobEndPosted,
  jobApplicants,
  jobApplicantsAssessment,
  jobApplicantsInterview,
  jobApplicantsOffering,
  jobRemainingSLA,
  jobRecruiter,
  jobFpkStatus,
}) => {
  return (
    <tr className={status}>
      <td>
        <div className="job-name fw-500">{jobTitle}</div>
        <div className="info1">{jobDeparment}</div>
        <div className="info1">{jobStatus}</div>
        <div className="info1">{jobEndPosted}</div>
      </td>
      <td>{jobApplicants}</td>
      <td>{jobApplicantsAssessment}</td>
      <td>{jobApplicantsInterview}</td>
      <td>{jobApplicantsOffering}</td>
      <td>{jobRemainingSLA}</td>
      <td>{jobRecruiter}</td>
      <td>{jobFpkStatus}</td>
      {/* <td>
        <div className="job-status text-capitalize">{status}</div>
      </td> */}
      <td>
        <div className="action-dots float-end">
          <button
            className="action-btn dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <span></span>
          </button>
          {/* action dropdown start */}
          <ActionDropdown />
          {/* action dropdown end */}
        </div>
      </td>
    </tr>
  );
};

export default EmployJobItem;
