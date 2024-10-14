import { FooterForm, HeadingForm } from "@app/components";
import { ROUTES } from "@app/constants";
import { RegisterForm } from "@app/features/auth/components";
import { Box } from "@chakra-ui/react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register",
  description:
    "My book shelf management is an online book reading application that helps users conveniently borrow books.",
};

const RegisterPage = () => (
  <Box
    w="100%"
    maxW={565}
    pt="63px"
    px="70px"
    bgColor="white"
    borderRadius="10px"
    boxShadow="0 0 5px 1px rgb(0 0 0 / 25%)"
    position="absolute"
    top="50%"
    left="50%"
    transform="translate(-50%, -50%)"
  >
    <HeadingForm title="Registration" description="For Both Staff & Students" />
    <RegisterForm />
    <FooterForm
      text="Already a User?"
      textLink="Login now"
      pb="80px"
      link={ROUTES.LANDING_PAGE}
    />
  </Box>
);

export default RegisterPage;
