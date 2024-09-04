"use client";

import { getAllBook, getUserById } from "@app/api";
import { TableList } from "@app/components/common";
import { TYPE_SEARCH } from "@app/constants";
import { BookType, User } from "@app/models";
import { Flex } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";

const MyBookShelfFavorites = async () => {
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const type = searchParams.get("type") || "";
  const value = searchParams.get("query") || "";

  const dataUserById = (await getUserById(session?.user?.id || "")) as User;
  const dataBooks = await getAllBook();

  const favorites = dataUserById?.favorites || [];
  const dataByFavorites = dataBooks.filter((item) =>
    favorites.includes(item.id)
  );
  const dataFavoriteBooksFinal: BookType[] = dataByFavorites.filter((item) =>
    type === TYPE_SEARCH.TITLE && value
      ? item.title.toLowerCase().includes(value.toLowerCase())
      : type === TYPE_SEARCH.AUTHOR && value
        ? item.author.toLowerCase().includes(value.toLowerCase())
        : item
  );
  return (
    <Flex
      flexDir="column"
      gap="23px"
      mt="23px"
      justifyContent="space-between"
      overflow="hidden scroll"
      maxH="65vh"
    >
      {dataFavoriteBooksFinal.map((itemBook: BookType) => {
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
            status={dataUserById.shelfBooks.includes(id)}
            publicationYear={publicationYear}
            rating={rating}
            edition={edition}
            category={category}
            idFavorite={dataUserById.favorites.includes(id)}
          />
        );
      })}
    </Flex>
  );
};

export default MyBookShelfFavorites;
