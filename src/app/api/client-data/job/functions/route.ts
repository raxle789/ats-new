import prisma from "@/root/prisma";
import { PrismaClientInitializationError } from "@prisma/client/runtime/library";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const jobFunctions = await prisma.$queryRaw`SELECT name as value, name as label FROM ATS_ERAJAYA.dbo.job_functions`;
    await prisma.$disconnect();
    return NextResponse.json(jobFunctions);
  } catch (error) {
    /**
     * Next handling error code for database opertaion.
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