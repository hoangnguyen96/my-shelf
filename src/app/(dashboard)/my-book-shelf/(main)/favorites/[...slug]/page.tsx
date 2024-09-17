"use client";

import { useSession } from "next-auth/react";
import { Flex } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { getAllBook, getUserById, updateUserById } from "@app/api-request";
import { BookType, User } from "@app/models";
import { LoadingIndicator } from "@app/components/common";
import { useEffect, useState } from "react";
import { filterBooksFavorite, filterBooksFavoriteByParams } from "@app/utils";
import { TableItem } from "@app/components";

const MyBookShelfFavorites = ({ params }: { params: { slug: string[] } }) => {
  const { data: session } = useSession();
  const [dataUserById, setDataUserById] = useState<User>();
  const [dataByFavorites, setDataByFavorites] = useState<BookType[]>([]);
  const router = useRouter();
  const type = params.slug[0];
  const value = params.slug[1];

  const fetchData = async () => {
    try {
      const user = (await getUserById(session?.user?.id as string)) as User;
      const books = await getAllBook();

      const favorites = user?.favorites || [];
      const booksByFavorites = filterBooksFavorite(books, favorites);

      const filteredBooks = filterBooksFavoriteByParams(
        booksByFavorites,
        type,
        value
      );

      setDataUserById(user);
      setDataByFavorites(filteredBooks);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  useEffect(() => {
    if (session?.user?.id) {
      fetchData();
    }
  }, [session?.user?.id, type, value]);

  const handleUpdateFavorites = async (id: string) => {
    try {
      let listFavorite = dataUserById?.favorites;
      if (dataUserById?.favorites.includes(id)) {
        listFavorite = dataUserById?.favorites.filter((item) => item !== id);
      } else {
        listFavorite = [...(dataUserById?.favorites as string[]), id];
      }

      await updateUserById(dataUserById?.id as string, {
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
