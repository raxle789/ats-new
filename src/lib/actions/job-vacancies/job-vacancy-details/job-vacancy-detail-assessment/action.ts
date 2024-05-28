'use server';

import {
  getApplicantAndJobVacancyByCandidateIdAndJobVacancyId,
  createAssessment,
  getToken,
  assignApplicant,
  requestAssessment,
  getDepartmentByOrganizationGroupCode,
  getJobTitleByCode,
} from '@/lib/services/job-vacancies/service';
import { Status } from '@/status/applicant-status';
import moment from 'moment';
import * as util from '../utils';
import _, { assign } from 'lodash';
import * as crypto from '@/lib/utils/utils';
import {
  validateCandidateIdAndJobVacancyId,
  validateAssessmentSchema,
} from '../validation';

export async function registerAssessment(candidateId, jobVacancyId) {
  const decryptedCandidateId = await crypto.decryptData(candidateId);

  const decryptedJobVacancyId = await crypto.decryptData(jobVacancyId);

  if (decryptedCandidateId && decryptedJobVacancyId) {
    const validate = validateCandidateIdAndJobVacancyId.safeParse({
      candidateId: decryptedCandidateId,
      jobVacancyId: decryptedJobVacancyId,
    });

    if (validate.success) {
      const { candidate, jobVacancy } =
        await getApplicantAndJobVacancyByCandidateIdAndJobVacancyId(
          validate?.data?.candidateId,
          validate?.data?.jobVacancyId,
        );

      if (
        candidate &&
        !_.isEmpty(candidate) &&
        jobVacancy &&
        !_.isEmpty(jobVacancy)
      ) {
        const registerData = {
          nama: candidate?.users?.name ?? '-',
          emailpeserta: candidate?.users?.email ?? '-',
          nomorhp: candidate?.phone_number ?? '-',
          domisili:
            candidate?.addresses.filter((address) => address?.isCurrent)[0]
              ?.city ?? '-',
          pendidikan: candidate?.educations?.level ?? '-',
          institusi_pendidikan: candidate?.educations?.university_name ?? '-',
          jurusan: candidate?.educations?.major ?? '-',
          direktorat: jobVacancy?.jobFunctions?.name ?? '-',
          divisi:
            (await getDepartmentByOrganizationGroupCode(
              jobVacancy?.organizationGroupCode,
            )) ?? '-',
          departemen:
            (await getDepartmentByOrganizationGroupCode(
              jobVacancy?.organizationGroupCode,
            )) ?? '-',
          posisi: (await getJobTitleByCode(jobVacancy?.jobTitleCode)) ?? '-',
          level: jobVacancy?.positionLevels?.score ?? '-',
          source: 'database',
          id_assessment: 11642,
          id_recruiter: 11642,
          id_test: await util.getTestByLevel(jobVacancy?.positionLevel),
          mulai: moment().format('YYYY-MM-DD HH:mm:ss'),
          selesai: moment().add(3, 'days').format('YYYY-MM-DD HH:mm:ss'),
        };

        // console.info(registerData);

        // console.info(
        //   candidate?.addresses?.filter((address) => address?.isCurrent)[0]
        //     ?.city,
        // );

        const token = await getToken();

        if (token) {
          const newRegisterData = await util.convertObjectToFormData({
            // token: token,
            ...registerData,
          });

          // console.info(newRegisterData);

          const res = await requestAssessment('register', newRegisterData);

          console.info(res);

          if (res && !_.isEmpty(res)) {
            const validateSchema = validateAssessmentSchema.safeParse(res);

            if (validateSchema.success) {
              const data = await createAssessment(
                validate?.data?.candidateId,
                validate?.data?.jobVacancyId,
                validateSchema?.data?.id,
                String(validateSchema?.data?.status),
                validateSchema?.data?.mulai,
                validateSchema?.data?.selesai,
              );

              if (data && !_.isEmpty(data)) {
                return {
                  success: true,
                  message: 'Successfully Assign This Candidate to Assessment',
                };
              }

              return {
                success: false,
                message: 'Failed to Assign This Candidate to Assessment',
              };
            } else {
              console.log(validateSchema.error);

              return {
                success: false,
                message: 'Failed to Assign This Candidate to Assessment',
              };
            }
          }

          return {
            success: false,
            message: 'Failed to Assign This Candidate to Assessment',
          };
        }

        return {
          success: false,
          message: 'Failed to Assign This Candidate to Assessment',
        };
      }

      return {
        success: false,
        message: 'Failed to Assign This Candidate to Assessment',
      };
    } else {
      console.log(validate.error);

      return {
        success: false,
        message: 'Candidate or Job Vacancy Not Valid',
      };
    }
  }

  return {
    success: false,
    message: 'Candidate or Job Vacancy Not Valid',
  };
}

export async function getApplicantAssessmentDetail(candidateId, jobVacancyId) {
  const decryptedCandidateId = await crypto.decryptData(candidateId);

  const decryptedJobVacancyId = await crypto.decryptData(jobVacancyId);

  if (decryptedCandidateId && decryptedJobVacancyId) {
    const validate = validateCandidateIdAndJobVacancyId.safeParse({
      candidateId: decryptedCandidateId,
      jobVacancyId: decryptedJobVacancyId,
    });

    if (validate.success) {
      const { candidate, jobVacancy } =
        await getApplicantAndJobVacancyByCandidateIdAndJobVacancyId(
          validate?.data?.candidateId,
          validate?.data?.jobVacancyId,
        );

      if (
        candidate &&
        !_.isEmpty(candidate) &&
        jobVacancy &&
        !_.isEmpty(jobVacancy)
      ) {
        const assessmentData = await requestAssessment(
          'detail',
          null,
          candidate?.candidateStates?.candidateAssessments?.remoteId,
        );

        if (assessmentData && !_.isEmpty(assessmentData)) {
          const data = {
            jobTitle: await getJobTitleByCode(jobVacancy?.jobTitleCode),
            positionLevel: `${jobVacancy?.positionLevels?.name} (level ${jobVacancy?.positionLevel})`,
            candidateAssessmentStartDate: assessmentData?.candidate?.mulai,
            candidateAssessmentFinishedDate: assessmentData?.candidate?.selesai,
            candidateAssessmentTestName: assessmentData?.candidate?.nama_test,
            candidateAssessmentStatus: assessmentData?.candidate?.status_label,
            candidateAssesmentResult: assessmentData?.result,
          };

          return data;
        }

        return {};
      }

      return {};
    } else {
      console.log(validate.error);

      return {};
    }
  }

  return {};
}

// export async function requestAssessment(
//   handleType: 'register',
//   data: FormData,
// ) {
//   switch (handleType) {
//     case 'register':
//       return await (async () => {
//         const url = process.env.ASSESSMENT_ENDPOINT_URL;

//         const secretKey = process.env.ASSESSMENT_SECRET_KEY;

//         if (!url || !secretKey) {
//           return {};
//         }

//         try {
//           const res = await fetch(url, {
//             method: 'GET',
//             headers: {
//               Authorization: secretKey,
//             },
//           });

//           if (!res.ok) {
//             return {};
//           }

//           const token = await res.json();

//           // const requestData = data.append('token', token?.token);

//           const res2 = await fetch(`${url}/register`, {
//             method: 'POST',
//             headers: {
//               Authorization: secretKey,
//             },
//             body: data,
//           });

//           // console.info(res2);

//           if (!res2.ok) {
//             return {};
//           }

//           const registerData = await res2.json();

//           return registerData;
//         } catch (e) {
//           console.log(e);

//           return {};
//         }
//       })();
//     default:
//       return {};
//   }
// }
