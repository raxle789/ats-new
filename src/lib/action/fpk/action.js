'use server';

import { revalidatePath } from 'next/cache';
import {
  getAllFpk,
  getAllFpkTotal,
  searchFpk,
  getAllTa,
  assignTaToFpk,
} from '../../../app/services/fpk/service';

export async function getFpkData(offset, perPage) {
  const data = await getAllFpk(offset, perPage);

  return data;
}

export async function getFpkTotal() {
  const data = await getAllFpkTotal();

  return data;
}

export async function searchFpkData(query, offset, perPage) {
  const data = await searchFpk(query, offset, perPage);

  return data;
}

export async function getTaData() {
  const data = await getAllTa();

  return data;
}

export async function assignTa(efpkId, taId) {
  await assignTaToFpk(efpkId, taId);

  revalidatePath('/dashboard/ta/fpk');
}
