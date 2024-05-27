import { NextResponse, type NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

/**
 * @description Verify if the params contains the success or fail response.
 * @param searchParams The instance of URLSearchParams.
 * @returns boolean true or false.
 */
function isSuccessOAuth(searchParams: URLSearchParams): boolean {
  return (
    searchParams.has('code') &&
    searchParams.has('state')
  );
};

function isFailedOAuth(searchParams: URLSearchParams): boolean {
  return (
    searchParams.has('error') &&
    searchParams.has('error_description') &&
    searchParams.has('state')
  );
};

export async function GET(request: NextRequest) {
  const searchParams: URLSearchParams = request.nextUrl.searchParams;
  // const plainObjectSearchParams = Object.fromEntries(searchParams.entries());
  console.info('is success response? ', isSuccessOAuth(searchParams));
  if(isSuccessOAuth(searchParams)) {
    try {
      jwt.verify(searchParams.get('state') as string, process.env.JWT_SECRET_KEY as string);

      const URLSearchParamsBody = new URLSearchParams({
        grant_type: 'authorization_code',
        code: searchParams.get('code') as string,
        client_id: process.env.LINKEDIN_CLIENT_ID_PREMIUM as string,
        client_secret: process.env.LINKEDIN_SECRET_KEY_PREMIUM as string,
        redirect_uri: process.env.LINKEDIN_REDIRECT_URL_PREMIUM as string
      });
      const requestAuthToken = await fetch(process.env.LINKEDIN_EXCHANGE_AUTH_TOKEN as string, {
        method: 'POST',
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: URLSearchParamsBody
      });
      const response = await requestAuthToken.json();

      /* Make Authenticated Request */
      // const getBasicLinkedInProfile = await fetch('https://api.linkedin.com/v2/userinfo', {
      //   method: 'GET',
      //   headers: {
      //     "Authorization": "Bearer " + response.access_token
      //   },
      // });

      // const responseBasicProfile = await getBasicLinkedInProfile.json();
      return NextResponse.json({
        authTokens: response,
        basic_profile: null
      });
    } catch (error) {
      /**
       * Error handling for JWT ERROR and FETCH TYPEERROR
       */
      return NextResponse.json({
        error: error
      });
    };
  };
  return NextResponse.json({
    success: false,
    message: 'Error authorization:'
  });
};
