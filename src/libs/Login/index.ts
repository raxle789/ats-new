"use server";

import bcrypt from 'bcrypt';
import * as Validation from '../validations';
import prisma from '@/root/prisma';
import { deleteSession, setUserSession } from '../Sessions';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

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
      message: {
        userNotFound: ['we cannot find your account, please use the correct email address or try to register an account instead.']
      }
    }
  };

  console.info('comparing password...');
  /* password-check */
  const match = await bcrypt.compare(formData.password, user.password);

  console.info('comparing result...', match);
  if(!match) {
    return {
      success: false,
      message: {
        invalidPassword: ['Your password is incorrect!']
      }
    };
  };

  console.info('user email is verified...');
  const candidate = await prisma.candidates.findFirst({
    where: {
      userId: user.id
    }
  });
  console.info('candidate data...', candidate);

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

    return {
      success: true,
      message: {
        emailVerified: ['Please verify your email address, click RESEND button']
      },
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
      message: {
        requiredData: ['Please fill your required data...']
      },
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

  return {
    success: true,
    message: {
      login: [`login successfully as ${user.name}, you will be redirected to the job vacancy page in 3 seconds.`]
    }
  };
};

export async function userLoggedOut() {
  await deleteSession('auth');
};