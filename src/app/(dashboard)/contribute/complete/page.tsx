import { ContributeComplete } from "@app/features/dashboard/components";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contribute Complete",
  description:
    "My book shelf management is an online book reading application that helps users conveniently borrow books.",
};

const ContributeCompletePage = () => <ContributeComplete />;

export default ContributeCompletePage;
