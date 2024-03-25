import React from 'react';
import ActionDropdown from '../candidate/action-dropdown';
import { useState } from 'react';

const EmployJobParameter = ({
  parameterIndex,
  parameterName,
  minimumYearOfExperienceParameter,
  educationLevelParameter,
  majorOfStudiesParameter,
  gradeParameter,
  specialSkillParameter,
  certificationsParameter,
  salaryRangeParameter,
  domicileParameter,
  maximumAgeParameter,
  genderParameter,
  religionParameter,
  raceParameter,
  lineIndustryParameter,
  jobFunctionParameter,
  positionLevelParameter,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <tr className={status}>
        {/* <td>
        <div className="job-name fw-500">{jobTitle}</div>
        <div className="info1">{jobDeparment}</div>
        <div className="info1">{jobStatus}</div>
        <div className="info1">{jobEndPosted}</div>
      </td> */}
        <td>{parameterIndex + 1}</td>
        <td>{parameterName}</td>
        <td className="dropdown-toggle" onClick={() => setIsOpen(!isOpen)}></td>
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
            <ActionDropdown />
          </div>
        </td>
      </tr>
      {isOpen && (
        <tr className={'status'}>
          <td colSpan={4}>
            <div>
              <ul>
                <li>
                  <p>
                    Minimum Year Of Experience:
                    {minimumYearOfExperienceParameter || '-'}
                  </p>
                </li>
                <li>
                  <p>Education Level: {educationLevelParameter || '-'}</p>
                </li>
                <li>
                  <p>Major Of Studies: {majorOfStudiesParameter || '-'}</p>
                </li>
                <li>
                  <p>Grade: {gradeParameter || '-'}</p>
                </li>
                <li>
                  <p>Special Skill: {specialSkillParameter || '-'}</p>
                </li>
                <li>
                  <p>Certifications: {certificationsParameter || '-'}</p>
                </li>
                <li>
                  <p>Salary Range: {salaryRangeParameter || '-'}</p>
                </li>
                <li>
                  <p>Domicile: {domicileParameter || '-'}</p>
                </li>
                <li>
                  <p>Maximum Age: {maximumAgeParameter || '-'}</p>
                </li>
                <li>
                  <p>Gender: {genderParameter || '-'}</p>
                </li>
                <li>
                  <p>Religion: {religionParameter || '-'}</p>
                </li>
                <li>
                  <p>Race: {raceParameter || '-'}</p>
                </li>
                <li>
                  <p>Line Industry: {lineIndustryParameter ? 'True' : '-'}</p>
                </li>
                <li>
                  <p>Job Function: {jobFunctionParameter ? 'True' : '-'}</p>
                </li>
                <li>
                  <p>Position Level: {positionLevelParameter ? 'True' : '-'}</p>
                </li>
              </ul>
            </div>
          </td>
        </tr>
      )}
    </>
  );
};

export default EmployJobParameter;
