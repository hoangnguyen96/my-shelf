"use client";

import { MESSAGES, ROUTES } from "@app/constants";
import { User } from "@app/interface";
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { authenticate } from "../../actions";
import { FormLogin } from "@app/components";

export const LoginForm = () => {
  const toast = useToast();
  const router = useRouter();

  const handleLogin = async (formData: Partial<User>) => {
    const errorMessage = await authenticate(formData);

    if (errorMessage) {
      toast({
        title: "Login failed",
        description: errorMessage,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    router.push(ROUTES.HOME);
    toast({
      title: "Login successful",
      description: MESSAGES.LOGIN_SUCCESS,
      status: "success",
      duration: 5000,
      isClosable: true,
    });
    return;
  };

  return <FormLogin onSubmit={handleLogin} />;
};
