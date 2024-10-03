import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { MESSAGES } from "./constants";
import { getUserByEmail } from "@app/features/dashboard/actions";
import { User } from "./models";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  secret: process.env.AUTH_SECRET,
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) {
          return null;
        }

        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = (await getUserByEmail(email)) as User;

          if (!user || !user.password) {
            throw new Error(MESSAGES.LOGIN_NOTFOUND);
          }

          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (passwordsMatch)
            return {
              id: user.userId,
              name: user.username,
              isAdmin: user.isAdmin,
              image: user.avatar,
              email: user.email,
            };
        }

        throw new Error(MESSAGES.INVALID_CREDENTIALS);
      },
    }),
  ],
});
