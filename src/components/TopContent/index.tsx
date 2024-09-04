"use client";

import { Flex } from "@chakra-ui/react";
import { MenuProfile, SearchBar } from "../common";

interface TopContentProps {
  isSearch?: boolean;
}

const TopContent = ({ isSearch = true }: TopContentProps) => (
  <Flex
    alignItems="center"
    justifyContent={!isSearch ? "flex-end" : "space-between"}
    p="32px 48px"
  >
    {isSearch && <SearchBar />}
    <MenuProfile />
  </Flex>
);

export default TopContent;
