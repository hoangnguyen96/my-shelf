"use client";

import { Flex, IconButton, useColorMode } from "@chakra-ui/react";
import { usePathname } from "next/navigation";
import { ROUTES } from "@app/constants";
import { SearchBar } from "../common";
import MenuProfile from "../MenuProfile";
import { memo } from "react";
import { Session } from "next-auth";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

const TopContent = ({ session }: { session?: Session }) => {
  const pathName = usePathname();
  const { colorMode, toggleColorMode } = useColorMode();

  const isNotSearch =
    pathName?.includes(ROUTES.CONTRIBUTE) ||
    pathName?.includes(ROUTES.CONTRIBUTE_COMPLETE) ||
    pathName?.includes(ROUTES.CONTRIBUTE_LIST) ||
    pathName?.includes(ROUTES.PREVIEW) ||
    pathName?.includes(ROUTES.PROFILE);

  return (
    <Flex
      alignItems="center"
      justifyContent={!isNotSearch ? "space-between" : "flex-end"}
      p="32px 44px"
      gap="10px"
    >
      {!isNotSearch && <SearchBar />}
      <Flex alignItems="center" gap="20px">
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
        <MenuProfile session={session} />
      </Flex>
    </Flex>
  );
};

export default memo(TopContent);
