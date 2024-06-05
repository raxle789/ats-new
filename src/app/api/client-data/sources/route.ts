import prisma from "@/root/prisma"
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const sources = await prisma.sources.findMany();
    const sourceOptionData = sources.map(source => {
      return {
        value: source.id,
        label: source.name
      };
    });
    return NextResponse.json(sourceOptionData);
  } catch (error) {
    console.info("Error happen \t:", error);
    return NextResponse.json(error);
  }
}