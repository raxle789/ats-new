"use server";

import bcrypt from 'bcrypt';
import * as Validation from '../validations';
import prisma from '@/root/prisma';
import { deleteSession, setUserSession } from '../Sessions';
import { cookies } from 'next/headers';
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
  /*
  const validate = Validation.Login.authorizeSchema.safeParse(formData);
  if(!validate.success) {
    console.log(validate.error.flatten().fieldErrors);
    return {
      success: false,
      message: validate.error.flatten().fieldErrors
    };
  };
  */

  console.info('checking if the user exist...');
  /* check user */
  const user = await prisma.users.findUnique({
    where: {
      email: formData.email
    }
  });

  console.info('user exist here', user);
  if(!user) {
    return {
      success: false,
      message: 'we cannot find your account, please use the correct email address or try to register an account instead.'
    }
  };

  console.info('comparing password...');
  /* password-check */
  const match = await bcrypt.compare(formData.password, user.password);
  console.info('value match: ', match);

  console.info('comparing result...', match);
  if(!match) {
    return {
      success: false,
      message: 'Your password is incorrect!'
    };
  };

  console.info('user email is verified...');
  const candidate = await prisma.candidates.findFirst({
    where: {
      userId: user.id
    }
  });
  console.info('candidate data...', candidate);

  if(!candidate) {
    return {
      success: false,
      message: 'candidate data not found, but users exist. contact our administrator for help',
    };
  };

  /* Checking -> is email verified? */
  console.info('checking... is email verified?');
  if(!user.is_email_verified) {
    console.info('user email is not verified yet...');
    /**
     * set reg-session
     */
    await setUserSession('reg', {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      candidate: {
        id: candidate?.id,
        phone_number: candidate?.phone_number,
        date_of_birth: candidate?.date_of_birth
      }
    }, undefined);

    /**
     * Send OTP
     * code here...
     */
    const sendingOTP = await sendOTP({ email: user.email });
    console.info('sending otp...');
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

  console.info('checking candidate data...');
  if(candidate?.gender === null) {
    console.info('user did not fill the required data...');
    /**
     * set reg-session
     */
    await setUserSession('reg', {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      candidate: {
        id: candidate?.id,
        phone_number: candidate?.phone_number,
        date_of_birth: candidate?.date_of_birth,
        is_email_verified: true
      }
    }, undefined);

    return {
      success: true,
      message: 'Please fill your required data...',
      data: {
        stage: 3
      }
    };
  }

  console.info('checking long-time period cookies...');
  /* set auth-session */
  if(formData.is_rememberOn === 'on') {
    await setUserSession('auth', {
      user: {
        id: user.id
      },
      candidate: {
        id: candidate?.id
      }
     }, 'on');
  };

  await setUserSession('auth', {
    user: {
      id: user.id
    },
    candidate: {
      id: candidate?.id
    }
   }, undefined);

  /* close connection */
  await prisma.$disconnect();

  return {
    success: true,
    message: `login successfully as ${user.name}, you will be redirected to the job vacancy page in 3 seconds.`
  };
};

export async function userLoggedOut() {
  await deleteSession('auth');
};