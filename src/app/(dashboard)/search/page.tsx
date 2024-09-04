"use client";

import { useSession } from "next-auth/react";
import { Box, Flex, Text } from "@chakra-ui/react";
import { getAllBook, getBookByParams, getUserById } from "@app/api";
import { BookType, User } from "@app/models";
import { Pagination, TableList } from "@app/components/common";
import { TopContent } from "@app/components";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { dividePaginationBooks } from "@app/utils";

const SearchPage = async () => {
  const { data: session } = useSession();
  const [pagination, setPagination] = useState<number>(0);
  const searchParams = useSearchParams();
  const type = searchParams.get("type");
  const value = searchParams.get("query");

  const dataUserById = (await getUserById(session?.user?.id || "")) as User;
  const dataAllBook = await getAllBook();
  const dataBook = dividePaginationBooks(dataAllBook);

  let dataBookByParams: BookType[][] = [];
  if (type && value) {
    const dataParams = await getBookByParams(`${type}=${value}`);
    dataBookByParams = dividePaginationBooks(dataParams);
  }
  const listData: BookType[] =
    type && value
      ? dataBookByParams[pagination] || []
      : dataBook[pagination] || [];
  const dataPagination = type && value ? dataBookByParams : dataBook;

  return (
    <>
      <TopContent />
      <Box p="70px 44px">
        <Flex gap="90px" alignItems="center">
          <Text size="xl" fontWeight={500} w="100%" maxW={352}>
            Title
          </Text>
          <Flex gap="60px" w="100%" maxW={312}>
            <Text size="xl" fontWeight={500}>
              Ratings
            </Text>
            <Text size="xl" fontWeight={500}>
              Category
            </Text>
          </Flex>
          <Text size="xl" fontWeight={500}>
            Status
          </Text>
        </Flex>
        <Flex
          flexDir="column"
          gap="23px"
          mt="23px"
          justifyContent="space-between"
          overflowY="scroll"
          maxH="62vh"
        >
          {listData.map((itemBook: BookType) => {
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
              <TableList
                key={id}
                id={id}
                title={title}
                author={author}
                imageUrl={imageUrl}
                category={category}
                status={dataUserById.shelfBooks.includes(id)}
                publicationYear={publicationYear}
                rating={rating}
                edition={edition}
                idFavorite={dataUserById.favorites.includes(id) || false}
              />
            );
          })}
        </Flex>
      </Box>
      <Pagination
        data={dataPagination}
        pagination={pagination}
        setPagination={setPagination}
      />
    </>
  );
};

export default SearchPage;
