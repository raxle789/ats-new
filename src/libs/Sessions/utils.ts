/**
 * list of session name.
 */
const sessionName = {
  auth: 'era-user-auth',
  reg: 'era-user-reg'
}

const ENCODER = new TextEncoder();
/**
 * Converted session name to hex encoded.
 */
const authSession = Buffer.from(ENCODER.encode(sessionName.auth)).toString('hex');
const regSession = Buffer.from(ENCODER.encode(sessionName.reg)).toString('hex');

export { authSession, regSession }