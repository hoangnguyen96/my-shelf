"use client";

import { CheckIcon } from "@app/assets/icons";
import { Flex, Text } from "@chakra-ui/react";
import { memo } from "react";

const ContributeComplete = () => {
  return (
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
  );
};

export default memo(ContributeComplete);
