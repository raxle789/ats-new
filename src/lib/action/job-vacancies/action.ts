'use server';

import {
  getAllEfpkByTa,
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
  editJobVacancy,
  applyJobVacancy,
  candidateAlreadyApplyJobVacancy,
} from '../../../app/services/job-vacancies/service';
import { getUserSession } from '@/libs/Sessions';
import _ from 'lodash';
import moment from 'moment';
import { permanentRedirect } from 'next/navigation';
import CryptoJS from 'crypto-js';
import { revalidatePath } from 'next/cache';
import {
  validateTaId,
  validateRequestNo,
  validateEfpk,
  validateVerticalCode,
  validateJobVacancySchema,
  validateJobVacancyId,
  validateCandidateApply,
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
  const decryptedTaId = (() => {
    if (taId) {
      try {
        const query = decodeURIComponent(taId);

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

  const validate = validateJobVacancySchema.safeParse({
    ...values,
    taId: decryptedTaId,
  });

  if (validate.success) {
    await createJobVacancy(validate?.data?.taId, validate?.data);

    revalidatePath('/jobs');

    revalidatePath('/dashboard/ta/jobs');

    permanentRedirect('/dashboard/ta/jobs');
  } else {
    console.log(validate.error);
  }
}

export async function getJobVacancyData(jobVacancyId, isCandidateView = false) {
  const data = await getJobVacancy(jobVacancyId);

  const session = await getUserSession('auth');

  if (isCandidateView) {
    if (data && !_.isEmpty(data)) {
      const newData = {
        jobId: encodeURIComponent(
          CryptoJS.Rabbit.encrypt(
            String(data?.id),
            process.env.NEXT_PUBLIC_SECRET_KEY,
          ).toString(),
        ),
        jobTitleAliases: data?.jobTitleAliases,
        jobDescription: data?.jobDescription,
        jobRequirement: data?.jobRequirement,
        verticalName: data?.verticals?.name,
        jobFunctionName: data?.jobFunctions?.name,
        workLocation: await getWorkLocationByLocationCode(data?.locationCode),
        positionLevelName: data?.positionLevels?.name,
        jobTypeName: data?.employmentStatus?.name,
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
          const candidateAlreadyApply = await candidateAlreadyApplyJobVacancy(
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

      // for await (const d of data?.jobVacancyRequirements) {
      //   let newValue = null;

      //   if (d?.value) {
      //     newData = {
      //       ...newData,
      //       [`${d?.requirementFields?.name}ParameterCheckbox`]: true,
      //     };

      //     const parserFunctions = require('../requirement-parsers/action');

      //     const parserFunction =
      //       parserFunctions[
      //         d?.requirementFields?.requirementFieldParsers?.name
      //       ];

      //     newValue = await parserFunction(d?.value, true);
      //   } else {
      //     newData = {
      //       ...newData,
      //       [`${d?.requirementFields?.name}ParameterCheckbox`]: false,
      //     };

      //     newValue = null;
      //   }

      //   newData = { ...newData, [d?.requirementFields?.name]: newValue };
      // }
    }

    return {};
  } else {
    if (data && !_.isEmpty(data)) {
      let newData = {
        jobId: encodeURIComponent(
          CryptoJS.Rabbit.encrypt(
            String(data?.id),
            process.env.NEXT_PUBLIC_SECRET_KEY,
          ).toString(),
        ),
        jobEfpk:
          data?.efpkJobVacancies?.length > 0
            ? data?.efpkJobVacancies[0]?.efpkRequestNo
            : '',
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
        jobRegion: data?.locationGroupCode,
        jobWorkLocation: data?.locationCode,
        jobWorkLocationAddress: data?.workLocationAddress,
        jobPublishedDateAndExpiredDate: [
          data?.publishedDate,
          data?.expiredDate,
        ],
        jobDescription: data?.jobDescription,
        jobRequirement: data?.jobRequirement,
        jobVacancyRequirements: data?.jobVacancyRequirements,
        // ageParameterCheckbox:
        //   data?.jobVacancyRequirements.length > 0 &&
        //   data?.jobVacancyRequirements?.some(
        //     (d) => d?.requirementFields?.name === 'age',
        //   )
        //     ? true
        //     : false,
        // ageParameter:
        //   data?.jobVacancyRequirements?.length > 0 &&
        //   data?.jobVacancyRequirements?.some(
        //     (d) => d?.requirementFields?.name === 'age',
        //   )
        //     ? Number(
        //         data.jobVacancyRequirements.find(
        //           (d) => d?.requirementFields?.name === 'age',
        //         )?.value,
        //       )
        //     : 0,
        // genderParameterCheckbox:
        //   data?.jobVacancyRequirements.length > 0 &&
        //   data?.jobVacancyRequirements?.some(
        //     (d) => d?.requirementFields?.name === 'gender',
        //   )
        //     ? true
        //     : false,
        // genderParameter:
        //   data?.jobVacancyRequirements?.length > 0 &&
        //   data?.jobVacancyRequirements?.some(
        //     (d) => d?.requirementFields?.name === 'gender',
        //   )
        //     ? Number(
        //         data.jobVacancyRequirements.find(
        //           (d) => d?.requirementFields?.name === 'gender',
        //         )?.value,
        //       )
        //     : 0,
        jobVideoInterview: data?.isVideoInterview,
        jobAutoAssessment: data?.isAutoAssessment,
        jobConfidential: data?.isConfidential,
        jobCareerFest: data?.isCareerFest,
        jobTaCollaborator: data?.jobVacancyTaCollaborators?.map((d) => d?.taId),
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
}

export async function getAllJobVacancyData(offset, perPage) {
  const data = await getAllJobVacancy(offset, perPage);

  const session = await getUserSession('auth');

  const newData = await Promise.all(
    data?.data?.map(async (d) => {
      const data = {
        jobId: encodeURIComponent(
          CryptoJS.Rabbit.encrypt(
            String(d?.id),
            process.env.NEXT_PUBLIC_SECRET_KEY,
          ).toString(),
        ),
        jobTitleName: await getJobTitleByCode(d?.jobTitleCode),
        jobTitleAlias: d?.jobTitleAliases,
        positionLevelName: d?.positionLevels?.name,
        jobFunctionName: d?.jobFunctions?.name,
        departmentName: await getDepartmentByOrganizationGroupCode(
          d?.organizationGroupCode,
        ),
        workLocation: await getWorkLocationByLocationCode(d?.locationCode),
        publishedDate: moment(d.publishedDate, 'YYYY-MM-DD').format(
          'DD-MMM-YYYY',
        ),
        status: moment(d?.expiredDate, 'YYYY-MM-DD').isSameOrAfter(moment())
          ? 'Posted'
          : 'Expired',
        endPosted: moment(d?.expiredDate, 'YYYY-MM-DD').format('DD-MMM-YYYY'),
        applicants:
          d?.candidateStates?.length <= 0 ? 0 : d?.candidateStates?.length,
        assessment:
          d?.candidateStates?.length <= 0 ? 0 : d?.candidateStates?.length,
        interview:
          d?.candidateStates?.length <= 0 ? 0 : d?.candidateStates?.length,
        sla: await (async () => {
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

          return different < 0 ? `0 days` : `${different} days`;
        })(),
        user: await getEfpkInitiatorNameByRequestNo(
          d?.efpkJobVacancies[0]?.efpkRequestNo,
        ),
        recruiter: d?.ta?.name,
        efpkStatus: d?.efpkJobVacancies?.length > 0 ? 'Done' : 'Not Yet',
      };

      if (session) {
        const isCandidateAlreadyApply = await (async () => {
          const candidateAlreadyApply = await candidateAlreadyApplyJobVacancy(
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
      }

      return {
        ...data,
        candidateAlreadyApply: false,
      };
    }),
  );

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
    total: data.total,
  };
}

export async function updateJobVacancy(taId, jobVacancyId, values) {
  const decryptedJobVacancyId = (() => {
    if (jobVacancyId) {
      try {
        const query = decodeURIComponent(jobVacancyId);

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

  const decryptedTaId = (() => {
    if (taId) {
      try {
        const query = decodeURIComponent(taId);

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

  const validateId = validateJobVacancyId.safeParse({
    jobVacancyId: decryptedJobVacancyId,
  });

  if (validateId.success) {
    const validateSchema = validateJobVacancySchema.safeParse({
      ...values,
      taId: decryptedTaId,
    });

    if (validateSchema.success) {
      await editJobVacancy(
        decryptedTaId,
        validateId?.data?.jobVacancyId,
        validateSchema?.data,
      );

      revalidatePath('/jobs');

      revalidatePath('/dashboard/ta/jobs');

      permanentRedirect('/dashboard/ta/jobs');
    } else {
      console.log(validateSchema.error);
    }
  } else {
    console.log(validateId.error);
  }
}

export async function candidateApplyJobVacancy(jobVacancyId) {
  const session = await getUserSession('auth');

  // console.info(session.candidate.id);

  const decryptedJobVacancyId = (() => {
    if (jobVacancyId) {
      try {
        const query = decodeURIComponent(jobVacancyId);

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

  const validate = validateCandidateApply.safeParse({
    candidateId: session?.candidate?.id,
    jobVacancyId: decryptedJobVacancyId,
  });

  if (validate.success) {
    await applyJobVacancy(
      validate?.data?.candidateId,
      validate?.data?.jobVacancyId,
    );
  } else {
    console.log(validate.error);
  }
}
