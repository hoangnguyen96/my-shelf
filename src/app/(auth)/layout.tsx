"use client";

import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Box, IconButton, useColorMode } from "@chakra-ui/react";

const AuthLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <>
      <Box
        bgColor="var(--chakra-colors-chakra-body-bg)"
        borderRadius="8px"
        w={10}
        h={10}
      >
        <IconButton
          width="40px"
          height="40px"
          size="lg"
          variant="outline"
          border="none"
          bgColor="transparent"
          boxShadow="none"
          onClick={toggleColorMode}
          icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          minW="auto"
          aria-label="light-dark-mode"
          outline="none"
          _hover={{ bgColor: "borderDefault" }}
        />
      </Box>
      {children}
    </>
  );
};
export default AuthLayout;
