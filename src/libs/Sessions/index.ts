'use server';

import * as Utils from './utils';
import * as Jwt from './jwt';
/* Next-Server */
import { cookies } from 'next/headers';

/**
 * 
 * @param sessionName name of the session, auth or reg
 * @returns payload as object user-information. if fails, 'false' returned out.
 */
export async function getUserSession(sessionName: 'auth' | 'reg' | 'otp'): Promise<any> {
  switch(sessionName) {
    case 'auth':
      /* Getting both client and server */
      const authSession = cookies().get(Utils.authSession)?.value;
      if(!authSession) return false;
      const decryptedAuthSession = Jwt.DecryptSession(authSession as string);
      // console.log('Decrypted session', decryptedAuthSession);
      return decryptedAuthSession;

    case 'reg':
      const regSession = cookies().get(Utils.regSession)?.value;
      if(!regSession) return false;
      const decryptedRegSession = Jwt.DecryptSession(regSession as string);
      return decryptedRegSession;

    case 'otp':
      const otpSession = cookies().get(Utils.otpSession)?.value;
      if(!otpSession) return false;
      const decryptedOtpSession = Jwt.DecryptSession(otpSession as string);
      return decryptedOtpSession;

    default:
      return {
        message: 'Invalid session name!'
      };
  }
};

/**
 * 
 * @param sessionName name of the session that wanted to set
 * @param payload information data as an object that will stored on cookies
 * @param isRememberOn optional argument if user doesn't wants to re-logged in
 * @returns 'void' -> session is set
 */
export async function setUserSession(sessionName: 'auth' | 'reg' | 'otp', payload: any, isRememberOn?: 'on' | undefined) {
  switch(sessionName) {
    case 'auth':
      const authSessionName = Utils.authSession;
      const authExpires = isRememberOn === "on" ? new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) : new Date(Date.now() * 5 * 60 * 1000);
      const encryptedAuthSession = Jwt.EncryptSession(payload);
      /* set-session -> server */
      // cookies().set(authSessionName, encryptedAuthSession as string, { expires: authExpires, httpOnly: true });
      /* set-session -> client */
      cookies().set(authSessionName, encryptedAuthSession as string, { expires: authExpires, httpOnly: false});
      break;
    case 'reg':
      const regSessionName = Utils.regSession;
      const regExpires = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000);
      const encryptedRegSession = Jwt.EncryptSession(payload);
      /* set-session */
      cookies().set(regSessionName, encryptedRegSession as string, { expires: regExpires, httpOnly: false});
      break;
    case 'otp':
      const otpSessionName = Utils.otpSession;
      const otpExpires = new Date(Date.now() + 10 * 60 * 1000);
      const encryptedOTPsession = Jwt.EncryptSession(payload);
      /* set otp-session */
      cookies().set(otpSessionName, encryptedOTPsession as string, { expires: otpExpires, httpOnly: true });
      break;

    default:
      console.info("Invalid session name or payload!")
      break;
  };
};

export async function deleteSession(sessionName: 'auth' | 'reg' | 'otp') {
  switch(sessionName) {
    case 'auth':
      console.info('Deleting auth-session...');
      cookies().delete(Utils.authSession);
      break;
    case 'reg':
      console.info('Deleting reg-session...');
      cookies().delete(Utils.regSession);
      break;
    case 'otp':
      console.info('Deleting otp-session...');
      cookies().delete(Utils.otpSession);
      break;
  };
};

// export { Utils };