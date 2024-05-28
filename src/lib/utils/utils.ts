'use server';

import CryptoJS from 'crypto-js';
import moment from 'moment';
import * as cheerio from 'cheerio';

export async function encryptData(data) {
  const encryptedData = encodeURIComponent(
    CryptoJS.Rabbit.encrypt(
      String(data),
      process.env.NEXT_PUBLIC_SECRET_KEY,
    ).toString(),
  );

  return encryptedData;
}

export async function decryptData(data) {
  try {
    const query = decodeURIComponent(data);

    const decryptedValue = CryptoJS.Rabbit.decrypt(
      String(query),
      process.env.NEXT_PUBLIC_SECRET_KEY,
    );

    const convertString = decryptedValue.toString(CryptoJS.enc.Utf8);

    const originalValue = Number(convertString);

    return originalValue;
  } catch (e) {
    console.log(e);

    return 0;
  }
}

export async function formatHtml(
  html,
  candidate,
  jobVacancy,
  dateTime,
  author,
  meetingLink,
) {
  const dataToReplace = {
    Candidate: candidate,
    job_vacancy: jobVacancy,
    date:
      dateTime === '-' ? 'Invalid Date' : moment(dateTime).format('DD-MM-YYYY'),
    time: dateTime === '-' ? 'Invalid Time' : moment(dateTime).format('h A'),
    author: author,
    link_skill_test: meetingLink,
  };

  let newHtml = html;

  for (const [key, value] of Object.entries(dataToReplace)) {
    newHtml = newHtml.replaceAll(`:${key}`, value);
  }

  return newHtml;

  // console.info(dataToReplace);

  // const $ = cheerio.load(html);

  // $('strong').each(function () {
  //   const text = $(this).text().replace(/\s/g, '');

  //   if (text.includes(':')) {
  //     $(this).text();
  //   }

  //   // console.info($(this).text());
  // });

  // return $.html();
}
