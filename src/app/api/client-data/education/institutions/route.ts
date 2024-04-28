import prisma from "@/root/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const institutions = await prisma.$queryRaw`SELECT EduInsName as value, EduInsName as label FROM MASTER_ERA.dbo.ERA_MasterEducationInstitution`;
    await prisma.$disconnect();
    return NextResponse.json(institutions);
  } catch (error) {
    /**
     * Next handling error code for database operation.
     */
    console.info(error);
    return NextResponse.json(error);
  }
}