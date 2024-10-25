import { memo } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import Image from "next/image";
import { formatDate } from "@app/utils";
import { Button } from "../common";

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
      maxH={290}
      py="15px"
      pl="15px"
      pr="20px"
      bgColor="var(--chakra-colors-chakra-body-bg)"
      borderRadius="10px"
    >
      <Flex flexDirection="column" gap="5px" w={123}>
        <Image
          src={imgUrl}
          alt={title || "Image Cart borrowed!"}
          width={123}
          height={170}
          priority={true}
          fetchPriority="high"
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
          <Text size="xs">{formatDate(new Date(createDate))}</Text>
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
