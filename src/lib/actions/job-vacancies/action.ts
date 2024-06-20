'use server';

import {
  getAllEfpkByTa,
  getAllApplicantTotalByJobVacancyIdAndStateName,
  getAllApplicantTotalByJobVacancyId,
  getEfpkByRequestNo,
  getAllJobTitle,
  getAllJobFunction,
  getAllEmploymentStatus,
  getAllPositionLevel,
  getAllVertical,
  getAllDepartment,
  getAllLineIndustry,
  getAllRegion,
  getAllWorkLocation,
  getAllGender,
  getAllSkill,
  getAllCertificate,
  getAllTa,
  getAllUser,
  getAllDepartmentByVertical,
  createJobVacancy,
  getJobVacancy,
  getAllJobVacancy,
  getJobTitleByCode,
  getDepartmentByOrganizationGroupCode,
  getWorkLocationByLocationCode,
  getLastEfpkApprovalByRequestNo,
  getEfpkInitiatorNameByRequestNo,
  updateJobVacancy,
  applyJobVacancy,
  candidateAlreadyApplyJobVacancy,
  deleteJobVacancy,
} from '../../services/job-vacancies/service';
import * as crypto from '@/lib/utils/utils';
import { getUserSession } from '@/libs/Sessions';
import _ from 'lodash';
import moment from 'moment';
import {
  validateTaId,
  validateRequestNo,
  validateEfpk,
  validateVerticalCode,
  validateJobVacancySchema,
  validateJobVacancyId,
  validateCandidateIdAndJobVacancyId,
} from './validation';

export async function getAllEfpkDataByTa(taId) {
  const validate = validateTaId.safeParse({ taId });

  if (validate.success) {
    const data = await getAllEfpkByTa(validate?.data?.taId);

    return data;
  } else {
    console.log(validate.error);

    return [];
  }
}

export async function getEfpkDataByRequestNo(requestNo) {
  const validate = validateRequestNo.safeParse({ requestNo });

  if (validate.success) {
    const data = await getEfpkByRequestNo(validate?.data?.requestNo);

    const validateResult = validateEfpk.safeParse(data);

    if (validateResult.success) {
      return validateResult?.data;
    } else {
      console.log(validateResult.error);

      return {};
    }
  } else {
    console.log(validate.error);

    return {};
  }
}

export async function getAllJobTitleData() {
  const data = await getAllJobTitle();

  return data;
}

// export async function getAllAliasesJobTitle() {
//   try {
//     const data = await prisma.jobTitles.findMany();

//     const aliasedData = data?.map((d) => {
//       return {
//         value: d?.id,
//         label: d?.name,
//       };
//     });

//     return aliasedData;
//   } catch (e) {
//     console.log(e);

//     return [];
//   }
// }

export async function getAllJobFunctionData() {
  const data = await getAllJobFunction();

  return data;
}

export async function getAllEmploymentStatusData() {
  const data = await getAllEmploymentStatus();

  return data;
}

export async function getAllPositionLevelData() {
  const data = await getAllPositionLevel();

  return data;
}

export async function getAllVerticalData() {
  const data = await getAllVertical();

  return data;
}

export async function getAllDepartmentData() {
  const data = await getAllDepartment();

  return data;
}

export async function getAllLineIndustryData() {
  const data = await getAllLineIndustry();

  return data;
}

export async function getAllRegionData() {
  const data = await getAllRegion();

  return data;
}

export async function getAllWorkLocationData() {
  const data = await getAllWorkLocation();

  return data;
}

export async function getAllGenderData() {
  const data = await getAllGender();

  return data;
}

export async function getAllSkillData() {
  const data = await getAllSkill();

  return data;
}

export async function getAllCertificateData() {
  const data = await getAllCertificate();

  return data;
}

export async function getAllTaData(taId) {
  const data = await getAllTa(taId);

  return data;
}

export async function getAllUserData(userId) {
  const data = await getAllUser(userId);

  return data;
}

export async function getAllDepartmentDataByVertical(verticalCode) {
  const validate = validateVerticalCode.safeParse({ verticalCode });

  if (validate.success) {
    const data = await getAllDepartmentByVertical(validate?.data?.verticalCode);

    return data;
  } else {
    console.log(validate.error);

    return [];
  }
}

export async function insertJobVacancy(taId, values) {
  const decryptedTaId = await crypto.decryptData(taId);

  // console.info(values);

  if (decryptedTaId) {
    const validate = validateJobVacancySchema.safeParse({
      ...values,
      taId: decryptedTaId,
    });

    if (validate.success) {
      const data = await createJobVacancy(validate?.data?.taId, validate?.data);

      if (data) {
        return {
          success: true,
          message: 'Successfully Create A New Job Vacancy',
        };
      } else {
        return {
          success: false,
          message: 'Please Try Again Later',
        };
      }
    } else {
      console.log(validate.error);

      return {
        success: false,
        message: 'Failed Creating A New Job Vacancy, Please Check Your Input',
      };
    }
  }

  return {
    success: false,
    message: 'Failed Creating A New Job Vacancy, Please Check Your Input',
  };
}

