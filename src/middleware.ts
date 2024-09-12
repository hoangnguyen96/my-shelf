import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

export default NextAuth(authConfig).auth;

export const config = {
  matcher: [
    "/home/:path*",
    "/search/:path*",
    "/my-book-shelf/:path*",
    "/contribute/:path*",
    "/contribute-list/:path*",
    "/preview/:path*",
    "/profile/:path*",
  ],
};
