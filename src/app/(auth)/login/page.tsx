import { Login } from "@app/features/auth/components";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
  description:
    "My book shelf management is an online book reading application that helps users conveniently borrow books.",
};

const LoginPage = () => <Login />;

export default LoginPage;
