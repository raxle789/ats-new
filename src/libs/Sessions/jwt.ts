import jwt from 'jsonwebtoken';

/**
 * 
 * @param payload Payload has any type for now, next will be "type safe"
 * @returns encrypted payload as an token value
 */
export function EncryptSession(payload: any) {
  try {
    const encrypted = jwt.sign(payload, 'sidokaredev24', {
      algorithm: 'HS256',
      issuer: 'ats-developers'
    });

    return encrypted;
  } catch (error) {
    console.error('erro while encryptin session', error);
    return false;
  }
};

/**
 *
 * @param value cookies value from server-side
 * @returns decrypted payload as an object of user-information
 */
export function DecryptSession(value: string): any {
  try {
    const decrypted = jwt.verify(value, 'sidokaredev24', { algorithms: ['HS256'] });
    return decrypted;
  } catch (error) {
    // console.error('DECRYPT ERROR \t:', error);
    return false;
  }
}