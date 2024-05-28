import prisma from "@/root/prisma"
import { PrismaClientInitializationError } from "@prisma/client/runtime/library";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const ethnicity = await prisma.$queryRaw`SELECT Race as value, Race as label FROM MASTER_ERA.dbo.ERA_MasterEthnic`;
    await prisma.$disconnect();
    return NextResponse.json(ethnicity);
  } catch (error) {
    /**
     * Next will handling error code here.
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