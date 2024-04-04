const sessionName = {
  auth: 'era-user-auth',
  reg: 'era-user-reg'
}

const ENCODER = new TextEncoder();

const authSession = Buffer.from(ENCODER.encode(sessionName.auth)).toString('hex');
const regSession = Buffer.from(ENCODER.encode(sessionName.reg)).toString('hex');

export { authSession, regSession }