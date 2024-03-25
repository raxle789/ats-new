'use client';

import React from 'react';
import Link from 'next/link';
import DashboardHeader from '../candidate/dashboard-header';
import EmployJobItem from './job-item';
import EmployShortSelect from './short-select';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import Pagination from '@/ui/pagination';
import Image from 'next/image';
import search from '@/assets/dashboard/images/icon/icon_10.svg';
import { useDebouncedCallback } from 'use-debounce';

const jobData = [
  {
    jobId: 1,
    jobPosition: 'Assistant Store Manager',
    jobDepartment: 'EFN Strategy & Business Development',
    jobStatus: 'Posted',
    jobEndPosted: '30-06-2025',
    jobApplicants: 4,
    jobApplicantsAssessment: 2,
    jobApplicantsInterview: 0,
    jobApplicantsOffering: 4,
    jobRemainingSLA: '36 days',
    jobRecruiter: 'Gusti 1',
    jobFpkStatus: 'Not Yet',
  },
  {
    jobId: 2,
    jobPosition: 'Store Manager',
    jobDepartment: 'EFN Strategy & Business Development',
    jobStatus: 'Posted',
    jobEndPosted: '12-08-2026',
    jobApplicants: 2,
    jobApplicantsAssessment: 3,
    jobApplicantsInterview: 4,
    jobApplicantsOffering: 5,
    jobRemainingSLA: '28 days',
    jobRecruiter: 'Gusti 2',
    jobFpkStatus: 'Done',
  },
  {
    jobId: 3,
    jobPosition: 'Assistant Store Manager',
    jobDepartment: 'EFN Strategy & Business Development',
    jobStatus: 'Posted',
    jobEndPosted: '14-12-2028',
    jobApplicants: 2,
    jobApplicantsAssessment: 2,
    jobApplicantsInterview: 0,
    jobApplicantsOffering: 2,
    jobRemainingSLA: '18 days',
    jobRecruiter: 'Gusti 3',
    jobFpkStatus: 'Not Yet',
  },
  {
    jobId: 4,
    jobPosition: 'Store Manager',
    jobDepartment: 'EFN Strategy & Business Development',
    jobStatus: 'Posted',
    jobEndPosted: '02-06-2025',
    jobApplicants: 3,
    jobApplicantsAssessment: 4,
    jobApplicantsInterview: 5,
    jobApplicantsOffering: 6,
    jobRemainingSLA: '12 days',
    jobRecruiter: 'Gusti 4',
    jobFpkStatus: 'Done',
  },
];

