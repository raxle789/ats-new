import React, { useState } from 'react';
import ActionJobVacancies from '../candidate/action-job-vacancies';
import { ExpendableButton } from './expendable-button';
import { notification } from 'antd';

const EmployJobItem = ({ jobData }) => {
  const [api, contextHolder] = notification.useNotification();
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
      {contextHolder}

      <div className="tab-content" id="nav-tabContent">
        <div className="tab-pane fade show active" id="a1" role="tabpanel">
          <div className="table-responsive">
            <table className="table job-alert-table w-100">
              <thead>
                <tr>
                  <th scope="col"></th>
                  <th scope="col">Job Title</th>
                  <th scope="col">Remaining SLA</th>
                  <th scope="col">Recruiter</th>
                  <th scope="col">EFPK</th>
                  <th scope="col">Action</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {jobData?.map((data, index) => (
                  <React.Fragment key={index}>
                    <tr>
                      <td></td>
                      <td>
                        <b>{`${data?.jobPosition ?? ''}`}</b>
                        <br />
                        {`${data?.jobDepartment ?? ''}`}
                      </td>
                      <td>{`${data?.jobRemainingSLA ?? ''}`}</td>
                      <td>{`${data?.jobRecruiter ?? ''}`}</td>
                      <td>{`${data?.jobFpkStatus ?? ''}`}</td>
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
                          <ActionJobVacancies />
                          {/* action dropdown end */}
                        </div>
                      </td>
                      <td>
                        <ExpendableButton
                          isOpen={expandedRows[index]}
                          toggle={() => toggleRowExpansion(index)}
                        />
                      </td>
                    </tr>
                    {expandedRows[index] && (
                      <tr>
                        <td></td>
                        <td colSpan={5}>
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
                                  <b>Applications: </b>
                                  {`${data?.jobApplicants ?? ''}`}
                                </p>
                                <p>
                                  <b>Assessment: </b>
                                  {`${data.jobApplicantsAssessment ?? ''}`}
                                </p>
                                <p>
                                  <b>Interview: </b>
                                  {`${data?.jobApplicantsInterview ?? ''}`}
                                </p>
                              </div>
                              <div className="col-lg-6">
                                <p>
                                  <b>Offering: </b>
                                  {`${data?.jobApplicantsOffering ?? ''}`}
                                </p>
                                <p>
                                  <b>Job Status: </b>
                                  {`${data?.jobStatus ?? ''}`}
                                </p>
                                <p>
                                  <b>Job End Posted: </b>
                                  {`${data?.jobEndPosted ?? ''}`}
                                </p>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td></td>
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

export default EmployJobItem;
