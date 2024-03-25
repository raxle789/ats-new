'use server';

/* Next.Js */
import { redirect } from "next/navigation";
/* Database */
import CloudAppDataStore, { isEstablished, LocalAppDataStore } from "../MsSQL";
import { Users } from "../MsSQL/Entity/users";
/* Dependencies */
import bcrypt from 'bcrypt';
/* Session */
import { setSession, authSessionName } from "./session";
import { cookies } from "next/headers";
/* Utils */

type TypeAuthorize = {
    email: string;
    password: string;
    remember_me?: 'on' | undefined;
}

export async function Authorize(authorizeData: TypeAuthorize) {
    /* Check Established Connection */
    await isEstablished('cloud');
    /* Get user account */
    const userAccount = await CloudAppDataStore.manager.findOneBy(Users, { email: authorizeData.email });
    if (userAccount === null) {
        return {
            authorize:  'fail',
            message: 'User Account Doesn&lsquo;t exist:!',
            data: {}
        }
    }
    /* Compare password */
    const match = await bcrypt.compare(authorizeData.password, userAccount.password);
    if (!match) {
        return {
            authorize: 'fail',
            message: 'Password mismatch:!',
            data: {}
        }
    }

    /* Define Payload for Cookies */
    const payload = {
        user: {
            id: userAccount.id,
            name: userAccount.name,
            email: userAccount.email
        }
    }

    /* Set Session Cookies */
    await setSession(payload, authorizeData.remember_me);
    console.log('This come from authorize server-side');
    console.log(userAccount);

    return {
        authorize: 'success',
        message: 'Login Successfully:!',
        data: {
            name: userAccount.name
        }
    };
};

export async function SignUp() {

}

export async function SignOut() {
    cookies().delete(await authSessionName());
}