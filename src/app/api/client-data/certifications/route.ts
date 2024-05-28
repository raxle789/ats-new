import prisma from "@/root/prisma"
import { PrismaClientInitializationError } from "@prisma/client/runtime/library";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const certifications = await prisma.$queryRaw`SELECT id as value, name as label FROM ATS.dbo.certifications`;
    await prisma.$disconnect();
    return NextResponse.json(certifications);
  } catch (error) {
    /**
     * Next will be handling error code for database operations.
     */
    console.info('ERROR FETCHING...', error instanceof PrismaClientInitializationError);
    return NextResponse.json([
      {
        value: 'database connection error',
        label: 'Error while fetching cities data'
      }
    ]);
  }
}