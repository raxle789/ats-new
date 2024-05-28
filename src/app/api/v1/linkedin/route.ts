import { NextResponse, type NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';
import { setUserSession } from '@/libs/Sessions';
import prisma from '@/root/prisma';
import { cookies } from 'next/headers';
import { linkedinSession } from '@/libs/Sessions/utils';

type TypeOpenIDToken = {
  access_token: string;
  expires_in: number;
  scope: string;
  token_type: string;
  id_token: string;
};

type TypeUserInfo = {
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
};

/**
 * @description Verify if the params contains the success or fail response.
 * @param searchParams The instance of URLSearchParams.
 * @returns boolean true or false.
 */
function isSuccessOAuth(searchParams: URLSearchParams): boolean {
  return searchParams.has('code') && searchParams.has('state');
}

function isFailedOAuth(searchParams: URLSearchParams): boolean {
  return (
    searchParams.has('error') &&
    searchParams.has('error_description') &&
    searchParams.has('state')
  );
}

export async function GET(request: NextRequest) {
  const searchParams: URLSearchParams = request.nextUrl.searchParams;
  // const plainObjectSearchParams = Object.fromEntries(searchParams.entries());
  console.info('is success response? ', isSuccessOAuth(searchParams));
  if (isSuccessOAuth(searchParams)) {
    try {
      jwt.verify(
        searchParams.get('state') as string,
        process.env.JWT_SECRET_KEY as string,
      );

      const URLSearchParamsBody = new URLSearchParams({
        grant_type: 'authorization_code',
        code: searchParams.get('code') as string,
        client_id: process.env.LINKEDIN_CLIENT_ID as string,
        client_secret: process.env.LINKEDIN_SECRET_KEY as string,
        redirect_uri: process.env.LINKEDIN_REDIRECT_URL as string,
      });
      const requestAuthToken = await fetch(
        process.env.LINKEDIN_EXCHANGE_AUTH_TOKEN as string,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: URLSearchParamsBody,
        },
      );
      const response: TypeOpenIDToken = await requestAuthToken.json();

      /* Make Authenticated Request */
      const getBasicLinkedInProfile = await fetch(
        'https://api.linkedin.com/v2/userinfo',
        {
          method: 'GET',
          headers: {
            Authorization: 'Bearer ' + response.access_token,
          },
        },
      );

      const responseUserInfo: TypeUserInfo =
        await getBasicLinkedInProfile.json();
      const isEmailRegistered = await prisma.users.findUnique({
        where: {
          email: responseUserInfo.email,
        },
      });
      /**
       * If user email already registered.
       */
      if (isEmailRegistered) {
        const failEmailRegistered = new URL(
          '/dashboard/user/stages',
          request.url,
        );
        /* linkedin session */
        const payload = jwt.sign({ success: false }, 'sidokaredev24');
        const expires = new Date(Date.now() + 30 * 1000);
        cookies().set(linkedinSession, payload, {
          expires: expires,
          httpOnly: false,
        });
        const errorParams = new URLSearchParams({
          state: searchParams.get('state') as string,
          error: 'Email is already registered',
          error_description:
            'Unfortunately, your email is already registered in our system. Please try logging in instead.',
        });
        failEmailRegistered.search = errorParams.toString();

        return NextResponse.redirect(failEmailRegistered);
      }
      /* Set-Cookie */
      await setUserSession('linkedin', {
        ...responseUserInfo,
        success: true,
      });
      /* Validate Error Code */

      return NextResponse.redirect(
        new URL('/dashboard/user/stages', request.url),
      );
    } catch (error) {
      /**
       * Error handling for JWT ERROR, FETCH TYPEERROR, PRISMA ERROR
       */

      return NextResponse.json({
        error: error,
      });
    }
  } else if (isFailedOAuth(searchParams)) {
    const failOAuth = new URL('/dashboard/user/stages', request.url);
    failOAuth.search = searchParams.toString();

    return NextResponse.redirect(failOAuth);
  }
  /* Default return */
  return NextResponse.json({
    success: false,
    message: 'Unknown Error on default return:',
  });
}
