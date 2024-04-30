'use server';

import nodemailer from 'nodemailer';
import { deleteSession, getUserSession, setUserSession, Utils } from '../Sessions';
import { updateVerifiedUserEmail } from '.';

let transporter = nodemailer.createTransport({
  pool: true,
  host: 'mail.erajaya.com',
  port: 465,
  secure: true,
  auth: {
    user: 'intern-fatkhur.rozak@erajaya.com',
    pass: 'Gudanggaram76#'
  },
});

/* Verify Connection */
const isReady = async () => await transporter.verify();

/**
 * 
 * @param payload OBject contains email property of user.
 */
export async function sendOTP(payload: { email: string }) {
  const COUNT = 6;
  let generatedNumber: number[] = [];
  for(let index = 0; index <  COUNT; index++) {
    const randomNumber = Math.floor(Math.random() * 9);
    generatedNumber.push(randomNumber);
  };
  const OTP = parseInt(generatedNumber.join(''));

  /**
   * Set server-side cookies
   * OTP Number
   */
  await setUserSession('otp', { email: payload.email, otp: OTP }, undefined);

  /* Verify if connection is ready */
  /**
   * Code Here
   */

  const sendOTP = await transporter.sendMail({
    from: 'intern-fatkhur.rozak@erajaya.com',
    to: String(payload.email),
    subject: 'Your OTP Number',
    html: `<h3> ${OTP} </h3>`
  });

  console.info('Result of sending OTP...', sendOTP);
  /* Guard Check */
  if(!sendOTP) {
    return {
      success: false,
      message: 'Faiiled to send OTP number!'
    }
  };

  return {
    success: true,
    data: sendOTP
  };
};

export async function compareOTP(clientOTP: number, email: string) {
  /* Get otp-session */
  const otpSession = await getUserSession('otp');
  console.info('OTP SESSION ->', otpSession);
  /* Guard check */
  if(!otpSession) return { success: false, message: 'OTP number is expired or not available' };
  /**
   * Check client-otp matched server-otp
   */
  if(clientOTP === otpSession.otp) {
    console.info('Client OTP matched server-otp...');
    /* Updating email verification status */
    const updateEmailVerificationStatus = await updateVerifiedUserEmail(email);
    if(updateEmailVerificationStatus.success !== true) return { success: false, message: 'Failed to update email verification status' };
    /* Delete otp-session */
    await deleteSession('otp');
    return { success: true, message: 'Your OTP verfication is valid' }
  };

  console.info('Client OTP does not match server OTP...');

  return {
    success: false,
    message: 'Wrong OTP verfication'
  };
};