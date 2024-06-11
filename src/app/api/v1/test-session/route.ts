import { cookies } from "next/headers";
import { NextResponse, NextRequest } from "next/server";
import jwt from 'jsonwebtoken';
import { v4 as uuidV4 } from 'uuid';
import prisma from "@/root/prisma";
import { getUserSession } from "@/libs/Sessions";

export async function GET(request: NextRequest) {
  const authSession = await getUserSession('auth');
  console.info(authSession);
  try {
    const candidate = await prisma.candidates.findUnique({
      where: {
        id: authSession.candidate.id
      }
    })
    return NextResponse.json({
      success: true,
      data: authSession,
      message: 'success:'
    });
  } catch (error) {
    console.info('Fetching Error: ', error);
    return NextResponse.json({
      success: false,
      data: null,
      message: 'Fetching Error: There is a problem with database connection: ',
    });
  };
};