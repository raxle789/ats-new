'use server';

import { revalidatePath } from 'next/cache';
import {
  getAllFullyApprovedFpk,
  getAllFullyApprovedFpkTotal,
  searchFpk,
  getAllTaData,
  assignTaToFpk,
} from '../../../app/services/fpk/service';

export async function getFpkData(poolName, offset, perPage) {
  const data = await getAllFullyApprovedFpk(poolName, offset, perPage);

  return data;
}

export async function getFpkTotal(poolName) {
  const data = await getAllFullyApprovedFpkTotal(poolName);

  return data;
}

export async function searchFpkData(poolName, query, offset, perPage) {
  const data = await searchFpk(poolName, query, offset, perPage);

  return data;
}

export async function getTaData(poolName) {
  const data = await getAllTaData(poolName);

  return data;
}

export async function assignTa(poolName, requestNo, taId) {
  await assignTaToFpk(poolName, requestNo, taId);
}
