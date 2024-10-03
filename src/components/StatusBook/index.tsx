"use client";

import { memo } from "react";
import { Box, Text } from "@chakra-ui/react";

interface StatusBookProps {
  status?: boolean;
}

const StatusBook = ({ status = false }: StatusBookProps) => (
  <Box
    w="100%"
    maxW={85}
    height={26}
    bgColor={status ? "green.600" : "gray.600"}
    borderRadius="5px"
  >
    <Text size="md" color="white" lineHeight="26px" textAlign="center">
      {status ? "In-Shelf" : "None"}
    </Text>
  </Box>
);

export default memo(StatusBook);
