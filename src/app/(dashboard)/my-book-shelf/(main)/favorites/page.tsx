"use client";

import { useSession } from "next-auth/react";
import { Flex } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { getAllBook, getUserById, updateUserById } from "@app/api-request";
import { BookType, User } from "@app/models";
import { LoadingIndicator } from "@app/components/common";
import { useEffect, useState } from "react";
import { filterBooksFavorite } from "@app/utils";
import { TableItem } from "@app/components";

const MyBookShelfFavorites = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [dataUserById, setDataUserById] = useState<User>();
  const [dataByFavorites, setDataByFavorites] = useState<BookType[]>([]);

  const fetchData = async () => {
    try {
      const user = (await getUserById(session?.user?.id || "")) as User;
      const books = await getAllBook();

      const favorites = user?.favorites || [];
      const booksByFavorites = filterBooksFavorite(books, favorites);

      setDataUserById(user);
      setDataByFavorites(booksByFavorites);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  useEffect(() => {
    if (session?.user?.id) {
      fetchData();
    }
  }, [session?.user?.id]);

  const handleUpdateFavorites = async (id: string) => {
    if (!dataUserById) return;

    try {
      let listFavorite = dataUserById?.favorites || [];
      if (dataUserById?.favorites.includes(id)) {
        listFavorite = dataUserById?.favorites.filter((item) => item !== id);
      } else {
        listFavorite = [...dataUserById.favorites, id];
      }

      await updateUserById(dataUserById.id, {
        ...dataUserById,
        favorites: listFavorite,
      });

      return router.refresh();
    } catch (error) {
      console.error("Failed to favorite book:", error);
    }
  };

  if (!dataByFavorites || !dataUserById) {
    return <LoadingIndicator />;
  }

  return (
    <Flex
      flexDir="column"
      gap="23px"
      mt="23px"
      justifyContent="space-between"
      overflow="hidden scroll"
      maxH="65vh"
    >
      {dataByFavorites.map((itemBook: BookType) => {
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
            status={dataUserById?.shelfBooks?.includes(id)}
            publicationYear={publicationYear}
            rating={rating}
            edition={edition}
            category={category}
            isFavorite={dataUserById?.favorites?.includes(id)}
            onUpdateFavorites={() => handleUpdateFavorites(id)}
          />
        );
      })}
    </Flex>
  );
};

export default MyBookShelfFavorites;
