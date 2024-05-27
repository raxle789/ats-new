/**
 * list of session name.
 */
const sessionName = {
  auth: 'era-user-auth',
  reg: 'era-user-reg',
  otp: 'otp-number-verification',
  linkedin: 'era-linkedin-reg'
}

const ENCODER = new TextEncoder();
/**
 * Converted session name to hex encoded.
 */
const authSession = Buffer.from(ENCODER.encode(sessionName.auth)).toString('hex');
const regSession = Buffer.from(ENCODER.encode(sessionName.reg)).toString('hex');
const otpSession = Buffer.from(ENCODER.encode(sessionName.otp)).toString('hex');
const linkedinSession = Buffer.from(ENCODER.encode(sessionName.linkedin)).toString('hex');

export { authSession, regSession, otpSession, linkedinSession };