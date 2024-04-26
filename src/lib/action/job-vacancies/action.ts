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
} from '../../../app/services/job-vacancies/service';
import { revalidatePath } from 'next/cache';
import {
  validateTaId,
  validateRequestNo,
  validateEfpk,
  validateVerticalCode,
  validateJobVacancySchema,
} from './validation';

const moment = require('moment');

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
  const validate = validateJobVacancySchema.safeParse(values);

  if (validate.success) {
    await createJobVacancy(taId, validate?.data);

    revalidatePath('/dashboard/ta/submit-job');

    revalidatePath('/main/jobs');
  } else {
    console.log(validate.error);
  }
}

export async function getJobVacancyData(jobVacancyId) {
  const data = await getJobVacancy(jobVacancyId);

  return data;
}

export async function getAllJobVacancyData(offset, perPage) {
  const data = await getAllJobVacancy(offset, perPage);

  const newData = await Promise.all(
    data.data.map(async (d) => {
      return {
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
