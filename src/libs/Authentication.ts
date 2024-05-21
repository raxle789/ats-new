'use server';
// import LinkedIn from "./LinkedIn";
import { cookies } from 'next/headers';
import axios from "axios";
import { users } from "@/static-data/User";
import { redirect } from 'next/navigation';

// const linkedInOAuth = new LinkedIn(["openid","profile","email"]);
// const createdLinkedInOAuth = linkedInOAuth.generateOAuthLink();

const accessToken = cookies().get('accessToken')?.value;

interface LinkedInUserInfo {
    sub: string;
    email_verified: boolean;
    name: string;
    locale: {
        country: string;
        language: string;
    };
    given_name: string;
    family_name: string;
    email: string;
    picture: string;
}

type LinkedInProfile = LinkedInUserInfo;

async function fetchLinkedInProfile(): Promise<LinkedInProfile> {
    const response = await axios.get('https://api.linkedin.com/v2/userinfo', {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });

    console.info(response.data);

    if (response.status !== 200) {
        throw new Error('Failed to fetch LinkedIn profile!');
    }

    return response.data;
}

async function insertUserStaticData(FormData: FormData) {
    const userData = {
        id: String.fromCharCode(Math.floor(Math.random() * 26) + 97),
        name: FormData.get('name')?.toString(),
        email: FormData.get('email')?.toString(),
        password: FormData.get('password')?.toString()
    };

    users.push(userData);

    redirect('/');
}

// function getSession() {
//     const isAccessTokenExist = cookies().get('accessToken')?.value;
//     console.info(`get session`);
//     console.info(isAccessTokenExist);
//     if (!isAccessTokenExist) {
//         return false;
//     }

//     return true;
// }

// type loginData = {
//     email: string | undefined;
//     password: string | undefined;
// }

// function findUsers(credential: loginData) {
//     const result = users.filter((user) => user.email === credential.email);

//     return result;
// }

async function SignOut(FormData: FormData) {
    cookies().delete('accessToken');

    redirect('/');
}

// async function SignIn(FormData: FormData) {
//     const userData: loginData = {
//         email: FormData.get('email')?.toString(),
//         password: FormData.get('password')?.toString()
//     }

//     const existUser = findUsers(userData);

//     if (existUser.length === 0) {
//         return false;
//     }

// }

export { fetchLinkedInProfile, insertUserStaticData, SignOut };