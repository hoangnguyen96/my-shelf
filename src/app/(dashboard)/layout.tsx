"use client";

import { Box, Flex } from "@chakra-ui/react";
import { Logo, Navbar } from "@app/components/common";
import { TopContent } from "@app/components";
import { SessionProvider } from "next-auth/react";

const DashboardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => (
  <SessionProvider>
    <Flex bgColor="white" borderRadius="10px" height="100%">
      <Flex
        flexDir="column"
        gap="100px"
        padding="38px 66px"
        alignItems="center"
      >
        <Logo />
        <Navbar />
      </Flex>
      <Box
        w="100%"
        h="100%"
        bgColor="backgroundContent"
        borderRightRadius="10px"
        pos="relative"
      >
        <TopContent />
        {children}
      </Box>
    </Flex>
  </SessionProvider>
);

export default DashboardLayout;
