'use server';

import React from 'react';
import { getUserSession } from '@/libs/Sessions';
import JobDetailsItem from './job-details-item';
import {
  getJobVacancyData,
  candidateApplyJobVacancy,
} from '@/lib/actions/job-vacancies/action';
import CryptoJS from 'crypto-js';
import { IJobType } from '@/types/job-data-type';
import Image from 'next/image';

const JobDetailsArea = async ({ params }) => {
  // const candidateId = await (async () => {
  //   const candidateSession = await getUserSession('auth');

  //   if (candidateSession) {
  //     return candidateSession?.candidate?.id;
  //   }

  //   return false;
  // })();

  const jobVacancyData = await (async () => {
    if (params?.id) {
      return await getJobVacancyData(params?.id, true)
        .then((res) => {
          const data = res ?? {};

          // console.info(data);

          return data;
        })
        .catch((e) => {
          console.log('Failed Getting Job Vacancy Data: ', e);

          return {};
        });
    }

    return {};
  })();

  return (
    <JobDetailsItem
      jobVacancyData={jobVacancyData}
      candidateApplyJobVacancy={candidateApplyJobVacancy}
    />
  );
};

export default JobDetailsArea;
