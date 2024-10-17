"use client";

import { memo } from "react";
import { TableItem } from "@app/components";
import { BookType, User } from "@app/interface";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { Box, Flex, Text } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface ContributeListProps {
  user: User;
  list: BookType[];
}

export const ContributeList = memo(({ user, list }: ContributeListProps) => {
  const router = useRouter();

  const handleClickBack = () => {
    return router.back();
  };

  return (
    <Box p="20px 44px">
      <Link href="#" data-testid="click-back" onClick={handleClickBack}>
        <ArrowBackIcon w={5} h={5} />
        <Text as="span" ml="9px">
          Back
        </Text>
      </Link>

      <Flex
        mt="66px"
        alignItems="center"
        overflow="hidden"
        gap={{ base: "2%", xl: "5%", "2xl": "6%" }}
      >
        <Text
          size="xl"
          minW={{ base: 227, xl: 260, "2xl": 318 }}
          maxW={{ base: 227, xl: 260, "2xl": 318 }}
          fontWeight={500}
          gap={{ base: "20px", "2xl": "47px" }}
        >
          Title
        </Text>
        <Flex
          alignItems="center"
          minW={{ base: 228, "2xl": 296 }}
          maxW={{ base: 228, "2xl": 296 }}
          gap={{ base: "10px", xl: "20px", "2xl": "60px" }}
        >
          <Text size="xl" fontWeight={500}>
            Ratings
          </Text>
          <Text size="xl" fontWeight={500}>
            Category
          </Text>
        </Flex>
      </Flex>
      <Flex
        flexDir="column"
        gap="23px"
        mt="23px"
        justifyContent="space-between"
        overflow="hidden scroll"
        maxH="60vh"
      >
        {list.map((itemBook: BookType) => {
          const {
            id,
            title,
            author,
            imageUrl,
            publicationYear,
            rating,
            edition,
            category,
          } = itemBook;

          return (
            <TableItem
              key={id}
              id={id}
              title={title}
              author={author}
              imageUrl={imageUrl}
              isContribute={true}
              category={category}
              publicationYear={publicationYear}
              rating={rating}
              edition={edition}
              isFavorite={user?.favorites?.includes(id)}
            />
          );
        })}
      </Flex>
    </Box>
  );
});
