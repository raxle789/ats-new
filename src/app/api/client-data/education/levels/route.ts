import prisma from '@/root/prisma';
import { PrismaClientInitializationError } from '@prisma/client/runtime/library';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const educationLevels =
      await prisma.$queryRaw`SELECT name as value, name as label FROM ATS_ERAJAYA.dbo.education_levels`;
    await prisma.$disconnect();
    return NextResponse.json(educationLevels);
  } catch (error) {
    /**
     * Next will handling error.code here.
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
