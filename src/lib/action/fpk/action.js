'use server';

import { revalidatePath } from 'next/cache';
import {
  getAllFullyApprovedFpk,
  getAllFullyApprovedFpkTotal,
  searchFpk,
  getAllTaData,
  assignTaToFpk,
} from '../../../app/services/fpk/service';

export async function getFpkData(offset, perPage) {
  const data = await getAllFullyApprovedFpk(offset, perPage);

  return data;
}

export async function getFpkTotal() {
  const data = await getAllFullyApprovedFpkTotal();

  return data;
}

export async function searchFpkData(query, offset, perPage) {
  const data = await searchFpk(query, offset, perPage);

  return data;
}

export async function getTaData() {
  const data = await getAllTaData();

  return data;
}

export async function assignTa(efpkId, taId) {
  await assignTaToFpk(efpkId, taId);

  revalidatePath('/dashboard/ta/fpk');
}
