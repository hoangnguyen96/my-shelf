"use client";

import { Flex } from "@chakra-ui/react";
import { usePathname } from "next/navigation";
import { ROUTES } from "@app/constants";
import { SearchBar } from "../common";
import MenuProfile from "../MenuProfile";
import { memo } from "react";
import { Session } from "next-auth";

const TopContent = ({ session }: { session?: Session }) => {
  const pathName = usePathname();

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
      <MenuProfile session={session} />
    </Flex>
  );
};

export default memo(TopContent);
