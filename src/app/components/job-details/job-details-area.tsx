'use server';

import React from 'react';
import { getUserSession } from '@/libs/Sessions';
import JobDetailsItem from './job-details-item';
import {
  getJobVacancyData,
  candidateApplyJobVacancy,
} from '@/lib/action/job-vacancies/action';
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

  const jobVacancyId = (() => {
    if (params?.id) {
      try {
        const query = decodeURIComponent(params?.id);

        const decryptedValue = CryptoJS.Rabbit.decrypt(
          String(query),
          process.env.NEXT_PUBLIC_SECRET_KEY,
        );

        const convertString = decryptedValue.toString(CryptoJS.enc.Utf8);

        const originalValue = Number(convertString);

        return originalValue;
      } catch (e) {
        console.log(e);

        return false;
      }
    }

    return false;
  })();

  const jobVacancyData = await (async () => {
    if (jobVacancyId && jobVacancyId !== 0) {
      return await getJobVacancyData(jobVacancyId, true)
        .then((res) => {
          const data = res ?? {};

          // console.info(data);

          return data;
        })
        .catch((e) => {
          console.log('Error getting job vacancy data: ', e);

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
