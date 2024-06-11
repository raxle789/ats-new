import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { getUserSession } from "./libs/Sessions";

export async function middleware(request: NextRequest) {
  // if(request.nextUrl.pathname.includes("/dashboard/user/profile")) {
  //   const req = await fetch('http://localhost:3000/api/v1/test-session', { method: 'GET', headers: { "Content-Type": "application/json" } });
  //   const res = await req.json();
  //   console.info(res);
  // }
};