'use client';

import { useState, useMemo, ReactNode, cloneElement, lazy } from 'react';
import JobDetailWrapper from '../../wrapper/job-detail-wrapper';
import { registerAssessment } from '@/lib/actions/job-vacancies/job-vacancy-details/job-vacancy-detail-assessment/action';
import { useRouter } from 'next/navigation';
import * as messages from '@/utils/message';
import * as confirmations from '@/utils/confirmation';
import { Spin, Modal, message } from 'antd';
import Pagination from '@/ui/pagination';
import SearchBar from '@/ui/search-bar';
import { Status } from '@/status/applicant-status';
import React from 'react';
import { Children } from 'react';
import ActionDropdownJobDetails from '../candidate/action-dropdown-job-details';
import ListArea from '../../applicants/list-area';

const { confirm } = Modal;

const EmployJobDetailItem = ({ jobVacancyData, perPage, offset, listArea }) => {
  const router = useRouter();

  const [status, setStatus] = useState(Status.APPLICANT);

  const [api, contextHolder] = message.useMessage();

  const [loading, setLoading] = useState(false);

  // const [list, setList] = useState(
  //   listArea?.map((area) => {
  //     if (area?.id === Status.APPLICANT) {
  //       return <div key={status}>{area?.content}</div>;
  //     }
  //   }),
  // );

  // function handleApplicant(handleType: 'assignAssessment', candidateId) {
  //   switch (handleType) {
  //     case 'assignAssessment': {
  //       confirm({
  //         ...confirmations?.assignConfirmation('assessment'),
  //         onOk() {
  //           return new Promise<void>((resolve, reject) => {
  //             setTimeout(async () => {
  //               const validate = await registerAssessment(
  //                 candidateId,
  //                 jobVacancyData?.jobId,
  //               );

  //               if (validate?.success) {
  //                 messages.success(api, validate?.message);

  //                 router.refresh();
  //               } else {
  //                 messages.error(api, validate?.message);

  //                 router.refresh();
  //               }

  //               resolve(setLoading(false));
  //             }, 2000);
  //           }).catch((e) =>
  //             console.log('Failed Assign This Candidate to Assessment: ', e),
  //           );
  //         },
  //         onCancel() {
  //           router.refresh();

  //           setLoading(false);
  //         },
  //       });
  //     }
  //   }
  // }

  const list = useMemo(() => {
    switch (status) {
      case Status.APPLICANT:
        return listArea?.map((area) => {
          if (area?.id === Status.APPLICANT && area.content) {
            return <div key={status}>{area.content}</div>;
          }
        });
      case Status.ASSESSMENT:
        return listArea?.map((area) => {
          if (area?.id === Status.ASSESSMENT && area.content) {
            return <div key={status}>{area.content}</div>;
          }
        });
      case Status.INTERVIEW:
        return listArea?.map((area) => {
          if (area?.id === Status.INTERVIEW && area.content) {
            return <div key={status}>{area.content}</div>;
          }
        });
      default:
        return listArea?.map((area) => {
          if (area?.id === Status.APPLICANT) {
            return <div key={status}>{area.content}</div>;
          }
        });
    }
  }, [status, jobVacancyData, perPage, offset, listArea]);

  return (
    <>
      {/* {contextHolder}

      <Spin spinning={loading} fullscreen /> */}

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

      <div className="nav-bar-responsive d-flex align-items-center justify-content-center mb-40 pb-3 overflow-auto">
        <button
          className="d-flex flex-column align-items-center me-4"
          onClick={() => setStatus(Status.APPLICANT)}
        >
          <span>{jobVacancyData?.applicant}</span>
          <span>Applicants</span>
        </button>
        <button
          className="d-flex flex-column align-items-center me-4"
          onClick={() => setStatus(Status.APPLICANT)}
        >
          <span>{jobVacancyData?.applicant}</span>
          <span>Shortlisted</span>
        </button>
        <button
          className="d-flex flex-column align-items-center me-4"
          onClick={() => setStatus(Status.APPLICANT)}
        >
          <span>{jobVacancyData?.applicant}</span>
          <span className="text-center">Talent Pool</span>
        </button>
        <button
          className="d-flex flex-column align-items-center me-4"
          onClick={() => setStatus(Status.ASSESSMENT)}
        >
          <span>{jobVacancyData?.assessment}</span>
          <span>Assessment</span>
        </button>
        <button
          className="d-flex flex-column align-items-center me-4"
          onClick={() => setStatus(Status.INTERVIEW)}
        >
          <span>{jobVacancyData?.interview}</span>
          <span>Interview</span>
        </button>
        <button
          className="d-flex flex-column align-items-center me-4"
          onClick={() => setStatus(Status.APPLICANT)}
        >
          <span>{jobVacancyData?.applicant}</span>
          <span className="text-center">Ref Check</span>
        </button>
        <button
          className="d-flex flex-column align-items-center me-4"
          onClick={() => setStatus(Status.APPLICANT)}
        >
          <span>{jobVacancyData?.applicant}</span>
          <span>Offering</span>
        </button>
        <button
          className="d-flex flex-column align-items-center me-4"
          onClick={() => setStatus(Status.APPLICANT)}
        >
          <span>{jobVacancyData?.applicant}</span>
          <span>MCU</span>
        </button>
        <button
          className="d-flex flex-column align-items-center me-4"
          onClick={() => setStatus(Status.APPLICANT)}
        >
          <span>{jobVacancyData?.applicant}</span>
          <span>Agreement</span>
        </button>
        <button
          className="d-flex flex-column align-items-center"
          onClick={() => setStatus(Status.APPLICANT)}
        >
          <span>{jobVacancyData?.applicant}</span>
          <span>Boarding</span>
        </button>
      </div>

      <div className="d-flex justify-content-between align-items-center mb-40">
        <div>
          <h4 className="sub-main-title">{status}</h4>
        </div>
        <SearchBar />
      </div>

      {list}
    </>
  );
};

export default EmployJobDetailItem;
