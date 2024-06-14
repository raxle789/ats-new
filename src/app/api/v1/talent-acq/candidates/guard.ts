'use server';

import { DecryptSession } from "@/libs/Sessions/jwt";
import { authSession } from "@/libs/Sessions/utils";
import { NextRequest } from "next/server";

export async function Guards({ request } : { request: NextRequest }) {
  const _COOKIES = await request.cookies.get(authSession);
  /* COOKIES CHECK */
  if(!_COOKIES) {
    throw new Error('Unauthenticated, access denied', { cause: 'Request is not authenticated' });
  };
  const _ROLES: string[] = DecryptSession(_COOKIES.value).roles;
  /* ROLES CHECK */
  if(_ROLES.includes('admin') || _ROLES.includes('ta_non_admin')) {
    return;
  };
  throw new Error('Permission denied', { cause: 'Role as Admin doesnt exist' });
};