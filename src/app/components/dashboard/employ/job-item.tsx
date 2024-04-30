'use client';

import React, { useState } from 'react';
import { Spin } from 'antd';
import ActionJobVacancies from '../candidate/action-job-vacancies';
import { ExpendableButton } from './expendable-button';
import { notification } from 'antd';
import { Checkbox } from 'antd';
import type { CheckboxProps } from 'antd';

// interface JobItem { jobId?: number, jobPosition?: string, jobDepartment?: string, jobStatus?: string, jobEndPosted?: string, jobApplicants?: number, jobApplicantsAssessment?: number, jobApplicantsInterview?: number, jobApplicantsOffering?: number, jobRemainingSLA?: string, jobRecruiter?: string, jobFpkStatus?: string, }

const moment = require('moment');

const EmployJobItem: React.FC<JobItemProps> = ({ jobVacancyData }) => {
  const [loading, setLoading] = useState(false);

  const [api, contextHolder] = notification.useNotification();
  const initialCheckboxState = jobVacancyData?.reduce(
    (acc: { [key: string]: boolean }, _: any, index: string) => {
      return {
        ...acc,
        [index]: false,
      };
    },
    {},
  );
  const [checkboxAllValue, setCheckboxAllValue] = useState(false);
  const [checkbox, setCheckbox] = useState<{ [key: string]: boolean }>(
    initialCheckboxState,
  );
  const onChangeCheckboxAll: CheckboxProps['onChange'] = (e) => {
    const checked = e.target.checked;
    const updatedCheckbox: { [key: string]: boolean } = {};

    Object.keys(checkbox).forEach((key: string) => {
      updatedCheckbox[key] = checked;
    });

    setCheckbox(updatedCheckbox);
    setCheckboxAllValue(checked);
  };
  const onChangeCheckbox = (index: number) => {
    setCheckbox((prevState: any) => ({
      ...prevState,
      [index]: !prevState[index],
    }));

    if (checkboxAllValue || !checkbox[index]) {
      setCheckboxAllValue(false);
    }
  };
  return (
    <>
      {contextHolder}

      <Spin spinning={loading}>
        <div className="tab-content" id="nav-tabContent">
          <div className="tab-pane fade show active" id="a1" role="tabpanel">
            <div className="table-responsive">
              <table className="table job-alert-table job-vacancies-table w-100">
                <thead>
                  <tr>
                    <th scope="col">Job Title</th>
                    <th scope="col">Applicants</th>
                    <th scope="col">Assessment</th>
                    <th scope="col">Interview</th>
                    <th scope="col">SLA</th>
                    <th scope="col">User</th>
                    <th scope="col">Recruiter</th>
                    <th scope="col">EFPK</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {jobVacancyData?.map((data: any, index: number) => (
                    <React.Fragment key={index}>
                      <tr>
                        <td>
                          <b>{`${data?.jobTitleName ?? '-'}`}</b>
                          <br />
                          {`${data?.departmentName ?? '-'}`} <br />
                          Status:
                          {` ${data?.status ?? '-'}`}
                          <br />
                          End Posted:
                          {` ${data?.endPosted ?? '-'}`}
                        </td>
                        <td>{`${data?.applicants ?? 0}`}</td>
                        <td>{`${data?.assessment ?? 0}`}</td>
                        <td>{`${data?.interview ?? 0}`}</td>
                        <td>{`${data?.sla ?? '-'}`}</td>
                        <td>{`${data?.user ?? '-'}`}</td>
                        <td>{`${data?.recruiter ?? '-'}`}</td>
                        <td>{`${data?.efpkStatus ?? '-'}`}</td>
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
                            <ActionJobVacancies
                              jobId={data?.jobId}
                              setLoading={setLoading}
                            />
                            {/* action dropdown end */}
                          </div>
                        </td>
                        {/* <td>
                        <ExpendableButton
                          isOpen={expandedRows[index]}
                          toggle={() => toggleRowExpansion(index)}
                        />
                      </td> */}
                      </tr>
                      {/* {expandedRows[index] && (
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
                    )} */}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Spin>
    </>
  );
};

export default EmployJobItem;
