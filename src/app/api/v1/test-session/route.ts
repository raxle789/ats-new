import { cookies } from "next/headers";
import { NextResponse, NextRequest } from "next/server";
import jwt from 'jsonwebtoken';
import { v4 as uuidV4 } from 'uuid';
import prisma from "@/root/prisma";
import { getUserSession } from "@/libs/Sessions";

export async function GET(request: NextRequest) {
  // const session = request.cookies.get('_ERAHC-AUTH');
  const authSession = await getUserSession('auth');
  try {
    // const [cv, ijazah, ktp, npwp, kk, bca, mcu, vaksin] = await prisma.$transaction([
    //   prisma.documents.findFirst({
    //     where: {
    //       candidate_id: authSession.candidate.id,
    //       documentTypeId: 2
    //     },
    //     select: {
    //       file_base: true
    //     }
    //   }),
    //   prisma.documents.findFirst({
    //     where: {
    //       candidate_id: authSession.candidate.id,
    //       documentTypeId: 3
    //     },
    //     select: {
    //       file_base: true
    //     }
    //   }),
    //   prisma.documents.findFirst({
    //     where: {
    //       candidate_id: authSession.candidate.id,
    //       documentTypeId: 4
    //     },
    //     select: {
    //       file_base: true
    //     }
    //   }),
    //   prisma.documents.findFirst({
    //     where: {
    //       candidate_id: authSession.candidate.id,
    //       documentTypeId: 5
    //     },
    //     select: {
    //       file_base: true
    //     }
    //   }),
    //   prisma.documents.findFirst({
    //     where: {
    //       candidate_id: authSession.candidate.id,
    //       documentTypeId: 6
    //     },
    //     select: {
    //       file_base: true
    //     }
    //   }),
    //   prisma.documents.findFirst({
    //     where: {
    //       candidate_id: authSession.candidate.id,
    //       documentTypeId: 7
    //     },
    //     select: {
    //       file_base: true
    //     }
    //   }),
    //   prisma.documents.findFirst({
    //     where: {
    //       candidate_id: authSession.candidate.id,
    //       documentTypeId: 8
    //     },
    //     select: {
    //       file_base: true
    //     }
    //   }),
    //   prisma.documents.findFirst({
    //     where: {
    //       candidate_id: authSession.candidate.id,
    //       documentTypeId: 9
    //     },
    //     select: {
    //       file_base: true
    //     }
    //   }),
    // ]);

    // return {
    //   success: true,
    //   data: {
    //     curriculum_vitae: cv?.file_base.toString(),
    //     ijazah: ijazah?.file_base.toString(),
    //     identity_card: ktp?.file_base.toString(),
    //     tax: npwp?.file_base.toString(),
    //     family_registration: kk?.file_base.toString(),
    //     bca_card: bca?.file_base.toString(),
    //     mcu: mcu?.file_base.toString(),
    //     vaccine_certf: vaksin?.file_base.toString()
    //   },
    //   message: 'Data Fetched:'
    // }
    // const updateDocuments = await prisma.$transaction(async (tx) => {
    //   const checkIdentityInfo = await tx.candidates.findUnique({
    //     where: {
    //       id: authSession.candidate.id
    //     },
    //     select: {
    //       identityInfoId: true
    //     }
    //   });
    //   return checkIdentityInfo;
    // });
    const idCardDoc = await prisma.documents.findFirst({
      where: { candidate_id: authSession.candidate.id, documentTypeId: 4 } // 4 -> id ktp/passport
    });
    return NextResponse.json({
      success: true,
      data: idCardDoc,
      message: 'Data Fetched:'
    });
  } catch (error) {
    console.info('Fetching Error: ', error);
    return NextResponse.json({
      success: false,
      data: null,
      message: 'Fetching Error: There is a problem with database connection: ',
    });
  }
  // const roles = await prisma.userRoles.findMany({
  //   where: {
  //     userId: 77550
  //   },
  //   select: {
  //     roles: {
  //       select: {
  //         name: true
  //       }
  //     }
  //   }
  // });
  // const user = await prisma.users.findUnique({
  //   where: {
  //     email: 'tahsamarliah@gmail.com',
  //   },
  //   include: {
  //     userRoles: { // empty array.
  //       include: {
  //         roles: {
  //           select: {
  //             name: true
  //           }
  //         }
  //       }
  //     },
  //     candidates: { // null.
  //       select: {
  //         gender: true
  //       }
  //     }
  //   }
  // });
  
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