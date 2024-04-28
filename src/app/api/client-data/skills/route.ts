import prisma from "@/root/prisma"
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const skills = await prisma.$queryRaw`SELECT id as value, name as label FROM ATS_ERAJAYA.dbo.skills`;
    return NextResponse.json(skills);
  } catch (error) {
    /**
     * Next will handling error code for database operation
     */
    console.info(error);
    return NextResponse.json(error);
  }
};