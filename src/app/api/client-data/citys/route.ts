import { NextResponse } from "next/server";
import prisma from "@/root/prisma";

export async function GET() {
  try {
    const citys = await prisma.$queryRaw`SELECT CityId as value, CityName as label FROM MASTER_ERA.dbo.ERA_MasterCity`;
    await prisma.$disconnect();
    return NextResponse.json(citys);
  } catch (error) {
    /**
     * Next will be handling error.
     */
    console.info('ERROR FETCHING...', error);
    return NextResponse.json(error);
  }
}