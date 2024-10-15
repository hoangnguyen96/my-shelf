"use client";

import { useCallback } from "react";
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import bcrypt from "bcryptjs";
import { MESSAGES, ROUTES } from "@app/constants";
import { User } from "@app/interface";
import { generateSevenDigitUUID } from "@app/utils";
import { authenticate } from "../../actions";
import { addUser } from "../../../dashboard/actions";
import { FormRegister } from "@app/components";

export const RegisterForm = () => {
  const toast = useToast();
  const router = useRouter();

  const handleSubmit = useCallback(async (values: Partial<User>) => {
    const uuid = generateSevenDigitUUID();
    const { username, email, password } = values;

    const hashedPassword = await bcrypt.hash(password as string, 10);

    const payload: Partial<User> = {
      username,
      email,
      password: hashedPassword,
      isAdmin: false,
      phone: "",
      bio: "",
      avatar: "https://i.ibb.co/SKHPQYq/avatar-default.webp",
      favorites: [],
      shelfBooks: [],
      userId: uuid,
    };

    try {
      await addUser(payload);
      await authenticate({ email, password });

      router.push(ROUTES.HOME);
      toast({
        title: "Register Successful.",
        description: MESSAGES.REGISTER_SUCCESS,
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      return;
    } catch (error) {
      if (error instanceof Error) {
        return toast({
          title: "Register Failed!",
          description: error.message,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
      return MESSAGES.RESPONSE_ERROR;
    }
  }, []);

  return <FormRegister onSubmit={handleSubmit} />;
};
