import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { authSession, regSession } from './libs/Sessions/utils';
import { jwtVerify } from 'jose';

export async function middleware(request: NextRequest) {
  const _COOKIES = request.cookies;
  const _NEXTURL = request.nextUrl;
  const GETROLES = async (authToken: string) => {
    try {
      const decoded = await jwtVerify(
        authToken,
        new Uint8Array(Buffer.from('sidokaredev24')),
        { algorithms: ['HS256'] },
      );
      return decoded.payload.roles;
    } catch (error) {
      // console.info("Error decode with jose:", error);
      return [];
    }
  };

  const _ROLES = (await GETROLES(
    _COOKIES.get(authSession)?.value as string,
  )) as string[];
  const listOfRole = {
    admin: _ROLES.includes('admin'),
    ta: _ROLES.includes('ta_non_admin'),
    user: _ROLES.includes('user'),
    interviewer: _ROLES.includes('interviewer'),
    hrbp: _ROLES.includes('hrbp'),
    hrarea: _ROLES.includes('hrarea'),
    assessment: _ROLES.includes('assessment'),
    management: _ROLES.includes('management'),
    candidate: _ROLES.includes('candidate'),
  };

  /* REGISTER */
  if (request.nextUrl.pathname.includes('/register')) {
    if (_COOKIES.has(authSession)) {
      if (listOfRole.admin) {
        _NEXTURL.pathname = '/dashboard/ta';
        _NEXTURL.searchParams.set('error', 'already authenticated');
        return NextResponse.redirect(_NEXTURL);
      } else if (listOfRole.candidate) {
        _NEXTURL.pathname = '/dashboard/user';
        _NEXTURL.searchParams.set('error', 'already authenticated');
        return NextResponse.redirect(_NEXTURL);
      }
    }
  }

  if (request.nextUrl.pathname.includes('/dashboard/user/stages')) { // default -> user
    if (_COOKIES.has(regSession)) {
      /* Session Pass */
      return NextResponse.next();
    }
    {
      _NEXTURL.pathname = '/register';
      _NEXTURL.searchParams.set('error', 'you have to register');
      return NextResponse.redirect(_NEXTURL);
    }
  }

  /* CANDIDATE */
  if (request.nextUrl.pathname.startsWith('/dashboard/user')) { // default -> user
    if (_COOKIES.has(authSession)) {
      if (listOfRole.candidate) {
        /* Roles Passed */
        return NextResponse.next();
      } else {
        _NEXTURL.pathname = '';
        _NEXTURL.searchParams.set('error', 'has no access');
        return NextResponse.redirect(_NEXTURL);
      }
    } else {
      _NEXTURL.pathname = '';
      _NEXTURL.searchParams.set('error', 'unauthenticated');
      return NextResponse.redirect(_NEXTURL);
    }
  }

  /* TALENT ACQUISITION */
  if (request.nextUrl.pathname.startsWith('/dashboard/ta')) {
    if (_COOKIES.has(authSession)) {
      if (listOfRole.admin || listOfRole.ta) {
        /* Roles Passed */
        return NextResponse.next();
      } else {
        _NEXTURL.pathname = '';
        _NEXTURL.searchParams.set('error', 'has no access');
        return NextResponse.redirect(_NEXTURL);
      }
    } else {
      _NEXTURL.pathname = '';
      _NEXTURL.searchParams.set('error', 'unauthenticated');
      return NextResponse.redirect(_NEXTURL);
    }
  }
}
