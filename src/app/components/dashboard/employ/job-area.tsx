'use client';

import React from 'react';
import Link from 'next/link';
// import DashboardHeader from '../candidate/dashboard-header';
import EmployJobItem from './job-item';
import SearchBar from '@/ui/search-bar';
import EmployShortSelect from './short-select';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import Pagination from '@/ui/pagination';
// import Image from 'next/image';
// import search from '@/assets/dashboard/images/icon/icon_10.svg';
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

      <div className="job-fpk-header mb-40 lg-mb-30">
        <div className="d-sm-flex align-items-start justify-content-between mb-40 lg-mb-30">
          <h2 className="main-title m0 flex-grow-1">Job Vacancies</h2>
        </div>
        <div className="nav-bar-responsive d-flex align-items-center justify-content-center mb-20 pb-3 overflow-auto">
          <Link href="#" className="d-flex flex-column align-items-center me-4">
            <span>0</span>
            <span>Total</span>
          </Link>
          <Link href="#" className="d-flex flex-column align-items-center me-4">
            <span>0</span>
            <span>Open</span>
          </Link>
          <Link href="#" className="d-flex flex-column align-items-center me-4">
            <span>0</span>
            <span className="text-center">Process</span>
          </Link>
          <Link href="#" className="d-flex flex-column align-items-center me-4">
            <span>0</span>
            <span>Hold</span>
          </Link>
          <Link href="#" className="d-flex flex-column align-items-center me-4">
            <span>0</span>
            <span>Closed</span>
          </Link>
        </div>
        <div className="d-flex xs-mt-30 justify-content-end align-items-center">
          <SearchBar />
          <div className="short-filter d-flex align-items-center ms-3">
            <div className="text-dark fw-500 me-2">Filter by:</div>
            <EmployShortSelect />
          </div>
        </div>
      </div>

      <div className="bg-white card-box border-20">
        <EmployJobItem jobData={newJobData} />
      </div>

      <div className="d-flex justify-content-center mt-30">
        <Pagination
          pageRangeDisplayed={3}
          totalData={jobData.length}
          disabled={searchQuery ? true : false}
        />
      </div>
    </>
  );
};

export default EmployJobArea;