export async function getJobVacancyData(
  jobVacancyId,
  isCandidateView: true | false = false,
) {
  const decryptedJobVacancyId = await crypto.decryptData(jobVacancyId);

  if (decryptedJobVacancyId) {
    const validate = validateJobVacancyId.safeParse({
      jobVacancyId: decryptedJobVacancyId,
    });

    if (validate.success) {
      const data = await getJobVacancy(validate?.data?.jobVacancyId);

      const session = await getUserSession('auth');

      if (isCandidateView) {
        if (data && !_.isEmpty(data)) {
          const newData = {
            jobId: await crypto.encryptData(data?.id),
            jobTitleAliases: data?.jobTitleAliases,
            jobDescription: data?.jobDescription,
            jobRequirement: data?.jobRequirement,
            verticalName: data?.verticals?.name,
            jobFunctionName: data?.jobFunctions?.name,
            workLocation: await getWorkLocationByLocationCode(
              data?.locationCode,
            ),
            positionLevelName: data?.positionLevels?.name,
            jobTypeName: data?.employmentStatus?.alias,
            publishedDate: moment(data?.publishedDate, 'YYYY-MM-DD').format(
              'DD-MMM-YYYY',
            ),

            // jobDepartment: data?.organizationGroupCode,
            // jobLineIndustry: data?.jobVacancyLineIndustries?.map(
            //   (d) => d?.lineIndustryId,
            // ),
            // jobRegion: data?.locationGroupCode,
            // jobWorkLocationAddress: data?.workLocationAddress,
            // jobPublishedDateAndExpiredDate: [
            //   data?.publishedDate,
            //   data?.expiredDate,
            // ],
            // jobVacancyRequirements: data?.jobVacancyRequirements,
            // jobVideoInterview: data?.isVideoInterview,
            // jobAutoAssessment: data?.isAutoAssessment,
            // jobConfidential: data?.isConfidential,
            // jobCareerFest: data?.isCareerFest,
            // jobTaCollaborator: data?.jobVacancyTaCollaborators?.map((d) => d?.taId),
            // jobUserCollaborator: data?.jobVacancyUserCollaborators?.map(
            //   (d) => d?.userId,
            // ),
          };

          if (session) {
            const isCandidateAlreadyApply = await (async () => {
              const candidateAlreadyApply =
                await candidateAlreadyApplyJobVacancy(
                  session?.candidate?.id,
                  data?.id,
                );

              if (candidateAlreadyApply) {
                return true;
              }

              return false;
            })();

            return {
              ...newData,
              candidateAlreadyApply: isCandidateAlreadyApply,
            };
          }

          return {
            ...newData,
            candidateAlreadyApply: false,
          };
        }

        return {};
      } else {
        if (data && !_.isEmpty(data)) {
          let newData = {
            jobId: await crypto.encryptData(data?.id),
            jobEfpk: data?.efpkJobVacancies?.length
              ? data?.efpkJobVacancies[0]?.efpkRequestNo
              : null,
            jobTitle: data?.jobTitleCode,
            jobTitleAliases: data.jobTitleAliases,
            jobFunction: data?.jobFunctions?.id,
            jobEmploymentStatus: data?.employmentStatus?.name,
            jobPositionLevel: data?.positionLevel,
            jobVertical: data?.verticalCode,
            jobDepartment: data?.organizationGroupCode,
            jobLineIndustry: data?.jobVacancyLineIndustries?.map(
              (d) => d?.lineIndustryId,
            ),
            jobRegion: data?.regionId,
            jobWorkLocation: data?.locationCode,
            jobWorkLocationAddress: data?.workLocationAddress,
            jobPublishedDateAndExpiredDate: [
              data?.publishedDate,
              data?.expiredDate,
            ],
            jobDescription: data?.jobDescription,
            jobRequirement: data?.jobRequirement,
            jobVacancyRequirements: data?.jobVacancyRequirements,
            jobVideoInterview: data?.isVideoInterview,
            jobAutoAssessment: data?.isAutoAssessment,
            jobConfidential: data?.isConfidential,
            jobCareerFest: data?.isCareerFest,
            jobTaCollaborator: data?.jobVacancyTaCollaborators?.map(
              (d) => d?.taId,
            ),
            jobUserCollaborator: data?.jobVacancyUserCollaborators?.map(
              (d) => d?.userId,
            ),
          };

          for await (const d of data?.jobVacancyRequirements) {
            let newValue = null;

            if (d?.value) {
              newData = {
                ...newData,
                [`${d?.requirementFields?.name}ParameterCheckbox`]: true,
              };

              const parserFunctions = require('../requirement-parsers/action');

              const parserFunction =
                parserFunctions[
                  d?.requirementFields?.requirementFieldParsers?.name
                ];

              newValue = await parserFunction(d?.value, true);
            } else {
              newData = {
                ...newData,
                [`${d?.requirementFields?.name}ParameterCheckbox`]: false,
              };

              newValue = null;
            }

            newData = { ...newData, [d?.requirementFields?.name]: newValue };
          }

          return newData;
        }

        return {};
      }
    } else {
      console.log(validate.error);

      return {};
    }
  }

  return {};
}

