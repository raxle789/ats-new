// import { cookies } from "next/headers";
// import { Utils } from "@/libs/Sessions";
// import { NextResponse } from "next/server";

// export async function GET() {
//   const authSession = cookies().get(Utils.authSession);
//   console.log(authSession);
//   if(!authSession) {
//     return NextResponse.json({ 
//     session: {
//       auth: undefined
//     }
//    }, { status: 200 });
//   }

//   return NextResponse.json({ 
//     session: {
//       auth: authSession
//     }
//    }, { status: 200 });
//   const regSession = cookies().get(Utils.regSession);
//   console.log(regSession);

//   return NextResponse.json({ 
//     session: [
//       authSession,
//       regSession,
//     ]
//    }, { status: 200 });
// }