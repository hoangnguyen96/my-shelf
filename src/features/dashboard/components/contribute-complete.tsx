"use client";

import Link from "next/link";
import { Flex, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { CheckIcon } from "@app/assets/icons";

export const ContributeComplete = () => {
  const router = useRouter();

  const handleClickBack = () => {
    return router.back();
  };

  return (
    <>
      <Link
        href="#"
        data-testid="click-back"
        onClick={handleClickBack}
        style={{ position: "absolute", top: 0, left: "68px" }}
      >
        <ArrowBackIcon w={5} h={5} />
        <Text as="span" ml="9px">
          Back
        </Text>
      </Link>
      <Flex
        flexDirection="column"
        bgColor="white"
        p="105px"
        gap="55px"
        maxW={678}
        borderRadius="10px"
        alignItems="center"
      >
        <Text color="dark.100">Thank you For your Submission </Text>
        <CheckIcon />
        <Text color="dark.100">You will be contacted shortly</Text>
      </Flex>
    </>
  );
};
