import { auth } from "@app/auth";
import { Box, Flex } from "@chakra-ui/react";
import { Logo, Navbar } from "@app/components/common";
import { TopContent } from "@app/components";
import { User } from "@app/interface";
import { Session } from "next-auth";

const DashboardLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const session = await auth();

  return (
    <Flex bgColor="white" borderRadius="10px" height="100%">
      <Flex
        flexDir="column"
        gap="100px"
        padding="38px 66px"
        alignItems="center"
      >
        <Logo user={session?.user as User} />
        <Navbar isAdmin={session?.user?.isAdmin} />
      </Flex>
      <Box
        w="100%"
        h="100%"
        bgColor="backgroundContent"
        borderRightRadius="10px"
        pos="relative"
      >
        <TopContent session={session as Session} />
        {children}
      </Box>
    </Flex>
  );
};
export default DashboardLayout;
