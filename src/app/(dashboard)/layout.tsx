import { Box, Flex } from "@chakra-ui/react";
import { Logo } from "@app/components/common";
import SessionWrapper from "../SessionWrapper";
import NavbarBase from "../ui/navbar";

const DashboardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <SessionWrapper>
      <Flex bgColor="white" borderRadius="10px" height="100%">
        <Flex
          flexDir="column"
          gap="100px"
          padding="38px 66px"
          alignItems="center"
        >
          <Logo />
          <NavbarBase />
        </Flex>
        <Box
          w="100%"
          h="100%"
          bgColor="backgroundContent"
          borderRightRadius="10px"
          pos="relative"
        >
          {children}
        </Box>
      </Flex>
    </SessionWrapper>
  );
};

export default DashboardLayout;
