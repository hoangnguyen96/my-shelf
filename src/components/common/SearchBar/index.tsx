"use client";

import { memo, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  Input,
  InputGroup,
  IconButton,
  Select,
  Flex,
  InputProps,
  Box,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { TYPE_SEARCH } from "@app/constants";

const SearchBar = ({ placeholder = "Search...", ...rest }: InputProps) => {
  const [prevPath, setPrevPath] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchType(event.target.value);
  };

  const handleSearch = () => {
    setPrevPath(pathname);
    const params = new URLSearchParams(searchParams.toString());
    params.delete(TYPE_SEARCH.TITLE);
    params.delete(TYPE_SEARCH.AUTHOR);

    if (searchType && searchTerm) {
      params.set(searchType, searchTerm);
    }

    const newPath = `${pathname}${
      searchType && searchTerm ? `?${params.toString()}` : ""
    }`;

    return router.replace(newPath);
  };

  useEffect(() => {
    if (!pathname?.includes(prevPath)) {
      setSearchType("");
      setSearchTerm("");
    }
  }, [pathname]);

  return (
    <Flex
      boxShadow="0 0 3px 0px #a9a9a9"
      borderRadius="40px"
      w="100%"
      maxW={540}
    >
      <Select
        aria-label="select-label"
        placeholder="Select"
        border="none"
        value={searchType}
        borderLeftRadius="40px"
        w="120px"
        h="50px"
        _focusVisible={{ borderColor: "transparent" }}
        onChange={handleTypeChange}
      >
        <Box as="option" value="title">
          Title
        </Box>
        <Box as="option" value="author">
          Author
        </Box>
      </Select>
      <InputGroup size="md">
        <Input
          placeholder={placeholder}
          value={searchTerm}
          onChange={handleSearchChange}
          pr="18px"
          h="50px"
          border="none"
          borderRightRadius="40px"
          borderLeftRadius="inherit"
          _placeholder={{ color: "gray.500" }}
          {...rest}
        />
        <IconButton
          aria-label="Search"
          data-testid="submit-search"
          h="100%"
          minW="60px"
          icon={<SearchIcon w="20px" height="20px" />}
          position="absolute"
          right="0"
          top="0"
          bottom="0"
          onClick={handleSearch}
          variant="outline"
          border="none"
          outline="none"
          boxShadow="none"
          bg="transparent"
          _hover={{ bg: "transparent" }}
        />
      </InputGroup>
    </Flex>
  );
};

export default memo(SearchBar);
