"use client";

import { Flex } from "@chakra-ui/react";
import AccountMenu from "@app/app/ui/menu";
import SearchBarBase from "@app/app/ui/search";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Flex alignItems="center" justifyContent="space-between" p="32px 48px">
        <SearchBarBase />
        <AccountMenu />
      </Flex>
      {children}
    </>
  );
};

export default Layout;
