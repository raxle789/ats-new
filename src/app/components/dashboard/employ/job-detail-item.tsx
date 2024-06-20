'use client';

import {
  useState,
  useRef,
  useEffect,
  // useEffect,
  // useMemo,
  // ReactNode,
  // cloneElement,
  // lazy,
} from 'react';
import _ from 'lodash';
// import JobDetailWrapper from '../../wrapper/job-detail-wrapper';
// import { registerAssessment } from '@/lib/actions/job-vacancies/job-vacancy-details/job-vacancy-detail-assessment/action';
import { useRouter, usePathname } from 'next/navigation';
// import * as messages from '@/utils/message';
// import * as confirmations from '@/utils/confirmation';
import { Spin, message } from 'antd';
// import Pagination from '@/ui/pagination';
// import SearchBar from '@/ui/search-bar';
import { Status } from '@/status/applicant-status';
import React from 'react';
// import { Children } from 'react';
import ActionDropdownJobDetails from '../candidate/action-dropdown-job-details';
// import ListArea from '../../applicants/list-area';

// const { confirm } = Modal;

type Props = {
  jobVacancyData?: any;
  params?: any;
};

const EmployJobDetailItem: React.FC<Props> = ({ jobVacancyData, params }) => {
  const router = useRouter();

  const pathname = usePathname();

  const isFirstRender = useRef(true);

  const [status, setStatus] = useState(Status?.APPLICANT);

  const [api, contextHolder] = message.useMessage();

  const [loading, setLoading] = useState(false);

  const path = {
    APPLICANT: `/dashboard/ta/jobs/${params?.id}`,
    ASSESSMENT: `/dashboard/ta/jobs/${params?.id}/${Status?.ASSESSMENT?.toLowerCase()}`,
    INTERVIEW: `/dashboard/ta/jobs/${params?.id}/${Status?.INTERVIEW?.toLowerCase()}`,
    REFCHECK: `/dashboard/ta/jobs/${params?.id}/${Status?.REFCHECK?.toLowerCase()?.replace(' ', '-')}`,
  };

  function handlePath(status: string) {
    if (status === Status?.APPLICANT) {
      router.replace(path?.APPLICANT);

      setStatus(Status?.APPLICANT);
    } else if (status === Status?.ASSESSMENT) {
      router.replace(path?.ASSESSMENT);

      setStatus(Status?.ASSESSMENT);
    } else if (status === Status?.INTERVIEW) {
      router.replace(path?.INTERVIEW);

      setStatus(Status?.INTERVIEW);
    } else if (status === Status?.REFCHECK) {
      router.replace(path?.REFCHECK);

      setStatus(Status?.REFCHECK);
    }
  }

  useEffect(() => {
    if (pathname?.includes(Status?.ASSESSMENT?.toLowerCase())) {
      setStatus(Status?.ASSESSMENT);
    } else if (pathname?.includes(Status?.INTERVIEW?.toLowerCase())) {
      setStatus(Status?.INTERVIEW);
    } else if (
      pathname?.includes(Status?.REFCHECK?.toLowerCase()?.replace(' ', '-'))
    ) {
      setStatus(Status?.REFCHECK);
    }
  }, [pathname]);

  // useEffect(() => {
  //   if (params?.id && jobVacancyData && !_.isEmpty(jobVacancyData)) {
  //     if (status === Status.APPLICANT && pathname.endsWith(params?.id)) {
  //       return;
  //     } else if (status === Status.APPLICANT) {
  //       router.push(`/dashboard/ta/jobs/${params?.id}`);
  //     } else {
  //       router.push(`/dashboard/ta/jobs/${params?.id}/${status.toLowerCase()}`);
  //     }
  //   }
  // }, [status]);

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

  // const list = useMemo(() => {
  //   switch (status) {
  //     case Status.APPLICANT:
  //       return listArea?.map((area) => {
  //         if (area?.id === Status.APPLICANT && area.content) {
  //           return <div key={status}>{area.content}</div>;
  //         }
  //       });
  //     case Status.ASSESSMENT:
  //       return listArea?.map((area) => {
  //         if (area?.id === Status.ASSESSMENT && area.content) {
  //           return <div key={status}>{area.content}</div>;
  //         }
  //       });
  //     case Status.INTERVIEW:
  //       return listArea?.map((area) => {
  //         if (area?.id === Status.INTERVIEW && area.content) {
  //           return <div key={status}>{area.content}</div>;
  //         }
  //       });
  //     default:
  //       return listArea?.map((area) => {
  //         if (area?.id === Status.APPLICANT) {
  //           return <div key={status}>{area.content}</div>;
  //         }
  //       });
  //   }
  // }, [status, jobVacancyData, perPage, offset, listArea]);

  return (
    <>
      {contextHolder}

      <Spin spinning={loading} fullscreen />

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
          className={`d-flex flex-column align-items-center ${status === Status?.APPLICANT ? 'btn-pipeline btn-pipeline-active' : 'btn-pipeline'}`}
          onClick={() => handlePath(Status?.APPLICANT)}
        >
          <span>{jobVacancyData?.applicant}</span>
          <span>Applicant</span>
        </button>
        <button
          className={`d-flex flex-column align-items-center ${status === 'SHORTLISTED' ? 'btn-pipeline btn-pipeline-active' : 'btn-pipeline'}`}
          onClick={() => handlePath(Status?.APPLICANT)}
        >
          <span>{jobVacancyData?.applicant}</span>
          <span>Shortlisted</span>
        </button>
        <button
          className={`d-flex flex-column align-items-center ${status === 'TALENT POOL' ? 'btn-pipeline btn-pipeline-active' : 'btn-pipeline'}`}
          onClick={() => handlePath(Status?.APPLICANT)}
        >
          <span>{jobVacancyData?.applicant}</span>
          <span className="text-center">Talent Pool</span>
        </button>
        <button
          className={`d-flex flex-column align-items-center ${status === Status?.ASSESSMENT ? 'btn-pipeline btn-pipeline-active' : 'btn-pipeline'}`}
          onClick={() => handlePath(Status?.ASSESSMENT)}
        >
          <span>{jobVacancyData?.assessment}</span>
          <span>Assessment</span>
        </button>
        <button
          className={`d-flex flex-column align-items-center ${status === Status?.INTERVIEW ? 'btn-pipeline btn-pipeline-active' : 'btn-pipeline'}`}
          onClick={() => handlePath(Status?.INTERVIEW)}
        >
          <span>{jobVacancyData?.interview}</span>
          <span>Interview</span>
        </button>
        <button
          className={`d-flex flex-column align-items-center ${status === Status?.REFCHECK ? 'btn-pipeline btn-pipeline-active' : 'btn-pipeline'}`}
          onClick={() => handlePath(Status?.REFCHECK)}
        >
          <span>{jobVacancyData?.referenceCheck}</span>
          <span className="text-center">Ref Check</span>
        </button>
        <button
          className={`d-flex flex-column align-items-center ${status === 'OFFERING' ? 'btn-pipeline btn-pipeline-active' : 'btn-pipeline'}`}
          onClick={() => handlePath(Status?.APPLICANT)}
        >
          <span>{jobVacancyData?.applicant}</span>
          <span>Offering</span>
        </button>
        <button
          className={`d-flex flex-column align-items-center ${status === 'MCU' ? 'btn-pipeline btn-pipeline-active' : 'btn-pipeline'}`}
          onClick={() => handlePath(Status?.APPLICANT)}
        >
          <span>{jobVacancyData?.applicant}</span>
          <span>MCU</span>
        </button>
        <button
          className={`d-flex flex-column align-items-center ${status === 'AGREEMENT' ? 'btn-pipeline btn-pipeline-active' : 'btn-pipeline'}`}
          onClick={() => handlePath(Status?.APPLICANT)}
        >
          <span>{jobVacancyData?.applicant}</span>
          <span>Agreement</span>
        </button>
        <button
          className={`d-flex flex-column align-items-center ${status === 'BOARDING' ? 'btn-pipeline btn-pipeline-active' : 'btn-pipeline'}`}
          onClick={() => handlePath(Status?.APPLICANT)}
          style={{ marginRight: '0px' }}
        >
          <span>{jobVacancyData?.applicant}</span>
          <span>Boarding</span>
        </button>
      </div>

      {/* <div className="d-flex justify-content-between align-items-center mb-40">
        <div>
          <h4 className="sub-main-title">
            {pathname?.endsWith(params?.id)
              ? 'APPLICANT'
              : pathname
                  ?.split('/')
                  [pathname?.split('/')?.length - 1]?.toUpperCase() ?? '-'}
          </h4>
        </div> */}
      {/* <SearchBar /> */}
      {/* </div> */}

      {/* {list} */}
    </>
  );
};

export default EmployJobDetailItem;
