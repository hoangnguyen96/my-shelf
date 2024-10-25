"use client";

import { memo } from "react";
import { HeadingTable, TableItem } from "@app/components";
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
        mt="60px"
        flexDir="column"
        gap="12px"
        justifyContent="space-between"
        overflow="auto"
        maxH="60vh"
        sx={{
          "::-webkit-scrollbar-track": {
            marginTop: "60px",
          },
        }}
      >
        <HeadingTable isStatus={false} />

        <Flex flexDir="column" gap="23px" justifyContent="space-between">
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
            } = itemBook || {};

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
      </Flex>
    </Box>
  );
});
