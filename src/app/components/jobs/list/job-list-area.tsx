'use server';

import React from 'react';
// import { getUserSession } from '@/libs/Sessions';
// import Pagination from '@/ui/pagination';
import {
  getAllJobVacancyData,
  candidateApplyJobVacancy,
} from '@/lib/actions/job-vacancies/action';
import JobListItem from './job-list-item';
import dynamic from 'next/dynamic';
// import JobFilter from '../filter/job-filter';

type Props = {
  searchParams: {} | any;
};

const JobList: React.FC<Props> = async ({ searchParams }) => {
  const DynamicFilter = dynamic(() => import('../filter/job-filter'));
  const page = searchParams?.page ?? '1';
  const perPage = searchParams?.perPage ?? '10';
  const searchQuery = searchParams?.query ?? '';
  const offset = (Number(page) - 1) * Number(perPage);
  // const candidateId = await (async () => {
  //   const candidateSession = await getUserSession('auth');
  //   if (candidateSession) {
  //     return candidateSession?.candidate?.id;
  //   }
  //   return false;
  // })();
  const jobVacancyData = await getAllJobVacancyData(
    offset,
    Number(perPage),
    true,
  )
    .then((res) => {
      const data = res?.data ?? [];
      const total = res?.total ?? 0;
      console.info(data);
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
  // const candidateAlreadyApply = () => {
  //   if (candidateId) {
  //   }
  // };
  return (
    <section className="job-listing-three pt-110 lg-pt-80 pb-160 xl-pb-150 lg-pb-80">
      <div className="container">
        <div className="row">
          <DynamicFilter />
          <JobListItem
            jobVacancyData={jobVacancyData}
            perPage={perPage}
            candidateApplyJobVacancy={candidateApplyJobVacancy}
          />
        </div>
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
      </div>
    </section>
  );
};

export default JobList;
