'use server';

import CryptoJS from 'crypto-js';

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
