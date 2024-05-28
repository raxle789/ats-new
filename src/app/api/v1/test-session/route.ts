import { cookies } from "next/headers";
import { NextResponse, NextRequest } from "next/server";
import jwt from 'jsonwebtoken';
import { v4 as uuidV4 } from 'uuid';
import prisma from "@/root/prisma";

export async function GET(request: NextRequest) {
  const session = request.cookies.get('_ERAHC-AUTH');
  const candidateSkills = await prisma.candidateSkills.findMany({
    include: {
      candidates: true,
      skills: true
    }
  });
  return NextResponse.json({
    candidate_skills: candidateSkills
  });
  // if(session) {
    // const serverSession = cookies().get(session.value);
    // console.log('server jwt-token', serverSession);
    /* use trycatch */
    // const payload = jwt.verify(serverSession?.value as string, 'ats-developers', { complete: true });
  //   jwt.verify('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvYXV0aDIiOiJsaW5rZWRpbiIsIl9lcmFoYy1vYXV0aCI6InNpZG9rYXJlZGV2IiwiaWF0IjoxNzE2NzAwNzkyOTkzfQ.-RoC3ZkNb3_K0fnc3RDnWtTty-iDFnpwgoL83oN5muQ', 'ats-developers');
  //   return NextResponse.json({
  //     session: session,
  //     data: 'on try'
  //   });
  // } else {
    // const serverSessionKey = uuidV4();
    // const serverSessionToken = jwt.sign({
    //   name: 'Fatkhur Rozak',
    //   role: 'database-administrator',
    // }, 'ats-developers', {
    //   algorithm: 'HS256'
    // });
    /* server-session */
    // cookies().set(serverSessionKey, serverSessionToken, {
    //   expires: new Date(Date.now() + 2 * 60 * 1000),
    //   httpOnly: true
    // });
    /* client-cookies */
    // cookies().set('_ERAHC-AUTH', serverSessionKey, {
    //   expires: new Date(Date.now() + 2 * 60 * 1000),
    //   httpOnly: false
    // });
  //   cookies().set('_ERAHC-AUTH', JSON.stringify({
  //     name: 'Fatkhur Rozak',
  //     role: 'database.administrator'
  //   }), {
  //     expires: new Date(Date.now() + 2 * 60 * 1000),
  //     httpOnly: false
  //   });
  //   const sessionData = cookies().get('_ERAHC-AUTH');
  //   return NextResponse.json({
  //     session: sessionData,
  //     data: null
  //   });
  // };
};