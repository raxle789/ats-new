'use server';

import {
  getAllApplicantByJobVacancyId,
  requestAssessment,
  getJobVacancy,
  getAllApplicantTotalByJobVacancyId,
  getAllApplicantTotalByJobVacancyIdAndStateName,
  getJobTitleByCode,
  getAllApplicantByJobVacancyIdAndStateName,
} from '@/app/services/job-vacancies/service';
import { Status } from '@/status/applicant-status';
import { formatToRupiah } from '@/utils/rupiah-format';
import * as crypto from '@/lib/utils/utils';
import { calculateYearOfExperience, getLastPosition } from './utils';
import _ from 'lodash';
import {
  validateJobVacancyId,
  validateJobVacancyIdAndStateName,
} from './validation';

export async function getJobVacancyData(jobVacancyId) {
  const decryptedJobVacancyId = await crypto.decryptData(jobVacancyId);

  if (decryptedJobVacancyId) {
    const validate = validateJobVacancyId.safeParse({
      jobVacancyId: decryptedJobVacancyId,
    });

    if (validate.success) {
      const data = await getJobVacancy(validate?.data?.jobVacancyId);

      if (data && !_.isEmpty(data)) {
        const newData = {
          jobId: await crypto.encryptData(data?.id),
          jobTitleName: await getJobTitleByCode(data?.jobTitleCode),
          jobTitleAliases: data?.jobTitleAliases,
          recruiter: data?.ta?.name,
          applicant: await getAllApplicantTotalByJobVacancyId(data?.id),
          assessment: await getAllApplicantTotalByJobVacancyIdAndStateName(
            data?.id,
            'ASSESSMENT',
          ),
          interview: await getAllApplicantTotalByJobVacancyIdAndStateName(
            data?.id,
            'INTERVIEW',
          ),
          referenceCheck: await getAllApplicantTotalByJobVacancyIdAndStateName(
            data?.id,
            'REFERENCE CHECK',
          ),
          offering: await getAllApplicantTotalByJobVacancyIdAndStateName(
            data?.id,
            'OFFERING',
          ),
          mcu: await getAllApplicantTotalByJobVacancyIdAndStateName(
            data?.id,
            'MCU',
          ),
          agreement: await getAllApplicantTotalByJobVacancyIdAndStateName(
            data?.id,
            'AGREEMENT',
          ),
          onboarding: await getAllApplicantTotalByJobVacancyIdAndStateName(
            data?.id,
            'ONBOARDING',
          ),
        };

        return newData;
      }

      return {};
    } else {
      console.log(validate.error);

      return {};
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
                candidatePhoto: d?.candidates?.documents
                  .filter(
                    (item) =>
                      item?.document_types?.document_name === 'profile-photo',
                  )[0]
                  .file_base?.toString(),
                candidateName: d?.candidates?.users?.name,
                candidateLastPosition:
                  (await getLastPosition(d?.candidates?.working_experiences)) ??
                  'Fresh Graduate',
                candidateLastEducation: d?.candidates?.educations
                  ? `${d?.candidates?.educations?.level}/${d?.candidates?.educations?.major}`
                  : null,
                candidateExpectedSalary: await formatToRupiah(
                  d?.candidates?.expected_salary,
                ),
                candidateYearOfExperience:
                  (await calculateYearOfExperience(
                    d?.candidates?.working_experiences,
                  )) ?? 'Fresh Graduate',
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

      // console.info(newData[0]);

      return {
        data: newData,
        total: data?.total,
      };
    } else {
      console.log(validate.error);

      return {
        data: [],
        total: 0,
      };
    }
  }

  return {
    data: [],
    total: 0,
  };
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

      const newData = await (async () => {
        if (data?.data && data?.data?.length) {
          switch (stateName) {
            case Status.ASSESSMENT:
              return await Promise.all(
                data?.data?.map(async (d) => {
                  const assessmentData = await requestAssessment(
                    'detail',
                    null,
                    d?.candidateStateAssessments?.remoteId,
                  );

                  if (assessmentData && !_.isEmpty(assessmentData)) {
                    const data = {
                      candidateId: await crypto.encryptData(d?.candidateId),
                      candidatePhoto: d?.candidates?.documents
                        .filter(
                          (item) =>
                            item?.document_types?.document_name ===
                            'profile-photo',
                        )[0]
                        .file_base?.toString(),
                      candidateName: d?.candidates?.users?.name,
                      candidateLastPosition:
                        (await getLastPosition(
                          d?.candidates?.working_experiences,
                        )) ?? 'Fresh Graduate',
                      candidateSkills: d?.candidates?.candidateSkills?.map(
                        (s) => s?.skills?.name,
                      ),
                      candidateAssessmentStartDate:
                        assessmentData?.candidate?.mulai,
                      candidateAssessmentFinishedDate:
                        assessmentData?.candidate?.selesai,
                      candidateAssessmentTestName:
                        assessmentData?.candidate?.nama_test,
                      candidateAssessmentStatus:
                        assessmentData?.candidate?.status_label,
                      candidateScore: '100%',
                    };

                    return data;
                  }

                  return {};
                }),
              );
            default: {
              return [];
            }
          }
        }

        return [];
      })();

      return {
        data: newData,
        total: data?.total,
      };
    } else {
      console.log(validate.error);

      return {
        data: [],
        total: 0,
      };
    }
  }

  return {
    data: [],
    total: 0,
  };
}
