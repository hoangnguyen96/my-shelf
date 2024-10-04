import { Contribute } from "@app/features/dashboard/components";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contribute",
  description:
    "My book shelf management is an online book reading application that helps users conveniently borrow books.",
};

const ContributePage = () => <Contribute />;

export default ContributePage;
