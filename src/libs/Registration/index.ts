"use server";

import { getUserSession, setUserSession } from "../Sessions";
import { userRegister1 } from "../validations/Register";
import bcrypt from 'bcrypt';
import prisma from "@/root/prisma";
import { fileToBase64, toDatetime } from "./utils";
import { v4 as uuidV4 } from 'uuid';
import { cookies } from "next/headers";
import * as Utils from "../Sessions/utils";
import { Prisma } from "@prisma/client";

export async function createUser(formData: any) {
  const validate = userRegister1.safeParse(formData);
  
  if(!validate.success) {
    return {
      success: false,
      message: Object.keys(validate.error.flatten().fieldErrors).length === 0 ? { saveUser: validate.error.flatten().formErrors } : validate.error.flatten().fieldErrors
    };
  }

  const hash = await bcrypt.hash(formData.password, 10);

  const user = await prisma.users.create({
    data: {
      name: formData.name,
      email: formData.email,
      password: hash
    }
  });

  console.info(user);
  if(!user) {
    return {
      success: false,
      message: {
        saveUser: ['failed to create user']
      }
    };
  }

  const registerPayloadSession = {
    user_id: user.id
  };

  /* set-register session */
  await setUserSession('reg', registerPayloadSession, undefined);

  return {
    success: true,
    data: {
      user_id: user.id
    }
  };
};

export async function createCandidates(formData: any) {
  /* ADD VALIDATION PLEASE */
  /* get reg-session */
  const regSession = await getUserSession('reg');
  console.info('reg user-session', regSession);

  const candidate = await prisma.candidates.create({
    data: {
      userId: regSession.user_id,
      gender: formData.gender,
      phone_number: formData.phone_number,
      date_of_birth: new Date(formData.date_of_birth),
      source_referer: formData.source_referer,
      current_salary: Number(formData.current_salary),
      linkedin_profile_url: formData.linkedin_profile_url,
    }
  });

  console.info(candidate);

  if(!candidate) {
    return {
      success: false,
      message: `Cannot find user with id: ${regSession.user_id}`
    }
  };

  if(!candidate) {
    return {
      success: false,
      message: {
        saveUser: ['failed to create candidate']
      }
    };
  };

  const registerPayloadSession = {
    user_id: regSession.user_id,
    candidate_id: candidate.id
  };

  /* set register-session */
  await setUserSession('reg', registerPayloadSession, undefined);

  return {
    success: true,
    data: registerPayloadSession
  };
};

export async function createEducation_Experience(formData: any, document: any, agreement: boolean) {
  /* get reg-session */
  const regSession = await getUserSession('reg');
  console.log(regSession);

  const education = await prisma.educations.create({
    data: {
      candidateId: regSession.candidate_id,
      level: formData.education.level,
      major: formData.education.major,
      university_name: formData.education.university_name,
      start_year: Number(formData.education.start_year),
      end_year: Number(formData.education.end_year),
      gpa: parseFloat(formData.education.gpa),
      language: 'Indonesian',
      is_latest: false,
      is_graduate: false
    }
  });

  console.log(education);
  if(!education) {
    return {
      success: false,
      message: {
        saveEducation: ['failed to create education']
      }
    };
  };

  const experience = await prisma.working_experiences.create({
    data: {
      candidateId: regSession.candidate_id,
      company_name: formData.experience.company_name,
      job_function: formData.experience.job_function,
      job_title: formData.experience.job_title,
      job_level: formData.experience.job_level,
      job_description: '',
      line_industry: formData.experience.line_industry,
      start_at: new Date(formData.experience.start_at), // looks must be converted to Date
      end_at: new Date(formData.experience.end_at), // looks must be converted to Date
      salary: Number(formData.experience.salary),
      is_currently: false,
    }
  });

  console.log(experience);
  if(!experience) {
    return {
      success: false,
      message: {
        saveExperience: ['failed to create experience!']
      }
    };
  };

  const documenUUID: string = uuidV4();
  const binaryData = Buffer.from(document.file_base, 'base64');
  const userDocument = await prisma.documents.create({
    data: {
      saved_name: documenUUID,
      original_name: document.name,
      byte_size: document.size,
      path: 'no-path',
      file_base: binaryData,
      candidate_id: regSession.candate_id
    }
  });

  console.log(userDocument);
  if(!userDocument) {
    return {
      success: false,
      message: {
        saveDocument: ['failed to create document!']
      }
    };
  };

  /* delete reg-session */
  cookies().delete(Utils.regSession);
  /* set auth-session */
  await setUserSession('auth', { user_id: regSession.id, candidate_id: regSession.candidate_id }, undefined);

  return {
    success: true,
    message: {
      createAccount: ['Create account successfully!']
    }
  }
}