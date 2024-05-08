'use client';

import { useState, useMemo, ReactNode } from 'react';
import { Status } from '@/status/applicant-status';
import React from 'react';
import { Children } from 'react';
import ActionDropdownJobDetails from '../candidate/action-dropdown-job-details';
import ListArea from '../../applicants/list-area';

const EmployJobDetailItem = ({ jobVacancyData, perPage, offset, listArea }) => {
  const [status, setStatus] = useState(Status.APPLICANT);

  // const [list, setList] = useState(
  //   listArea?.map((area) => {
  //     if (area?.id === Status.APPLICANT) {
  //       return <div key={status}>{area?.content}</div>;
  //     }
  //   }),
  // );

  const list = useMemo(() => {
    switch (status) {
      case Status.APPLICANT:
        return listArea?.map((area) => {
          if (area?.id === Status.APPLICANT) {
            return <div key={status}>{area?.content}</div>;
          }
        });
      case Status.ASSESSMENT:
        return listArea?.map((area) => {
          if (area?.id === Status.ASSESSMENT) {
            return <div key={status}>{area?.content}</div>;
          }
        });
      default:
        return listArea?.map((area) => {
          if (area?.id === Status.APPLICANT) {
            return <div key={status}>{area?.content}</div>;
          }
        });
    }
  }, [status, jobVacancyData, perPage, offset, listArea]);

  return (
    <>
      <div className="d-sm-flex align-items-start justify-content-between mb-10 lg-mb-30">
        <div>
          <h3 className="main-title m0">
            {jobVacancyData?.jobTitleAliases ?? '-'}
          </h3>
          <p>{jobVacancyData?.recruiter ?? '-'}</p>
        </div>
        <div className="d-flex ms-auto xs-mt-30">
          <div className="short-filter ms-auto">
            <div className="action-dots float-end mt-10 ms-2">
              <button
                className="action-btn dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <span></span>
              </button>
              <ActionDropdownJobDetails />
            </div>
          </div>
        </div>
      </div>

      {list}
    </>
  );
};

export default EmployJobDetailItem;
