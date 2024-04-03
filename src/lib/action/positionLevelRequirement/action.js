'use server';

import {
  getAllPositionLevelRequirement,
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

export async function getAllLineIndustryData() {
  const data = await getAllLineIndustry();

  return data;
}

export async function getAllEducationLevelData() {
  const data = await getAllEducationLevel();

  return data;
}

export async function setPositionLevelRequirementData(
  positionLevelId,
  requirementFieldId,
  value,
) {
  await setPositionLevelRequirement(positionLevelId, requirementFieldId, value);

  revalidatePath('/dashboard/ta/parameter');
}
