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
        bgColor="var(--chakra-colors-chakra-body-bg)"
        p="105px"
        gap="55px"
        maxW={678}
        borderRadius="10px"
        alignItems="center"
      >
        <Text color="var(--chakra-colors-chakra-body-text)">
          Thank you For your Submission{" "}
        </Text>
        <CheckIcon />
        <Text color="var(--chakra-colors-chakra-body-text)">
          You will be contacted shortly
        </Text>
      </Flex>
    </>
  );
};
