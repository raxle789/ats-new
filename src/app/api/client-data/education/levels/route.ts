import prisma from "@/root/prisma"
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const educationLevels = await prisma.$queryRaw`SELECT name as value, name as label FROM ATS_ERAJAYA.dbo.education_levels`;
    await prisma.$disconnect();
    return NextResponse.json(educationLevels);
  } catch (error) {
    /**
     * Next will handling error.code here.
     */
    console.info(error);
    return NextResponse.json(error);
  };
};