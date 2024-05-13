'use server';

import React from 'react';
import {
  getAllJobVacancyData,
  deleteJobVacancyData,
} from '@/lib/action/job-vacancies/action';
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

// const jobData = [
//   {
//     jobId: 1,
//     jobPosition: 'Assistant Store Manager',
//     jobDepartment: 'EFN Strategy & Business Development',
//     jobStatus: 'Posted',
//     jobEndPosted: '30-06-2025',
//     jobApplicants: 4,
//     jobApplicantsAssessment: 2,
//     jobApplicantsInterview: 0,
//     jobApplicantsOffering: 4,
//     jobRemainingSLA: '36 days',
//     jobUser: 'Vladimir',
//     jobRecruiter: 'Gusti 1',
//     jobFpkStatus: 'Not Yet',
//   },
//   {
//     jobId: 2,
//     jobPosition: 'Store Manager',
//     jobDepartment: 'EFN Strategy & Business Development',
//     jobStatus: 'Posted',
//     jobEndPosted: '12-08-2026',
//     jobApplicants: 2,
//     jobApplicantsAssessment: 3,
//     jobApplicantsInterview: 4,
//     jobApplicantsOffering: 5,
//     jobRemainingSLA: '28 days',
//     jobUser: 'Vladimir',
//     jobRecruiter: 'Gusti 2',
//     jobFpkStatus: 'Done',
//   },
//   {
//     jobId: 3,
//     jobPosition: 'Assistant Store Manager',
//     jobDepartment: 'EFN Strategy & Business Development',
//     jobStatus: 'Posted',
//     jobEndPosted: '14-12-2028',
//     jobApplicants: 2,
//     jobApplicantsAssessment: 2,
//     jobApplicantsInterview: 0,
//     jobApplicantsOffering: 2,
//     jobRemainingSLA: '18 days',
//     jobUser: 'Vladimir',
//     jobRecruiter: 'Gusti 3',
//     jobFpkStatus: 'Not Yet',
//   },
//   {
//     jobId: 4,
//     jobPosition: 'Store Manager',
//     jobDepartment: 'EFN Strategy & Business Development',
//     jobStatus: 'Posted',
//     jobEndPosted: '02-06-2025',
//     jobApplicants: 3,
//     jobApplicantsAssessment: 4,
//     jobApplicantsInterview: 5,
//     jobApplicantsOffering: 6,
//     jobRemainingSLA: '12 days',
//     jobUser: 'Vladimir',
//     jobRecruiter: 'Gusti 4',
//     jobFpkStatus: 'Done',
//   },
// ];

// props type
type IProps = {
  setIsOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>;
};
const EmployJobArea = async ({ searchParams }) => {
  const page = searchParams?.page ?? '1';

  const perPage = searchParams?.perPage ?? '10';

  const searchQuery = searchParams?.query ?? '';

  const offset = (Number(page) - 1) * Number(perPage);

  const jobVacancyData = await getAllJobVacancyData(offset, Number(perPage))
    .then((res) => {
      const data = res?.data ?? [];

      const total = res?.total ?? 0;

      // console.info(data);

      return {
        data: data,
        total: total,
      };
    })
    .catch((e) => {
      console.log('Failed Getting Job Vacancy Data: ', e);

      return {
        data: [],
        total: 0,
      };
    });

  return (
    <>
      {/* <div className="job-fpk-header mb-40 lg-mb-30">
        <div className="d-sm-flex align-items-start justify-content-between mb-40 lg-mb-30">
          <h2 className="main-title m0 flex-grow-1">Job Vacancies</h2>
        </div>
        <div className="d-flex xs-mt-30 justify-content-end align-items-center">
          <SearchBar />
          <div className="short-filter d-flex align-items-center ms-3">
            <div className="text-dark fw-500 me-2">Filter by:</div>
            <EmployShortSelect />
          </div>
        </div>
      </div> */}

      {/* <div className="bg-white card-box border-20"> */}
      <EmployJobItem
        jobVacancyData={jobVacancyData}
        perPage={perPage}
        deleteJobVacancyData={deleteJobVacancyData}
      />
      {/* </div> */}

      {/* <div className="d-flex justify-content-center mt-30">
        <Pagination
          pageRangeDisplayed={3}
          totalData={jobVacancyData?.total}
          disabled={
            !jobVacancyData.data || jobVacancyData?.total <= Number(perPage)
              ? true
              : false
          }
        />
      </div> */}
    </>
  );
};

export default EmployJobArea;
