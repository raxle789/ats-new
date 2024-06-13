"use server";

import bcrypt from 'bcrypt';
import * as Validation from '../validations';
import prisma from '@/root/prisma';
import { deleteSession, setUserSession } from '../Sessions';
import { cookies, headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { sendOTP } from '../Registration/verifications';

type GreCaptcha = {
  secret: string;
  response: string;
  remoteip?: string;
};

type GreCaptchaResult = {
  success: boolean;
  score: number;
  action: string;
  challenge_ts: Date | string;
  hostname: string;
  ['error-codes']?: any[];
};

export async function GReCaptchaV2Check(token: string): Promise<GreCaptchaResult> {
  const GreCaptchaRequestBody: GreCaptcha = {
    secret: process.env.NEXT_PUBLIC_RECAPTCHA_SECRET_KEY as string,
    response: token
  };
  const gCaptchaURLParams = new URLSearchParams();
  for(const [prop, val] of Object.entries(GreCaptchaRequestBody)) {
    gCaptchaURLParams.append(prop, val);
  };
  const gCaptchaHeader = new Headers({
    "Content-Type": "application/x-www-form-urlencoded"
  });
  const gCaptchaRequest = new Request('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    body: gCaptchaURLParams,
    headers: gCaptchaHeader
  });
  const gCaptchaVerifyRequest = await fetch(gCaptchaRequest);
  const response: GreCaptchaResult = await gCaptchaVerifyRequest.json();

  console.info('GreCaptcha Result', response);

  return response;
}

export async function userAuth(formData: any) {
  /* validation */
  
  /* headers */
  const headersList = headers();
  
  console.info("Headers List \t:", headersList);
  try {
    /* Refactored code */
    const userData = await prisma.users.findUnique({
      where: {
        email: formData.email
      },
      include: {
        userRoles: { // empty array.
          include: {
            roles: {
              select: {
                name: true
              }
            }
          }
        },
        candidates: true // null.
      }
    });
    console.info("user-data \t:", userData);
    /* close connection */
    await prisma.$disconnect();
    /* Guard Checking */
    console.info('checking user data...');
    if(!userData) return {
      success: false,
      message: 'account does not exist:'
    };
    console.info('comparing password...');
    const match = await bcrypt.compare(formData.password, userData.password);
    if(!match) return {
      success: false,
      message: 'your password is incorrect'
    };
    console.info('checking role...');
    // map disini biar jadi array of string
    const roles = userData.userRoles.map(role => role.roles.name);
    if(roles.includes('admin')) {
      await setUserSession('auth', {
        user: {
          id: userData.id,
          name: userData.name
        },
        roles: roles
      });
      /**
       * Add admin here
       */
      return {
        success: true,
        is_admin: true,
        message: `Login successfully as ${userData.name} Administrator`
      }
    };
    console.info('checking candidate data...');
    if(!userData.candidates) return {
      success: false,
      message: 'candidate data does not exist:' // if user already registered before, please reach our customer service to help creating candidate-data
    };
    console.info('checking is email verified...');
    if(!userData.is_email_verified) {
      await setUserSession('reg', {
        user: {
          id: userData.id,
          name: userData.name,
          email: userData.email
        },
        candidate: {
          id: userData.candidates.id,
          phone_number: userData.candidates.phone_number,
          date_of_birth: userData.candidates.date_of_birth
        }
      });

      console.info('sending otp...');
      const sendingOTP = await sendOTP({ email: userData.email });
      if(!sendingOTP.success) {
        return {
          success: false,
          message: 'Error while sending OTP, please try login again'
        };
      };

      return {
        success: true,
        message: 'Please verify your email address, click RESEND button',
        data: {
          stage: 2
        }
      };
    };
    console.info('checking is already filled required data...');
    if(userData.candidates.gender === null) {
      await setUserSession('reg', {
        user: {
          id: userData.id,
          name: userData.name,
          email: userData.email,
        },
        candidate: {
          id: userData.candidates.id,
          phone_number: userData.candidates.phone_number,
          date_of_birth: userData.candidates.date_of_birth,
          is_email_verified: true
        },
        roles: roles
      }, undefined);

      return {
        success: true,
        message: 'Please fill your required data...',
        data: {
          stage: 3
        }
      };
    };
    console.info('checking long-time period...');
    // console.info('remember value \t:', formData.is_rememberOn);
    if(formData.is_rememberOn) {
      console.info('remember value \t:', formData.is_rememberOn);
      await setUserSession('auth', {
        user: {
          id: userData.id,
          name: userData.name
        },
        candidate: {
          id: userData.candidates.id
        },
        roles: roles
      }, 'on');
    } else {
      await setUserSession('auth', {
        user: {
          id: userData.id,
          name: userData.name
        },
        candidate: {
          id: userData.candidates.id
        },
        roles: roles
      });
    };

    return {
      success: true,
      message: `login successfully as ${userData.name}, you will be redirected to the job vacancy page in 3 seconds.`
    };
  } catch (error) {
    console.info("Error \t:", error);
    return {
      success: false,
      message: 'Unknown failed authentication:'
    };
  };
};

export async function userLoggedOut() {
  await deleteSession('auth');
};