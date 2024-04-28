import prisma from "@/root/prisma"
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const educationLevels = await prisma.$queryRaw`SELECT EduLvlName as value, EduLvlName as label FROM MASTER_ERA.dbo.ERA_MasterEduLevel`;
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