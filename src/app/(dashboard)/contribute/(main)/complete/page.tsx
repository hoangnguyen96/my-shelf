"use client";

import { ContributeComplete } from "@app/components";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { Text } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const ContributeCompletePage = () => {
  const router = useRouter();

  return (
    <>
      <Link
        href="#"
        onClick={() => router.back()}
        style={{ position: "absolute", top: 0, left: "68px" }}
      >
        <ArrowBackIcon w={5} h={5} />
        <Text as="span" ml="9px">
          Back
        </Text>
      </Link>
      <ContributeComplete />
    </>
  );
};

export default ContributeCompletePage;
