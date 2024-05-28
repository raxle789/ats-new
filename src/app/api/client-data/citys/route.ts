import { NextResponse } from "next/server";
import prisma from "@/root/prisma";
import { PrismaClientInitializationError } from "@prisma/client/runtime/library";

export async function GET() {
  try {
    const citys = await prisma.$queryRaw`SELECT CityName as value, CityName as label FROM MASTER_ERA.dbo.ERA_MasterCity`;
    await prisma.$disconnect();
    return NextResponse.json(citys);
  } catch (error) {
    /**
     * Next will be handling error.
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