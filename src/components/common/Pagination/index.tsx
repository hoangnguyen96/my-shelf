"use client";

import { Dispatch, memo, SetStateAction } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Flex, IconButton } from "@chakra-ui/react";
import { Button } from "..";

interface PaginationProps {
  pagination: number;
  totalPages: number;
  setPagination: Dispatch<SetStateAction<number>>;
}

const Pagination = ({
  pagination,
  totalPages,
  setPagination,
}: PaginationProps) => (
  <Flex
    justifyContent="center"
    alignItems="center"
    gap="8px"
    position="absolute"
    left="0"
    right="0"
    bottom="5%"
  >
    <IconButton
      data-testid="prev-pagination"
      width="30px"
      height="30px"
      size="sm"
      variant="outline"
      color="brand.90"
      bgColor="transparent"
      onClick={() => setPagination(pagination - 1)}
      isDisabled={pagination === 0}
      icon={<ChevronLeftIcon />}
      minW="auto"
      aria-label="prev-pagination"
      _focusVisible="none"
      _hover={{ bgColor: "transparent" }}
    />

    {Array.from({ length: totalPages }, (_, index) => (
      <Button
        key={index}
        data-testid="click-pagination"
        width="30px"
        height="30px"
        text={`${index + 1}`}
        variant="outline"
        size="sm"
        minW="auto"
        isActive={pagination === index}
        onClick={() => setPagination(index)}
      />
    ))}

    <IconButton
      data-testid="next-pagination"
      size="sm"
      width="30px"
      height="30px"
      variant="outline"
      color="brand.90"
      bgColor="transparent"
      minW="auto"
      onClick={() => setPagination(pagination + 1)}
      isDisabled={pagination === totalPages - 1}
      icon={<ChevronRightIcon />}
      aria-label="next-pagination"
      _focusVisible="none"
      _hover={{ bgColor: "transparent" }}
    />
  </Flex>
);

export default memo(Pagination);
