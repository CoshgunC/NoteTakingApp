import { type NextRequest, NextResponse } from "next/server";
import { supabaseMiddleware } from "./utils/db/supabaseMiddleware";

export default async function middleware(request: NextRequest) {
    return supabaseMiddleware(request);
}

export const config = {
  matcher: [
    /*
      Match all routes except /login and /sign-up
      The following pattern excludes those two routes
    */
    "/((?!login|sign-up).*)",
  ],
}