"use server";

import bcrypt from 'bcrypt';
import * as Validation from '../validations';
import prisma from '@/root/prisma';
import { setUserSession, Utils } from '../Sessions';
import { cookies } from 'next/headers';

export async function userAuth(formData: any) {
  /* validation */
  const validate = Validation.Login.authorizeSchema.safeParse(formData);
  if(!validate.success) {
    console.log(validate.error.flatten().fieldErrors);
    return {
      success: false,
      message: validate.error.flatten().fieldErrors
    };
  };

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

  console.info('checking long-time period cookies...');
  /* set auth-session */
  if(formData.is_rememberOn === 'on') {
    await setUserSession('auth', { user_id: user.id }, 'on');
  }

  await setUserSession('auth', { user_id: user.id }, undefined);

  return {
    success: true,
    message: {
      login: [`login successfully as ${user.name}, you will be redirected to the job vacancy page in 3 seconds.`]
    }
  };
};

export async function userLoggedOut() {
  cookies().delete(Utils.authSession);

  return {
    success: true,
    message: 'Logged out successfully'
  }
}