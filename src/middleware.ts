import NextAuth from "next-auth";
import { NextResponse } from "next/server";
import { getToken, GetTokenParams } from "next-auth/jwt";
import type { NextRequest } from "next/server";
import { authConfig } from "./auth.config";

export default NextAuth(authConfig).auth;

// Handle request HTTP before they come to page or API route
export async function middleware(req: NextRequest) {
  // Get token form cookie or header
  const token = await getToken({
    req,
    secret: process.env.AUTH_SECRET || "",
  } as unknown as GetTokenParams);

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Continue if token is valid
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/home/:path*",
    "/search/:path*",
    "/my-book-shelf/:path*",
    "/contribute/:path*",
    "/preview/:path*",
  ],
};
