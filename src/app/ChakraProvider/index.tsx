"use client";

import { ChakraProvider } from "@chakra-ui/react";
import theme from "@app/themes";

export function ChakraUIProviders({ children }: { children: React.ReactNode }) {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
}
