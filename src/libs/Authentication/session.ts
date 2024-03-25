'use server';

/* Next */
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
/* JWT Sign */
import { sessionEncrypt, sessionDecrypt } from "./jwt";

/* Text Encoder */
const ENCODER = new TextEncoder();
/* Text Decoder */
const DECODER = new TextDecoder();

/* Session Name */
enum SessionName {
    user_auth = 'user_auth'
};
/* Set Session */
export async function setSession(payload: any, isRememberOn?: 'on' | undefined) {
    const name = Buffer.from(ENCODER.encode(SessionName.user_auth)).toString('hex');
    console.info(name);
    const expires = isRememberOn ? new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) : new Date(Date.now() + 5 * 60 * 1000);
    const session = await sessionEncrypt(payload);
    cookies().set(name, session, { expires: expires, httpOnly: true });
}
/* Update Session */
export async function updateSession(request: NextRequest) {
    const session = request.cookies.get(await authSessionName())?.value;
    if(!session) return;
    
    return NextResponse.next().cookies.set({
        name: await authSessionName(),
        value: session,
        httpOnly: true,
        expires: new Date(Date.now() + 300 * 1000)
    });
}
/* Get Decrypted Value of Session */
export async function getSession() {
    const session = cookies().get(await authSessionName())?.value;
    if (!session) return null;
    return await sessionDecrypt(session);
}
/* Verify Auth Session Name Exist */
export const getAuthSession = (): boolean | undefined => {
    return cookies().has(Buffer.from(ENCODER.encode(SessionName.user_auth)).toString('hex'));
}
/* Get Encoded Session Name */
export const authSessionName = (): string => {
    return Buffer.from(ENCODER.encode(SessionName.user_auth)).toString('hex');
}

