import type {
  NextAuthConfig,
  Session as NextAuthSession,
  User as NextAuthUser,
} from "next-auth";
import { ROUTES } from "./constants";

export interface CustomUser extends NextAuthUser {
  id: string;
  isAdmin: boolean;
}

export interface CustomSession extends NextAuthSession {
  user: CustomUser;
  accessToken: string;
}

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnHome = nextUrl.pathname.startsWith(ROUTES.HOME);
      const isOnSearch = nextUrl.pathname.startsWith(ROUTES.SEARCH);
      const isOnBookShelfAll = nextUrl.pathname.startsWith(
        ROUTES.MY_BOOK_SHELF
      );
      const isOnBookShelfFavorites = nextUrl.pathname.startsWith(
        ROUTES.MY_BOOK_SHELF_FAVORITES
      );
      const isOnContribute = nextUrl.pathname.startsWith(ROUTES.CONTRIBUTE);
      const isOnContributeList = nextUrl.pathname.startsWith(
        ROUTES.CONTRIBUTE_LIST
      );
      const isOnPreview = nextUrl.pathname.startsWith(ROUTES.PREVIEW);

      if (
        isOnHome ||
        isOnSearch ||
        isOnBookShelfAll ||
        isOnBookShelfFavorites ||
        isOnContribute ||
        isOnContributeList ||
        isOnPreview
      ) {
        if (isLoggedIn) return true;
        return false;
      }
      console.log("nextUrl authorized 1: ");

      if (isLoggedIn) {
        return Response.redirect(new URL("/login", nextUrl));
      }

      console.log("nextUrl authorized 2: ");
      return;
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
    maxAge: 60 * 60 * 24, // 1d
  },

  trustHost: true,
  providers: [],
} satisfies NextAuthConfig;
