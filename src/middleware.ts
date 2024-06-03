import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getUserSession } from "./libs/Sessions";
import { authSession, regSession } from "./libs/Sessions/utils";

export async function middleware(request: NextRequest) {
  // console.info("referer \t:", request.headers.get("referer"));
  // if(request.nextUrl.pathname.includes("/dashboard/user/stages")) {
  //   const session = request.cookies.get(regSession)
  //   const referer = request.headers.get('referer');
  //   console.info("referer \t:", referer);
  //   if(!session) return NextResponse.redirect(new URL('/', request.url));
    // return NextResponse.next();
  // };
  // if(request.nextUrl.pathname.includes("/register")) {
  //   const session = request.cookies.get(authSession)
  //   if(session) return NextResponse.redirect(new URL('/', request.url));
  // }
};