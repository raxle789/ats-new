import prisma from "@/root/prisma"
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
    console.info(error);
    return NextResponse.json(error, { status: 400 });
  }
}