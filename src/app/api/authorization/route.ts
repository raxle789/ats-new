import { type NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import axios from 'axios';

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const code = params.get('code');

  const response = await axios.post(
    'https://www.linkedin.com/oauth/v2/accessToken',
    {
      grant_type: 'authorization_code',
      code: code,
      client_id: '86spngwvycqa3c',
      client_secret: 'JBVu4p9P494sIyTA',
      redirect_uri: 'http://localhost:3000/api/authorization',
    },
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    },
  );

  if (response.status !== 200) {
    return NextResponse.json({
      message: `can't get access token, there are something wrong`,
      data: response.data,
    });
  }

  console.info(response.data);

  /**
   * next cookies data must be encrypted
   */

  cookies().set('accessToken', response.data.access_token, {
    maxAge: response.data.expires_in,
  });

  /**
   * next must store token ( expires_id )
   */
  redirect('/register/linkedin');
}
