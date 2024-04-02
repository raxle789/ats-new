'use server';

import {
  getAllPositionLevelRequirement,
  searchPositionLevelRequirement,
  getUser,
} from '../../../app/services/positionRequirement/service';

export async function getPositionLevelRequirementData(offset, perPage) {
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
