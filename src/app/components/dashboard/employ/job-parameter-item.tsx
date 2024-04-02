import React from 'react';
import ActionDropdown from '../candidate/action-dropdown';
import { useState } from 'react';
import { ExpendableButton } from './expendable-button';

const EmployJobParameter = ({ parameterData }) => {
  const [expandedRows, setExpandedRows] = useState<{ [key: string]: boolean }>(
    {},
  );

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
                {parameterData?.map((data, index) => (
                  <React.Fragment key={index}>
                    <tr>
                      <th
                        scope="row"
                        style={{ width: '136.66px' }}
                      >{`${data?.parameterId ?? ''}`}</th>
                      {/* <td>{parameterData?.parameterIndex + 1}</td> */}
                      <td>{`${data?.parameterName ?? ''}`}</td>
                      <td
                        className="d-flex align-items-center justify-content-center"
                        style={{ height: '73px' }}
                      >
                        <ExpendableButton
                          isOpen={expandedRows[index]}
                          toggle={() => toggleRowExpansion(index)}
                        />
                      </td>
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
                              <div className="col-6">
                                <p>
                                  <b>Minimum Year Of Experience: </b>
                                  {`${data?.minimumYearOfExperienceParameter ?? '-'}`}
                                </p>
                                <p>
                                  <b>Education Level: </b>
                                  {`${data?.educationLevelParameter ?? '-'}`}
                                </p>
                                <p>
                                  <b>Major Of Studies: </b>
                                  {`${data?.majorOfStudiesParameter ?? '-'}`}
                                </p>
                                <p>
                                  <b>Grade: </b>
                                  {`${data?.gradeParameter ?? '-'}`}
                                </p>
                                <p>
                                  <b>Special Skill: </b>
                                  {`${data?.specialSkillParameter ?? '-'}`}
                                </p>
                                <p>
                                  <b>Certifications: </b>
                                  {`${data?.certificationsParameter ?? '-'}`}
                                </p>
                                <p>
                                  <b>Salary Range: </b>
                                  {`${data?.salaryRangeParameter ?? '-'}`}
                                </p>
                                <p>
                                  <b>Domicile: </b>
                                  {`${data?.domicileParameter ?? '-'}`}
                                </p>
                              </div>
                              <div className="col-lg-6">
                                <p>
                                  <b>Maximum Age: </b>
                                  {`${data?.maximumAgeParameter ?? '-'}`}
                                </p>
                                <p>
                                  <b>Gender: </b>
                                  {`${data?.genderParameter ?? '-'}`}
                                </p>
                                <p>
                                  <b>Religion: </b>
                                  {`${data?.religionParameter ?? '-'}`}
                                </p>
                                <p>
                                  <b>Race: </b>
                                  {`${data?.raceParameter ?? '-'}`}
                                </p>
                                <p>
                                  <b>Line Industry: </b>
                                  {`${data?.lineIndustryParameter ? 'Yes' : 'No'}`}
                                </p>
                                <p>
                                  <b>Job Function: </b>
                                  {`${data?.jobFunctionParameter ? 'Yes' : 'No'}`}
                                </p>
                                <p>
                                  <b>Position Level: </b>
                                  {`${data?.positionLevelParameter ? 'Yes' : 'No'}`}
                                </p>
                              </div>
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
