"use client";

import { Box, Flex, Text } from "@chakra-ui/react";
import Image from "next/image";
import { Button } from "../common";
import { memo } from "react";

interface CartBorrowProps {
  id: string;
  title: string;
  author: string;
  publicationYear: number;
  rating: number;
  imgUrl: string;
  createDate: string;
  onReturnBook: (id: string) => void;
}

const CartBorrow = ({
  id,
  title,
  author,
  publicationYear,
  rating,
  imgUrl,
  createDate,
  onReturnBook,
}: CartBorrowProps) => {
  const handleReturnBook = () => {
    onReturnBook(id);
  };

  return (
    <Flex
      gap="25px"
      w={308}
      h="auto"
      py="15px"
      pl="15px"
      pr="20px"
      bgColor="white"
      borderRadius="10px"
    >
      <Flex flexDirection="column" gap="5px" w={123}>
        <Image
          src={imgUrl}
          alt="Don't make me think"
          width={123}
          height={170}
          priority
        />
        <Text size="sm">{title}</Text>
        <Flex>
          <Text size="xs">{author},</Text>
          <Text size="xs">{publicationYear}</Text>
        </Flex>
        <Flex>
          <Text size="xs">{rating}/</Text>
          <Text size="xs" color="dark.70">
            5
          </Text>
        </Flex>
      </Flex>
      <Flex flexDirection="column" justifyContent="space-between">
        <Box>
          <Text size="md" mb="10px">
            Borrowed on
          </Text>
          <Text size="xs">{createDate}</Text>
        </Box>
        <Button
          data-testid="return-book"
          variant="outline"
          size="md"
          w={125}
          boxShadow="none"
          text="Return"
          onClick={handleReturnBook}
        />
      </Flex>
    </Flex>
  );
};

export default memo(CartBorrow);
