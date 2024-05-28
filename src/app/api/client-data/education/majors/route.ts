import prisma from "@/root/prisma";
import { PrismaClientInitializationError } from "@prisma/client/runtime/library";
import { NextResponse } from "next/server";
export async function GET() {
  try {
    const educationMajors = await prisma.$queryRaw`SELECT EduMjrName as value, EduMjrName as label FROM MASTER_ERA.dbo.ERA_MasterEducationMajor`;
    await prisma.$disconnect();
    return NextResponse.json(educationMajors);
  } catch (error) {
    /**
     * Handling error code from database operation here.
     * Upcoming
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