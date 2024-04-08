'use server';

/* Next.Js */
import { redirect } from "next/navigation";
/* Database */
import CloudAppDataStore, { isEstablished, LocalAppDataStore } from "../MsSQL";
import { Users } from "../MsSQL/Entity/users";
/* Database Repository */
import { CandidatesRepository, CitysRepository, EducationsRepository, UserRepository, WorkingExperiencesRepository } from "../MsSQL/repository";
/* Dependencies */
import bcrypt from 'bcrypt';
/* Session */
import { setAuthSession, authSessionName, RegisterSessionName } from "./session";
import { cookies } from "next/headers";
import { Candidates } from "../MsSQL/Entity/candidates";
import { DeepPartial } from "typeorm";
/* Utils */

type TypeAuthorize = {
    email: string;
    password: string;
    remember_me?: 'on' | undefined;
}

type TypeCreateAccount = {
    name: string;
    email: string;
    password: string;
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
    await setAuthSession(payload, authorizeData.remember_me);
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

export async function CreateAccount(accountData: any) {
    /* Check Established Connection */
    await isEstablished('cloud');
    /* Hash Password */
    const hash = await bcrypt.hash(accountData.password, 10);
    /* Create User */
    const newUser = await UserRepository.create({
        name: accountData.name,
        email: accountData.email,
        password: hash
    });
    console.info(newUser);
    console.info('Saving new user...');
    const savingNewUser = await UserRepository.save(newUser);
    console.info(savingNewUser);
    console.info('New user saved successfully:!');

    return savingNewUser;
}

type TypeForeignCandidate =  {
    user: number,
    birth_city: number,
    domicile: number
}

export async function RegisterUser(payload: any, password: string): Promise<any> {
    /* Check Established Connection */
    await isEstablished('cloud');
    /* Hash user password */
    const hash = await bcrypt.hash(password, 10);
    /* Insert User */
    const newUser = UserRepository.create({
        name: payload.data.user.name,
        email: payload.data.user.email,
        password: hash
    });
    const saveUser = await UserRepository.save(newUser);
    if(!saveUser) return {
        success: false,
        message: 'Cannot add user account:!'
    }
    /* Getting data from Citys */
    console.log('searching city with id: ', Number(payload.data.candidate.birth_city));
    const birth_city = await CitysRepository.findOneBy({
        id: Number(payload.data.candidate.birth_city)
    });
    /* If birth_city empty */
    if(!birth_city) return {
        success: false,
        message: 'Cannot find birth city on Citys repository'
    };
    console.info('the result', birth_city);
    console.log('searching city with id: ', Number(payload.data.candidate.domicile));
    const domicile = await CitysRepository.findOneBy({
        id: Number(payload.data.candidate.domicile)
    });
    if(!domicile) return {
        success: false,
        message: 'Cannot find domicile on Citys repository'
    }
    console.info('the result', domicile);
    /* Add new candidate */
    const newCandidate = CandidatesRepository.create({
        gender: payload.data.candidate.gender,
        phone_number: payload.data.candidate.phone_number,
        birth_city: birth_city,
        domicile: domicile,
        user: saveUser
    });
    /* Check if saving success */
    const saveCandidate = await CandidatesRepository.save(newCandidate);
    if(!newCandidate) return {
        success: false,
        message: 'Cannot add candidate:!'
    };
    /* add education */
    const newEducation = EducationsRepository.create({
        university_name: payload.data.education.university_name,
        major: payload.data.education.major,
        gpa: Number(payload.data.education.gpa),
        language: payload.data.education.language,
        is_latest: Number(payload.data.education.is_latest),
        is_graduate: Number(payload.data.education.is_graduate),
        start_year: Number(payload.data.education.start_year),
        end_year: Number(payload.data.education.end_year),
        candidate: saveCandidate
    });
    const saveEducation = await EducationsRepository.save(newEducation);
    /* Check if saving success */
    if(!saveEducation) return {
        success: false,
        message: 'Cannot add education:!'
    };
    /* Add new experience */
    const newExperience = WorkingExperiencesRepository.create({
        company_name: payload.data.experience.company_name,
        line_industry: payload.data.experience.line_industry,
        job_title: payload.data.experience.job_title,
        job_function: payload.data.experience.job_function,
        job_description: payload.data.experience.job_description,
        salary: Number(payload.data.experience.salary),
        is_currently: Number(payload.data.experience.is_currently),
        start_at: payload.data.experience.start_at,
        end_at: payload.data.experience.end_at,
        candidate: saveCandidate
    });
    /* Check if saving success */
    if(!newExperience) return {
        success: false,
        message: 'Cnnot add experience:!'
    };
    /* Auth session payload */
    const authPayload = {
        id: saveUser.id,
        name: saveUser.name,
        email: saveUser.email
    };
    /* Set auth session */
    await setAuthSession(authPayload, undefined);
    /* Delete register session */
    cookies().delete(await RegisterSessionName());

    return {
        success: true,
        message: 'Welcome ERAngers:!',
        data: {
            name: saveUser.name
        }
    };
}

export async function CreateEducation(candidateId: any, educationData: any) {
    const candidate = await CandidatesRepository.findOneBy({
        id: candidateId
    });
    if(!candidate) return null;

    const newEducation = EducationsRepository.create({
        university_name: educationData.university_name,
        major: educationData.major,
        gpa: educationData.gpa,
        language: educationData.language,
        is_latest: educationData.is_latest,
        is_graduate: educationData.is_graduate,
        start_year: educationData.start_year,
        end_year: educationData.end_year,
        candidate: candidate
    });

    console.info('Result new candidate: ', newEducation);

    return newEducation;
}

export async function SignOut() {
    cookies().delete(await authSessionName());
}