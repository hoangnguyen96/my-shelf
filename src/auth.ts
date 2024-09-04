import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import { HttpClient } from "./services";
import bcrypt from "bcryptjs";
import { User as UserModel } from "./models";
import { API_ROUTES, MESSAGES } from "./constants";

const getUser = async (email: string): Promise<UserModel[] | []> => {
  try {
    const user = (await HttpClient.get(
      `${API_ROUTES.USER}?email=${email}`
    )) as UserModel[];

    return user;
  } catch (error) {
    return [];
  }
};

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
          const user = await getUser(email);

          const [foundUser, ...rest] = user;

          if (!foundUser || !foundUser.password) {
            throw new Error(MESSAGES.LOGIN_NOTFOUND);
          }

          const passwordsMatch = await bcrypt.compare(
            password,
            foundUser.password
          );

          if (passwordsMatch)
            return {
              id: foundUser.userId,
              name: foundUser.username,
              isAdmin: foundUser.isAdmin,
              image: foundUser.avatar,
              email: foundUser.email,
            };
        }

        throw new Error(MESSAGES.INVALID_CREDENTIALS);
      },
    }),
  ],
});
