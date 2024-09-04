"use client";

import { Box, Spinner } from "@chakra-ui/react";

const Loading = () => (
  <Box
    h="80%"
    display="flex"
    alignItems="center"
    textAlign="center"
    justifyContent="center"
  >
    <Spinner size="lg" thickness="4px" speed="0.65s" color="brand.500" />
  </Box>
);

export default Loading;
