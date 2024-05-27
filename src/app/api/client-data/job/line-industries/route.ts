import prisma from "@/root/prisma";
import { PrismaClientInitializationError } from "@prisma/client/runtime/library";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const lineIndustries: { value: string, label: string }[] = await prisma.$queryRaw`SELECT name as value, name as label FROM ATS_ERAJAYA.dbo.line_industries`;
    await prisma.$disconnect();
    /* Manipulated the property */
    // lineIndustries.forEach((value, index) => value.value = value.value + index);
    return NextResponse.json(lineIndustries);
  } catch (error) {
    /**
     * Next handling error code for database operation.
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