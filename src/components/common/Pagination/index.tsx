"use client";

import { Dispatch, memo, SetStateAction } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Flex, IconButton } from "@chakra-ui/react";
import { Button } from "..";
import { BookType } from "@app/models";

interface PaginationProps {
  pagination: number;
  setPagination: Dispatch<SetStateAction<number>>;
  data: BookType[][];
}

const Pagination = ({ pagination, setPagination, data }: PaginationProps) => (
  <Flex
    justifyContent="center"
    alignItems="center"
    gap="8px"
    position="absolute"
    left="0"
    right="0"
    bottom="60px"
  >
    <IconButton
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
      aria-label={""}
      _focusVisible="none"
      _hover={{ bgColor: "transparent" }}
    />

    {data.map((_, index) => (
      <Button
        key={index}
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
      size="sm"
      width="30px"
      height="30px"
      variant="outline"
      color="brand.90"
      bgColor="transparent"
      minW="auto"
      onClick={() => setPagination(pagination + 1)}
      isDisabled={pagination === data.length - 1}
      icon={<ChevronRightIcon />}
      aria-label={""}
      _focusVisible="none"
      _hover={{ bgColor: "transparent" }}
    />
  </Flex>
);

export default memo(Pagination);
