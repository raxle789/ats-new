import prisma from "@/root/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const jobFunctions = await prisma.$queryRaw`SELECT name as value, name as label FROM ATS_ERAJAYA.dbo.job_functions`;
    await prisma.$disconnect();
    return NextResponse.json(jobFunctions);
  } catch (error) {
    /**
     * Next handling error code for database opertaion.
     */
    console.info(error);
    return NextResponse.json(error);
  }
};