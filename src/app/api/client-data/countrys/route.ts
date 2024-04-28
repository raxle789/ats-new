import prisma from "@/root/prisma";
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
    console.info(error);
    return NextResponse.json(error);
  }
}