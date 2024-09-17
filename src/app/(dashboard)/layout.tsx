"use client";

import { Box, Flex } from "@chakra-ui/react";
import { Logo, Navbar } from "@app/components/common";
import { TopContent } from "@app/components";
import { useSession } from "next-auth/react";

const DashboardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { data: session } = useSession();

  return (
    <Flex bgColor="white" borderRadius="10px" height="100%">
      <Flex
        flexDir="column"
        gap="100px"
        padding="38px 66px"
        alignItems="center"
      >
        <Logo />
        <Navbar isAdmin={session?.user?.isAdmin} />
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
  );
};
export default DashboardLayout;
