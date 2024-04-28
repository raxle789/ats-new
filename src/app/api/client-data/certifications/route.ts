import prisma from "@/root/prisma"
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const certifications = await prisma.$queryRaw`SELECT id as value, name as label FROM ATS.dbo.certifications`;
    await prisma.$disconnect();
    return NextResponse.json(certifications);
  } catch (error) {
    /**
     * Next will be handling error code for database operations.
     */
    console.info(error);
    return NextResponse.json(error);
  }
}