import * as Utils from './utils';
import * as Jwt from './jwt';
/* Next-Server */
import { cookies } from 'next/headers';

/**
 * 
 * @param sessionName name of the session, auth or reg
 * @returns payload as object user-information. if fails, 'false' returned out.
 */
export async function getUserSession(sessionName: 'auth' | 'reg'): Promise<any> {
  switch(sessionName) {
    case 'auth':
      const authSession = cookies().get(Utils.authSession)?.value;
      if(!authSession) return false;
      const decryptedAuthSession = await Jwt.DecryptSession(authSession as string);
      console.log(decryptedAuthSession);
      return decryptedAuthSession;

    case 'reg':
      const regSession = cookies().get(Utils.regSession)?.value;
      if(!regSession) return false;
      const decryptedRegSession = await Jwt.DecryptSession(regSession as string);
      return decryptedRegSession;

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
export async function setUserSession(sessionName: 'auth' | 'reg', payload: any, isRememberOn?: 'on' | undefined) {
  switch(sessionName) {
    case 'auth':
      const authSessionName = Utils.authSession;
      const authExpires = isRememberOn ? new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) : new Date(Date.now() * 5 * 60 * 1000);
      const encryptedAuthSession = await Jwt.EncryptSession(payload);
      /* set-session */
      cookies().set(authSessionName, encryptedAuthSession as string, { expires: authExpires, httpOnly: true });
      break;
    case 'reg':
      const regSessionName = Utils.regSession;
      const regExpires = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000);
      const encryptedRegSession = await Jwt.EncryptSession(payload);
      /* set-session */
      cookies().set(regSessionName, encryptedRegSession as string, { expires: regExpires, httpOnly: true});
      break;

    default:
      console.info("Invalid session name or payload!")
      break;
  }
}

export { Utils };