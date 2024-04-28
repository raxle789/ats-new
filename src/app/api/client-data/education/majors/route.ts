import prisma from "@/root/prisma";
import { NextResponse } from "next/server";
export async function GET() {
  try {
    const educationMajors = await prisma.$queryRaw`SELECT EduMjrName as value, EduMjrName as label FROM MASTER_ERA.dbo.ERA_MasterEducationMajor`;
    await prisma.$disconnect();
    return NextResponse.json(educationMajors);
  } catch (error) {
    /**
     * Handling error code from database operation here.
     * Upcoming
     */
    console.info(error);
    return NextResponse.json(error);
  }
}