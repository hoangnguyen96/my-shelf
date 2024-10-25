import { FooterForm, HeadingForm } from "@app/components";
import { ROUTES } from "@app/constants";
import { LoginForm } from "@app/features/auth/components";
import { Box } from "@chakra-ui/react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
  description:
    "My book shelf management is an online book reading application that helps users conveniently borrow books.",
};

const LoginPage = () => (
  <Box
    w="100%"
    maxW="565px"
    pt="63px"
    px="70px"
    bgColor="var(--chakra-colors-chakra-body-bg)"
    borderRadius="10px"
    boxShadow="0 0 5px 1px rgb(0 0 0 / 25%)"
    position="absolute"
    top="50%"
    left="50%"
    transform="translate(-50%, -50%)"
  >
    <HeadingForm
      title="Welcome Back !"
      description="Sign in to continue to yourDigital Library"
    />
    <LoginForm />
    <FooterForm
      text="New User?"
      textLink="Register Here"
      pb="160px"
      link={ROUTES.REGISTER}
    />
  </Box>
);

export default LoginPage;
