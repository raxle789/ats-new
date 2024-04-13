'use server';

import { revalidatePath } from 'next/cache';
import { validateEfpkSchema } from './validation';
import {
  getAllFpk,
  getAllFpkTotal,
  searchFpk,
  getAllTa,
  assignTaToFpk,
} from '../../../app/services/fpk/service';

const moment = require('moment');

async function convertDate(dateTime) {
  // const monthNames = [
  //   'Jan',
  //   'Feb',
  //   'Mar',
  //   'Apr',
  //   'May',
  //   'Jun',
  //   'Jul',
  //   'Aug',
  //   'Sep',
  //   'Okt',
  //   'Nov',
  //   'Des',
  // ];

  if (!dateTime) {
    return 'Undefined';
  } else {
    if (typeof dateTime === 'string') {
      const newDate = await moment(dateTime, 'DD/MM/YYYY').format(
        'DD-MMM-YYYY',
      );

      return newDate.toString();
    } else {
      // const date = new Date(dateTime);
      // const day = String(date.getDate());
      // const month = monthNames[date.getMonth()];
      // const year = String(date.getFullYear());
      // return `${day}-${month}-${year}`;

      const newDate = await moment(dateTime, 'YYYY-MM-DD').format(
        'DD-MMM-YYYY',
      );

      return newDate.toString();
    }
  }
}

export async function getFpkData(offset, perPage) {
  const data = await getAllFpk(offset, perPage);

  if (data?.data) {
    await Promise.all(
      data?.data?.map(async (d) => {
        d.createDate = await convertDate(d?.createDate);

        d.approvalDate = await convertDate(d?.approvalDate);
      }),
    );
  }

  return data;
}

export async function getFpkTotal() {
  const data = await getAllFpkTotal();

  return data;
}

export async function searchFpkData(query, offset, perPage) {
  const data = await searchFpk(query, offset, perPage);

  if (data?.data) {
    await Promise.all(
      data?.data?.map(async (d) => {
        d.createDate = await convertDate(d?.createDate);

        d.approvalDate = await convertDate(d?.approvalDate);
      }),
    );
  }

  return data;
}

export async function getTaData() {
  const data = await getAllTa();

  return data;
}

export async function assignTa({ efpkRequestNo, taId }) {
  const validate = await validateEfpkSchema.safeParse({ efpkRequestNo, taId });

  if (validate.success) {
    await assignTaToFpk(efpkRequestNo, taId);

    revalidatePath('/dashboard/ta/fpk');
  } else {
    console.log(validate.error);
  }
}
