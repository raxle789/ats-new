import prisma from "@/root/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const lineIndustries: { value: string, label: string }[] = await prisma.$queryRaw`SELECT name as value, name as label FROM ATS_ERAJAYA.dbo.line_industries`;
    await prisma.$disconnect();
    /* Manipulated the property */
    // lineIndustries.forEach((value, index) => value.value = value.value + index);
    return NextResponse.json(lineIndustries);
  } catch (error) {
    /**
     * Next handling error code for database operation.
     */
    console.info(error);
    return NextResponse.json(error);
  }
};