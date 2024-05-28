import prisma from "@/root/prisma"
import { PrismaClientInitializationError } from "@prisma/client/runtime/library";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const skills = await prisma.$queryRaw`SELECT id as value, name as label FROM ATS_ERAJAYA.dbo.skills`;
    return NextResponse.json(skills);
  } catch (error) {
    /**
     * Next will handling error code for database operation
     */
    console.info('ERROR FETCHING...', error instanceof PrismaClientInitializationError);
    return NextResponse.json([
      {
        value: 'database connection error',
        label: 'Error while fetching cities data'
      }
    ]);
  }
};