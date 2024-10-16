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
        gap={{ base: "2%", xl: "5%", "2xl": "6%" }}
      >
        <Text
          size="xl"
          w="100%"
          fontWeight={500}
          minW={{ base: 235, "2xl": 320 }}
          maxW={{ base: "24%", "2xl": "22%" }}
          gap={{ base: "20px", "2xl": "47px" }}
        >
          Title
        </Text>
        <Flex
          w="100%"
          alignItems="center"
          maxW={{ base: "18%" }}
          gap={{ base: "10px", xl: "20px", "2xl": "60px" }}
          minW={{ base: 205, xl: "22%", "2xl": 225 }}
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
        maxH="65vh"
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
