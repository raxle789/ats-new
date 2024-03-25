'use server';

import jwt from "jsonwebtoken";

const privateKey = 'atsphase2';
export async function sessionEncrypt(payload: any) {
    return await jwt.sign(payload, privateKey, {
        algorithm: 'HS256',
        header: {
            alg: 'HS256',
            typ: 'JWT',
        },
        issuer: 'hc-database-taeb'
    });
};

export async function sessionDecrypt(value: string) {
    const decrypted = await jwt.verify(value, privateKey, {
        algorithms: ['HS256'],
        complete: true,
    });

    return decrypted;
}