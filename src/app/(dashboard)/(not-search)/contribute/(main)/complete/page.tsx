"use client";

import { ContributeComplete } from "@app/components/common";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { Text } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const ContributeCompletePage = () => {
  const router = useRouter();

  return (
    <>
      <Link href="#" onClick={() => router.back()} style={{ margin: "0 68px" }}>
        <ArrowBackIcon w={5} h={5} />
        <Text as="span" ml="9px">
          Back
        </Text>
      </Link>
      <ContributeComplete />;
    </>
  );
};

export default ContributeCompletePage;
