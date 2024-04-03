import { getUserSession, setUserSession } from "@/libs/Sessions";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  // const session = await getUserSession('auth');
  // const session = cookies().getAll();
  // console.log(session);
  // if(!session) {
  //   await setUserSession('auth', { name: 'Fatkhur' }, undefined);
  //   return NextResponse.json({
  //   success: true
  //   })
  // }
  // debugger;
}