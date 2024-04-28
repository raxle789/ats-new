import prisma from "@/root/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const levels = await prisma.$queryRaw`SELECT name as value, name as label FROM ATS_ERAJAYA.dbo.position_levels`;
    await prisma.$disconnect();
    return NextResponse.json(levels);
  } catch (error) {
    /**
     * Next handling error code for database operation.
     */
    console.info(error);
    return NextResponse.json(error);
  }
};