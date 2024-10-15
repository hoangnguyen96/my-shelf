"use server";

import { AuthError } from "next-auth";
import { MESSAGES } from "@app/constants";
import { User } from "@app/interface";
import { signIn, signOut } from "@app/auth";

export const authenticate = async (formData: Partial<User>) => {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      return MESSAGES.EMAIL_PASSWORD_INVALID;
    }
    throw error;
  }
};

export const logout = async () => {
  await signOut();
};
