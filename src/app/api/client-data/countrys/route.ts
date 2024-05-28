import prisma from "@/root/prisma";
import { PrismaClientInitializationError } from "@prisma/client/runtime/library";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const countrys = await prisma.$queryRaw`SELECT CountryName as value, CountryName as label FROM MASTER_ERA.dbo.ERA_MasterCountry`;
    await prisma.$disconnect();
    return NextResponse.json(countrys);
  } catch (error) {
    /**
     * Handle error here.
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