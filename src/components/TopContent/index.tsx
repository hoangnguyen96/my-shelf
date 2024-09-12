"use client";

import { Flex } from "@chakra-ui/react";
import { usePathname } from "next/navigation";
import { ROUTES } from "@app/constants";
import { SearchBar } from "../common";
import MenuProfile from "../MenuProfile";
import { memo } from "react";

const TopContent = () => {
  const pathName = usePathname();

  const isNotSearch =
    pathName?.includes(
      ROUTES.CONTRIBUTE ||
        ROUTES.CONTRIBUTE_COMPLETE ||
        ROUTES.CONTRIBUTE_LIST ||
        ROUTES.PREVIEW
    ) || pathName?.includes(ROUTES.PROFILE);

  return (
    <Flex
      alignItems="center"
      justifyContent={!isNotSearch ? "space-between" : "flex-end"}
      p="32px 48px"
    >
      {!isNotSearch && <SearchBar />}
      <MenuProfile />
    </Flex>
  );
};

export default memo(TopContent);