export async function getAllJobVacancyData(
  offset,
  perPage,
  isCandidateView: true | false = false,
) {
  const data = await getAllJobVacancy(offset, perPage);

  const session = await getUserSession('auth');

  const newData = await (async () => {
    if (data?.data && data?.data?.length) {
      return await Promise.all(
        data?.data?.map(async (d) => {
          const data = await (async () => {
            if (isCandidateView) {
              return {
                jobId: await crypto.encryptData(d?.id),
                jobTitleAlias: d?.jobTitleAliases,
                positionLevelName: d?.positionLevels?.name,
                jobFunctionName: d?.jobFunctions?.name,
                workLocation: await getWorkLocationByLocationCode(
                  d?.locationCode,
                ),
                publishedDate: moment(d.publishedDate, 'YYYY-MM-DD').format(
                  'DD-MMM-YYYY',
                ),
              };
            } else {
              return {
                jobId: await crypto.encryptData(d?.id),
                jobTitleName: d?.jobTitleAliases,
                departmentName: await getDepartmentByOrganizationGroupCode(
                  d?.organizationGroupCode,
                ),
                status: moment(d?.expiredDate, 'YYYY-MM-DD').isSameOrAfter(
                  moment(),
                )
                  ? 'Posted'
                  : 'Expired',
                endPosted: moment(d?.expiredDate, 'YYYY-MM-DD').format(
                  'DD-MMM-YYYY',
                ),
                applicants: await getAllApplicantTotalByJobVacancyId(d?.id),
                assessment:
                  await getAllApplicantTotalByJobVacancyIdAndStateName(
                    d?.id,
                    'ASSESSMENT',
                  ),
                interview: await getAllApplicantTotalByJobVacancyIdAndStateName(
                  d?.id,
                  'INTERVIEW',
                ),
                sla: await (async () => {
                  if (!d?.efpkJobVacancies[0]?.efpkRequestNo) {
                    return 'Undefined';
                  }

                  const lastApprovalDate = await getLastEfpkApprovalByRequestNo(
                    d?.efpkJobVacancies[0]?.efpkRequestNo,
                  );

                  const sla = moment(lastApprovalDate, 'DD/MM/YYYY').add(
                    d?.positionLevels?.slaDays,
                    'days',
                  );

                  const different = sla.diff(
                    moment(lastApprovalDate, 'DD/MM/YYYY'),
                    'days',
                  );

                  return !different
                    ? 'Undefined'
                    : different < 0
                      ? '0 days'
                      : `${different} days`;
                })(),
                user: d?.efpkJobVacancies[0]?.efpkRequestNo
                  ? (await getEfpkInitiatorNameByRequestNo(
                      d?.efpkJobVacancies[0]?.efpkRequestNo,
                    ))
                    ? await getEfpkInitiatorNameByRequestNo(
                        d?.efpkJobVacancies[0]?.efpkRequestNo,
                      )
                    : null
                  : null,
                recruiter: d?.ta?.name,
                efpkStatus:
                  d?.efpkJobVacancies?.length > 0 ? 'Done' : 'Not Yet',
              };
            }
          })();

          if (session && isCandidateView) {
            const isCandidateAlreadyApply = await (async () => {
              const candidateAlreadyApply =
                await candidateAlreadyApplyJobVacancy(
                  session?.candidate?.id,
                  d?.id,
                );

              if (candidateAlreadyApply) {
                return true;
              }

              return false;
            })();

            return {
              ...data,
              candidateAlreadyApply: isCandidateAlreadyApply,
            };
          } else if (!session && isCandidateView) {
            return {
              ...data,
              candidateAlreadyApply: false,
            };
          } else {
            return data;
          }
        }),
      );
    }

    return [];
  })();

  // await Promise.all(
  //   data.map(async (d) => {
  //     d.jobTitleCode = await getJobTitleByCode(d?.jobTitleCode);
  //     d.organizationGroupCode = await getDepartmentByOrganizationGroupCode(
  //       d?.organizationGroupCode,
  //     );

  //     const lastApprovalDate = await getLastEfpkApprovalByRequestNo(
  //       d.efpkJobVacancies[0].efpkRequestNo,
  //     );

  //     // console.info(lastApprovalDate);

  //     // console.info({ ...d, lastApprovalDate });

  //     return { ...d, lastApprovalDate };
  //   }),
  // );

  return {
    data: newData,
    total: data?.total,
  };
}

