import { Register } from "@app/features/auth/components";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register",
  description:
    "My book shelf management is an online book reading application that helps users conveniently borrow books.",
};

const RegisterPage = () => <Register />;

export default RegisterPage;
