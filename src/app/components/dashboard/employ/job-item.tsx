'use client';

import React, { useEffect, useState } from 'react';
import ActionJobVacancies from '../candidate/action-job-vacancies';
import { ExpendableButton } from './expendable-button';
import { notification } from 'antd';
import { Checkbox } from 'antd';
import type { CheckboxProps } from 'antd';

// interface JobItem { jobId?: number, jobPosition?: string, jobDepartment?: string, jobStatus?: string, jobEndPosted?: string, jobApplicants?: number, jobApplicantsAssessment?: number, jobApplicantsInterview?: number, jobApplicantsOffering?: number, jobRemainingSLA?: string, jobRecruiter?: string, jobFpkStatus?: string, }

const moment = require('moment');

const EmployJobItem: React.FC<JobItemProps> = ({ jobVacancyData }) => {
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
      {/* <div className="checkbox-area">
        <Checkbox className="mt-10 ms-5" onChange={onChange}>
          Select All
        </Checkbox>
      </div> */}
      <div
        className="bg-white card-box border-20"
        // style={{ position: 'relative', zIndex: '10' }}
      >
        <div className="tab-content" id="nav-tabContent">
          <div className="tab-pane fade show active" id="a1" role="tabpanel">
            <div className="table-responsive">
              <table className="table job-alert-table job-vacancies-table w-100">
                <thead>
                  <tr>
                    <th scope="col">
                      <Checkbox
                        onChange={onChangeCheckboxAll}
                        checked={checkboxAllValue}
                      >
                        {/* <ActionJobVacancies /> */}
                      </Checkbox>
                    </th>
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
                          <Checkbox
                            className="me-2"
                            checked={checkbox[index]}
                            onChange={() => onChangeCheckbox(index)}
                          ></Checkbox>
                        </td>
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
                            <ActionJobVacancies />
                            {/* action dropdown end */}
                          </div>
                        </td>
                      </tr>
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmployJobItem;
