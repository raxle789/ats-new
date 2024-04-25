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
} from '../../../app/services/job-vacancies/service';
import {
  validateTaId,
  validateRequestNo,
  validateEfpk,
  validateVerticalCode,
  validateJobVacancySchema,
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

export async function getAllTaData() {
  const data = await getAllTa();

  return data;
}

export async function getAllUserData() {
  const data = await getAllUser();

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
  } else {
    console.log(validate.error);
  }
}

export async function getJobVacancyData(jobVacancyId) {
  const data = await getJobVacancy(jobVacancyId);

  return data;
}
