'use server';

import {
  getAllApplicantByJobVacancyId,
  getJobVacancy,
  getJobTitleByCode,
  getAllApplicantByJobVacancyIdAndStateName,
} from '@/app/services/job-vacancies/service';
import * as crypto from '@/lib/utils/utils';
import { calculateYearOfExperience } from './utils';
import _ from 'lodash';
import {
  validateJobVacancyId,
  validateJobVacancyIdAndStateName,
} from './validation';

export async function getJobVacancyData(jobVacancyId) {
  const decryptedJobVacancyId = await crypto.decryptData(jobVacancyId);

  if (decryptedJobVacancyId) {
    const data = await getJobVacancy(decryptedJobVacancyId);

    if (data && !_.isEmpty(data)) {
      const newData = {
        jobId: await crypto.encryptData(data?.id),
        jobTitleName: await getJobTitleByCode(data?.jobTitleCode),
        jobTitleAliases: data?.jobTitleAliases,
      };

      return newData;
    }
  }

  return {};
}

export async function getAllApplicantDataByJobVacancyId(
  jobVacancyId,
  offset,
  perPage,
) {
  const decryptedJobVacancyId = await crypto.decryptData(jobVacancyId);

  if (decryptedJobVacancyId) {
    const validate = validateJobVacancyId.safeParse({
      jobVacancyId: decryptedJobVacancyId,
    });

    if (validate.success) {
      const data = await getAllApplicantByJobVacancyId(
        validate?.data?.jobVacancyId,
        offset,
        perPage,
      );

      const newData = await (async () => {
        if (data?.data && data?.data?.length) {
          return await Promise.all(
            data?.data?.map(async (d) => {
              const data = {
                candidateId: await crypto.encryptData(d?.candidateId),
                candidateName: d?.candidates?.users?.name,
                candidateLastEducation: d?.candidates?.educations?.length
                  ? `${d?.candidates?.educations[0]?.level}/${d?.candidates?.educations[0]?.major}`
                  : null,
                candidateExpectedSalary: d?.candidates?.expected_salary,
                candidateYearOfExperience: calculateYearOfExperience(
                  d?.candidates?.working_experiences,
                ),
                candidateStatus: d?.states?.alias,
                candidateSkills: d?.candidates?.candidateSkills?.map(
                  (s) => s?.skills?.name,
                ),
                candidateScore: '100%',
              };

              return data;
            }),
          );
        }

        return [];
      })();

      return newData;
    } else {
      console.log(validate.error);

      return [];
    }
  }

  return [];
}

export async function getAllApplicantDataByJobVacancyIdAndStateName(
  jobVacancyId,
  stateName,
  offset,
  perPage,
) {
  const decryptedJobVacancyId = await crypto.decryptData(jobVacancyId);

  if (decryptedJobVacancyId && stateName) {
    const validate = validateJobVacancyIdAndStateName.safeParse({
      jobVacancyId: decryptedJobVacancyId,
      stateName,
    });

    if (validate.success) {
      const data = await getAllApplicantByJobVacancyIdAndStateName(
        validate?.data?.jobVacancyId,
        validate?.data?.stateName,
        offset,
        perPage,
      );

      return data;
    } else {
      console.log(validate.error);

      return [];
    }
  }

  return [];
}
