"use client";

import { Flex } from "@chakra-ui/react";
import { MenuProfile, SearchBar } from "@app/components/common";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Flex alignItems="center" justifyContent="space-between" p="32px 48px">
        <SearchBar />
        <MenuProfile />
      </Flex>
      {children}
    </>
  );
};

export default Layout;