export async function editJobVacancy(taId, jobVacancyId, values) {
  const decryptedJobVacancyId = await crypto.decryptData(jobVacancyId);

  const decryptedTaId = await crypto.decryptData(taId);

  if (decryptedJobVacancyId && decryptedTaId) {
    const validateId = validateJobVacancyId.safeParse({
      jobVacancyId: decryptedJobVacancyId,
    });

    if (validateId.success) {
      const validateSchema = validateJobVacancySchema.safeParse({
        ...values,
        taId: decryptedTaId,
      });

      if (validateSchema.success) {
        const data = await updateJobVacancy(
          decryptedTaId,
          validateId?.data?.jobVacancyId,
          validateSchema?.data,
        );

        if (data) {
          return {
            success: true,
            message: 'Successfully Edit Job Vacancy',
          };
        } else {
          return {
            success: false,
            message: 'Please Try Again Later',
          };
        }
      } else {
        console.log(validateSchema.error);

        return {
          success: false,
          message: 'Error Editing Job Vacancy, Please Check Your Input',
        };
      }
    } else {
      console.log(validateId.error);

      return {
        success: false,
        message: "Failed Editing Job Vacancy Data, Job Vacancy Doesn't Exist",
      };
    }
  }

  return {
    success: false,
    message: "Failed Editing Job Vacancy Data, Job Vacancy Doesn't Exist",
  };
}

export async function candidateApplyJobVacancy(jobVacancyId) {
  const session = await getUserSession('auth');

  // console.info(session.candidate.id);

  const decryptedJobVacancyId = await crypto.decryptData(jobVacancyId);

  if (decryptedJobVacancyId) {
    const validate = validateCandidateIdAndJobVacancyId.safeParse({
      candidateId: session?.candidate?.id,
      jobVacancyId: decryptedJobVacancyId,
    });

    if (validate.success) {
      const data = await applyJobVacancy(
        validate?.data?.candidateId,
        validate?.data?.jobVacancyId,
      );

      if (!_.isEmpty(data)) {
        return {
          success: true,
          message: 'Successfully Apply For A New Job',
        };
      } else {
        return {
          success: false,
          message: 'Please Try Again Later',
        };
      }
    } else {
      console.log(validate.error);

      return {
        success: false,
        message: 'Please Complete Your Personal Data',
      };
    }
  }

  return {
    success: false,
    message: 'Please Complete Your Personal Data',
  };
}

export async function deleteJobVacancyData(jobVacancyId) {
  const decryptedJobVacancyId = await crypto.decryptData(jobVacancyId);

  if (decryptedJobVacancyId) {
    const validate = validateJobVacancyId.safeParse({
      jobVacancyId: decryptedJobVacancyId,
    });

    if (validate.success) {
      const data = await deleteJobVacancy(validate?.data?.jobVacancyId);

      if (!_.isEmpty(data)) {
        return {
          success: true,
          message: 'Successfully Delete A Job vacancy',
        };
      } else {
        return {
          success: false,
          message: 'Please Try Again Later',
        };
      }
    } else {
      console.log(validate.error);

      return {
        success: false,
        message: "Failed Delete Job Vacancy Data, Job Vacancy Doesn't Exist",
      };
    }
  }

  return {
    success: false,
    message: "Failed Delete Job Vacancy Data, Job Vacancy Doesn't Exist",
  };
}

// export async function getAllApplicantsDataByJobVacancyId(jobVacancyId) {
//   const validate = validateJobVacancyId.safeParse({ jobVacancyId });

//   if (validate.success) {
//     const data = await getAllApplicantsByJobVacancyId(
//       validate?.data?.jobVacancyId,
//     );

//     return data;
//   } else {
//     console.log(validate.error);

//     return [];
//   }
// }

// export async function getAllApplicantsDataByJobVacancyIdAndStateName(
//   jobVacancyId,
//   stateName,
// ) {
//   const validate = validateJobVacancyIdAndStateName.safeParse({
//     jobVacancyId,
//     stateName,
//   });

//   if (validate.success) {
//     const data = await getAllApplicantsByJobVacancyIdAndStateName(
//       validate?.data?.jobVacancyId,
//       validate?.data?.stateName,
//     );

//     return data;
//   } else {
//     console.log(validate.error);

//     return [];
//   }
// }
