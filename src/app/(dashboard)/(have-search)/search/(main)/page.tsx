"use client";

import { useSession } from "next-auth/react";
import { Flex, Text } from "@chakra-ui/react";
import { getAllBook, getUserById, updateUserById } from "@app/api";
import { BookType, User } from "@app/models";
import { Pagination, TableList } from "@app/components/common";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { dividePaginationBooks } from "@app/utils";

const SearchPage = async () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [pagination, setPagination] = useState<number>(0);

  const dataUserById = (await getUserById(session?.user?.id || "")) as User;
  const dataAllBook = await getAllBook();
  const dataBook = dividePaginationBooks(dataAllBook);
  const listData: BookType[] = dataBook[pagination];

  const handleUpdateFavorites = async (id: string) => {
    let listFavorite = dataUserById.favorites;
    if (dataUserById.favorites.includes(id)) {
      listFavorite = dataUserById.favorites.filter((item) => item !== id);
    } else {
      listFavorite = [...dataUserById.favorites, id];
    }

    await updateUserById(dataUserById.id, {
      ...dataUserById,
      favorites: listFavorite,
    });

    return router.refresh();
  };

  if (!listData || !dataUserById) {
    return <Text>No data...</Text>;
  }

  return (
    <>
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
              status={dataUserById?.shelfBooks?.includes(id)}
              publicationYear={publicationYear}
              rating={rating}
              edition={edition}
              idFavorite={dataUserById?.favorites?.includes(id) || false}
              onUpdateFavorites={handleUpdateFavorites}
            />
          );
        })}
      </Flex>
      <Pagination
        data={dataBook}
        pagination={pagination}
        setPagination={setPagination}
      />
    </>
  );
};

export default SearchPage;
