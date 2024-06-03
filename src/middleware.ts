import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getUserSession } from "./libs/Sessions";
import { authSession, regSession } from "./libs/Sessions/utils";

export async function middleware(request: NextRequest) {
  const session = request.cookies;
  const pathname = request.nextUrl.pathname;
  /* Stages */
  if(session.has(authSession) && pathname.includes("/dashboard/user/stages")) {
    return NextResponse.redirect(new URL("/dashboard/user/profile", request.url));
  };
  /* Register */
  if(session.has(authSession) && pathname.includes("/register")) {
    return NextResponse.redirect(new URL("/dashboard/user", request.url));
  };
};