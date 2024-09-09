"use client";

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

interface SearchBarProps extends InputProps {
  typeSearch: string;
  valueSearch: string;
  onSubmitSearch: () => void;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSelectChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const SearchBar = ({
  placeholder = "Search...",
  typeSearch,
  valueSearch,
  onInputChange,
  onSelectChange,
  onSubmitSearch,
}: SearchBarProps) => (
  <Flex boxShadow="0 0 3px 0px #a9a9a9" borderRadius="40px" w="100%" maxW={540}>
    <Select
      placeholder="Select"
      border="none"
      value={typeSearch}
      borderLeftRadius="40px"
      w="120px"
      h="50px"
      bgColor="backgroundTitle"
      _focusVisible={{ borderColor: "transparent" }}
      onChange={onSelectChange}
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
        value={valueSearch}
        onChange={onInputChange}
        pr="18px"
        h="50px"
        border="none"
        borderRightRadius="40px"
        borderLeftRadius="inherit"
        _placeholder={{ color: "gray.500" }}
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
        onClick={onSubmitSearch}
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

export default SearchBar;
