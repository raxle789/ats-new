'use server';

/* Next */
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
/* JWT Sign */
import { sessionEncrypt, sessionDecrypt } from "./jwt";
import { Jwt, JwtPayload } from "jsonwebtoken";
import { TypeSessionPayload } from "@/app/api/accounts/create/route";

/* Text Encoder */
const ENCODER = new TextEncoder();
/* Text Decoder */
const DECODER = new TextDecoder();

/* Session Name */
enum SessionName {
    user_auth = 'user_auth',
    user_register = 'user_register'
};

/* _AUTH SESSION */
/* Set Session */
export async function setAuthSession(payload: any, isRememberOn?: 'on' | undefined): Promise<void> {
    const name = Buffer.from(ENCODER.encode(SessionName.user_auth)).toString('hex');
    console.info(name);
    const expires = isRememberOn ? new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) : new Date(Date.now() + 5 * 60 * 1000);
    const session = await sessionEncrypt(payload);
    cookies().set(name, session, { expires: expires, httpOnly: true });
}
/* Update Session */
export async function updateAuthSession(request: NextRequest) {
    const session = request.cookies.get(await authSessionName())?.value;
    if(!session) return;

    return NextResponse.next().cookies.set({
        name: await authSessionName(),
        value: session,
        httpOnly: true,
        expires: new Date(Date.now() + 300 * 1000)
    });
}
/* Verify Auth Session Name Exist */
export const getAuthSession = (): boolean | undefined => {
    return cookies().has(Buffer.from(ENCODER.encode(SessionName.user_auth)).toString('hex'));
}
/* Get Encoded Session Name */
export const authSessionName = async (): Promise<string> => {
    return Buffer.from(ENCODER.encode(SessionName.user_auth)).toString('hex');
}
/* END _AUTH SESSION */

/* _REGISTER SESSION */
export async function SetRegisterSession(payload: TypeSessionPayload): Promise<void> {
    const name = Buffer.from(ENCODER.encode(SessionName.user_register)).toString('hex');
    const expires = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000);
    const session = await sessionEncrypt(payload);
    cookies().set(name, session, { expires: expires, httpOnly: true });
}

export const HasRegisterSession = (): boolean | undefined => {
    return cookies().has(Buffer.from(ENCODER.encode(SessionName.user_register)).toString('hex'));
}

export const RegisterSessionName = async (): Promise<string> => {
    /* Decoding session-name */
    const registerSessionName = Buffer.from(ENCODER.encode(SessionName.user_register)).toString('hex');

    return registerSessionName;
}

export async function GetRegisterSessionData(): Promise<any> {
    const sessionName = await RegisterSessionName();
    const sessionValue = cookies().get(sessionName)?.value;
    /* Decrypting session-data */
    const sessionData = await sessionDecrypt(sessionValue);

    return sessionData;
}

export async function getRegisterStepSession() {
    const session = cookies().get(await RegisterSessionName())?.value;
    if(!session) return null;
    const { header, payload, signature } = await sessionDecrypt(session);
    if(typeof payload === 'string') return null;
    return payload.next_process;
}
/* END _REGISTER SESSION */

/* Get Decrypted Value of Session */
export async function getSession() {
    const session = cookies().get(await authSessionName())?.value;
    if (!session) return null;
    return await sessionDecrypt(session);
}

