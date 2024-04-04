'use server';

import {
  getAllPositionLevelRequirement,
  getLineIndustry,
  getPositionLevel,
  getEducationLevel,
  getAllPositionLevel,
  getAllEducationLevel,
  getAllLineIndustry,
  getPositionLevelRequirement,
  setPositionLevelRequirement,
  searchPositionLevelRequirement,
  getUser,
} from '../../../app/services/positionRequirement/service';
import { revalidatePath } from 'next/cache';

export async function getAllPositionLevelRequirementData(offset, perPage) {
  const data = await getAllPositionLevelRequirement(offset, perPage);

  return data;
}

export async function searchPositionLevelRequirementData(
  query,
  offset,
  perPage,
) {
  const data = await searchPositionLevelRequirement(query, offset, perPage);

  return data;
}

// export async function getUserData() {
//   const data = await getUser();

//   return data;
// }

export async function getPositionLevelRequirementData(positionLevelId) {
  const data = await getPositionLevelRequirement(positionLevelId);

  return data;
}

export async function getAllPositionLevelData() {
  const data = await getAllPositionLevel();

  return data;
}

export async function getAllLineIndustryData() {
  const data = await getAllLineIndustry();

  return data;
}

export async function getAllEducationLevelData() {
  const data = await getAllEducationLevel();

  return data;
}

export async function setPositionLevelRequirementData(values) {
  const positionLevelId = await values?.positionLevelId;

  for (const [key, value] of Object?.entries(values)) {
    if (key !== 'positionLevelId') {
      if (key === 'line_industry') {
        await setPositionLevelRequirement(
          positionLevelId,
          key,
          JSON.stringify(value),
        );
      } else if (key === 'salary') {
        await setPositionLevelRequirement(
          positionLevelId,
          key,
          JSON.stringify([value.start_salary, value.end_salary]),
        );
      } else {
        await setPositionLevelRequirement(positionLevelId, key, String(value));
      }
    }
  }

  revalidatePath('/dashboard/ta/parameter');
}

export async function getEducationLevelData(educationLevelId) {
  const data = await getEducationLevel(educationLevelId);

  return data;
}

export async function getPositionLevelData(positionLevelId) {
  const data = await getPositionLevel(positionLevelId);

  return data;
}

export async function getLineIndustryData(lineIndustryId) {
  const data = await getLineIndustry(lineIndustryId);

  return data;
}
