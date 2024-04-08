'use client';

import React from 'react';
import CryptoJS from 'crypto-js';
import Link from 'next/link';
import { FaEdit } from 'react-icons/fa';
import ActionDropdown from '../candidate/action-dropdown';
import { useState } from 'react';
import { ExpendableButton } from './expendable-button';

type TSubTitle = {
  education_level: string;
  job_level: string;
  min_year_experience: string;
  grade: string;
  line_industry: string;
  salary: string;
};

const subTitle: TSubTitle = {
  education_level: 'Education Level',
  job_level: 'Job Level',
  min_year_experience: 'Min Year Experience',
  grade: 'Grade',
  line_industry: 'Line Industry',
  salary: 'Salary',
};

const EmployJobParameter = ({
  positionLevelRequirementData,
  getLineIndustryData,
  getEducationLevelData,
  getPositionLevelData,
}) => {
  const [expandedRows, setExpandedRows] = useState<{ [key: string]: boolean }>(
    {},
  );

  function getPositionLevelRequirementValue(name, value) {
    if (value === null || value === undefined) {
      return '-';
    } else {
      if (name === 'line_industry') {
        const parsedValue = JSON.parse(value);
        const data = '';

        for (let i = 0; i < parsedValue.length; i++) {
          const newData = getLineIndustryData(Number(parsedValue[i]));

          data.concat(newData?.name + ', ');
        }

        return data;
      } else if (name === 'education_level') {
        const data = getEducationLevelData(Number(value));

        return data;
      } else if (name === 'position_level') {
        const data = getPositionLevelData(Number(value));

        return data;
      } else if (name === 'salary') {
        const data = `${value[0]} - ${value[1]}`;

        return data;
      }
    }

    return value;
  }

  const toggleRowExpansion = (index: number) => {
    setExpandedRows((prevExpandedRows) => ({
      ...prevExpandedRows,
      [index]: !prevExpandedRows[index],
    }));
  };

  return (
    <>
      <div className="tab-content" id="nav-tabContent">
        <div className="tab-pane fade show active" id="a1" role="tabpanel">
          <div className="table-responsive">
            <table className="table job-alert-table w-100">
              <thead>
                <tr>
                  <th scope="col">No</th>
                  <th scope="col">Parameter Name</th>
                  <th scope="col">More</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody className="border-0">
                {positionLevelRequirementData?.map((data, index) => (
                  <React.Fragment key={index}>
                    <tr>
                      <td
                        style={{ width: '136.66px' }}
                      >{`${index + 1 ?? ''}`}</td>
                      {/* <td>{parameterData?.parameterIndex + 1}</td> */}
                      <td>{`${data?.name ?? ''} (Level: ${data?.level})`}</td>
                      <td>
                        <div className="d-flex justify-content-center align-items-center">
                          <ExpendableButton
                            isOpen={expandedRows[index]}
                            toggle={() => toggleRowExpansion(index)}
                          />
                        </div>
                      </td>
                      <td>
                        <div>
                          <Link
                            className="edit-container"
                            href={{
                              pathname: '/dashboard/ta/submit-parameter',
                              query: {
                                '': CryptoJS.Rabbit.encrypt(
                                  String(data.id),
                                  process.env.NEXT_PUBLIC_SECRET_KEY,
                                ).toString(),
                              },
                            }}
                          >
                            <FaEdit className="edit-action" />
                          </Link>
                          {/* <button
                            className="action-btn dropdown-toggle"
                            type="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            <span></span>
                          </button>
                          <ActionDropdown /> */}
                          {/* <i className="fa-solid fa-trash-can">oke</i> */}
                        </div>
                      </td>
                    </tr>
                    {expandedRows[index] && (
                      <tr>
                        <td></td>
                        <td colSpan={3}>
                          <div
                            className={
                              expandedRows[index]
                                ? 'expanded-row-open'
                                : 'expanded-row-close'
                            }
                          >
                            <div className="row">
                              {data?.positionLevelRequirements?.map(
                                (d, index) => {
                                  return (
                                    <div key={index} className="col-lg-6">
                                      <p>
                                        {/* <b>{`${d?.requirementFields?.name}: `}</b> */}
                                        <b>{`${subTitle[d?.requirementFields?.name ?? '']}: `}</b>
                                        {getPositionLevelRequirementValue(
                                          d.requirementFields.name,
                                          d.value,
                                        )}
                                      </p>
                                    </div>
                                  );
                                },
                              )}
                              {/* <div className="col-6">
                                <p>
                                  <b>Total Year Of Experience: </b>
                                  {`${data?.totalYearOfExperienceParameter ?? '-'}`}
                                </p>
                                <p>
                                  <b>Education Level: </b>
                                  {`${data?.educationLevelParameter ?? '-'}`}
                                </p>
                                <p>
                                  <b>Grade: </b>
                                  {`${data?.gradeParameter ?? '-'}`}
                                </p>
                              </div>
                              <div className="col-lg-6">
                                <p>
                                  <b>Salary Range: </b>
                                  {`${data?.salaryRangeParameter ?? '-'}`}
                                </p>
                                <p>
                                  <b>Line Industry: </b>
                                  {`${data?.lineIndustryParameter ? 'Yes' : 'No'}`}
                                </p>
                                <p>
                                  <b>Job Level: </b>
                                  {`${data?.jobLevelParameter ? 'Yes' : 'No'}`}
                                </p>
                              </div> */}
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmployJobParameter;
