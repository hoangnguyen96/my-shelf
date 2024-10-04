import type { NextAuthConfig } from "next-auth";
import { ROUTES } from "./constants";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isPublicPage =
        nextUrl.pathname === ROUTES.LOGIN ||
        nextUrl.pathname === ROUTES.REGISTER;
      const isRootRoute = nextUrl.pathname === "/";

      if (!isLoggedIn && !isPublicPage) {
        return Response.redirect(new URL(ROUTES.LOGIN, nextUrl));
      }

      if (isLoggedIn && (isPublicPage || isRootRoute)) {
        return Response.redirect(new URL(ROUTES.HOME, nextUrl));
      }

      return true;
    },

    async session({ session, token }) {
      Object.assign(session.user, token);
      return session;
    },

    async jwt({ token, user }) {
      if (token) Object.assign(token, user);
      return token;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24,
  },

  trustHost: true,
  providers: [],
} satisfies NextAuthConfig;
