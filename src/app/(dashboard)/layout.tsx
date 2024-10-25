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
    <Flex
      bgColor="var(--chakra-colors-chakra-body-bg)"
      borderRadius="10px"
      height="100%"
    >
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
        minW={450}
        bgColor="var(--chakra-colors-chakra-subtle-bg)"
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