// props type
type IProps = {
  setIsOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>;
};
const EmployJobArea = () => {
  const searchParams = useSearchParams();

  const page = searchParams.get('page') ?? '1';

  const perPage = searchParams.get('perPage') ?? '2';

  let offset = 0;

  let newJobData = [];

  const searchQuery = searchParams.get('query') ?? '';

  const router = useRouter();

  const pathname = usePathname();

  if (searchQuery) {
    offset = 0;

    newJobData = jobData.filter((data) => {
      return data.jobPosition.includes(searchQuery);
    });
  } else {
    offset = (Number(page) - 1) * Number(perPage);

    newJobData = jobData.slice(offset, offset + Number(perPage));
  }

  const handleJobSearch = useDebouncedCallback((value) => {
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set('query', value);
    } else {
      params.delete('query');
    }

    router.replace(`${pathname}?${params.toString()}`);
  }, 500);

  return (
    <>
      {/* header start */}
      {/* <DashboardHeader /> */}
      {/* header end */}

      {/* <div className="d-sm-flex align-items-center justify-content-between mb-40 lg-mb-30">
        <h2 className="main-title m0">My Jobs</h2>
        <div className="d-flex ms-auto xs-mt-30">
          <div className="short-filter d-flex align-items-center ms-auto">
            <div className="text-dark fw-500 me-2">Filter by:</div>
            <EmployShortSelect />
          </div>
        </div>
      </div> */}

      <div className="job-fpk-header d-sm-flex flex-wrap align-items-center justify-content-between mb-40 lg-mb-30">
        <h2 className="main-title m0 flex-grow-1">Jobs</h2>
        <div className="d-flex flex-grow-1 ms-auto xs-mt-30 justify-content-between align-items-center">
          <form onSubmit={(e) => e.preventDefault()} className="search-form">
            <input
              type="text"
              placeholder="Search here.."
              onChange={(e) => handleJobSearch(e.target.value)}
              defaultValue={searchParams.get('query')?.toString()}
            />
            <button type="submit">
              <Image src={search} alt="search" className="lazy-img m-auto" />
            </button>
          </form>
          {/* <div
            className="nav nav-tabs tab-filter-btn me-4"
            id="nav-tab"
            role="tablist"
          >
            <button
              className="nav-link active"
              data-bs-toggle="tab"
              data-bs-target="#a1"
              type="button"
              role="tab"
              aria-selected="true"
            >
              All
            </button>
            <button
              className="nav-link"
              data-bs-toggle="tab"
              data-bs-target="#a2"
              type="button"
              role="tab"
              aria-selected="false"
            >
              New
            </button>
          </div>
          <div className="short-filter d-flex align-items-center ms-auto">
            <div className="text-dark fw-500 me-2">Sort by:</div>
            <EmployShortSelect />
          </div> */}
        </div>
      </div>

      <div className="bg-white card-box border-20">
        <div className="tab-content" id="nav-tabContent">
          <div className="tab-pane fade show active" id="a1" role="tabpanel">
            <div className="table-responsive">
              <table className="table job-alert-table">
                <thead>
                  <tr>
                    <th scope="col">Job Title</th>
                    <th scope="col">Applicants</th>
                    <th scope="col">Assessment</th>
                    <th scope="col">Interview</th>
                    <th scope="col">Offering</th>
                    <th scope="col">Remaining SLA</th>
                    <th scope="col">Recruiter</th>
                    <th scope="col">EFPK</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody className="border-0">
                  {newJobData.map((data) => {
                    return (
                      <EmployJobItem
                        key={data.jobId}
                        jobTitle={`${data.jobPosition}`}
                        jobDeparment={`${data.jobDepartment}`}
                        jobStatus={`Status: ${data.jobStatus}`}
                        jobEndPosted={`End Posted: ${data.jobEndPosted}`}
                        jobApplicants={data.jobApplicants}
                        jobApplicantsAssessment={data.jobApplicantsAssessment}
                        jobApplicantsInterview={data.jobApplicantsInterview}
                        jobApplicantsOffering={data.jobApplicantsOffering}
                        jobRemainingSLA={data.jobRemainingSLA}
                        jobRecruiter={data.jobRecruiter}
                        jobFpkStatus={data.jobFpkStatus}
                      />
                    );
                  })}

                  {/* <EmployJobItem
                    title="Marketing Specialist"
                    info="Part-time . Uk"
                    application="20"
                    date="13 Aug, 2023"
                    status="pending"
                  />

                  <EmployJobItem
                    title="Accounting Manager"
                    info="Fulltime . USA"
                    application="278"
                    date="27 Sep, 2023"
                    status="expired"
                  />

                  <EmployJobItem
                    title="Developer for IT company"
                    info="Fulltime . Germany"
                    application="70"
                    date="14 Feb, 2023"
                    status="active"
                  /> */}
                </tbody>
              </table>
            </div>
          </div>
          {/* <div className="tab-pane fade" id="a2" role="tabpanel">
            <div className="table-responsive">
              <table className="table job-alert-table">
                <thead>
                  <tr>
                    <th scope="col">Title</th>
                    <th scope="col">Job Created</th>
                    <th scope="col">Applicants</th>
                    <th scope="col">Status</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody className="border-0">
                  <EmployJobItem
                    title="Marketing Specialist"
                    info="Part-time . Uk"
                    application="20"
                    date="13 Aug, 2023"
                    status="pending"
                  />

                  <EmployJobItem
                    title="Brand & Producr Designer"
                    info="Fulltime . Spain"
                    application="130"
                    date="05 Jun, 2023"
                    status="active"
                  />

                  <EmployJobItem
                    title="Developer for IT company"
                    info="Fulltime . Germany"
                    application="70"
                    date="14 Feb, 2023"
                    status="active"
                  />

                  <EmployJobItem
                    title="Accounting Manager"
                    info="Fulltime . USA"
                    application="278"
                    date="27 Sep, 2023"
                    status="expired"
                  />
                </tbody>
              </table>
            </div>
          </div> */}
        </div>
      </div>

      <div className="d-flex justify-content-center mt-30">
        <Pagination
          pageRangeDisplayed={3}
          totalData={jobData.length}
          disabled={searchQuery ? true : false}
        />
        {/* <ul className="style-none d-flex align-items-center">
          <li>
            <a href="#" className="active">
              1
            </a>
          </li>
          <li>
            <a href="#">2</a>
          </li>
          <li>
            <a href="#">3</a>
          </li>
          <li>..</li>
          <li>
            <a href="#">7</a>
          </li>
          <li>
            <a href="#">
              <i className="bi bi-chevron-right"></i>
            </a>
          </li>
        </ul> */}
      </div>
    </>
  );
};

export default EmployJobArea;
