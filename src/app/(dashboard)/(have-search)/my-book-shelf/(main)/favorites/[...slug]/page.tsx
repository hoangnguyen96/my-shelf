"use client";

import { useSession } from "next-auth/react";
import { Flex } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { TYPE_SEARCH } from "@app/constants";
import { getAllBook, getUserById, updateUserById } from "@app/api";
import { BookType, User } from "@app/models";
import { LoadingIndicator, TableList } from "@app/components/common";
import { useEffect, useState } from "react";

const MyBookShelfFavorites = ({ params }: { params: { slug: string[] } }) => {
  const { data: session } = useSession();
  const [dataUserById, setDataUserById] = useState<User>();
  const [dataByFavorites, setDataByFavorites] = useState<BookType[]>([]);
  const router = useRouter();
  const type = params.slug[0];
  const value = params.slug[1];

  const fetchData = async () => {
    try {
      const user = (await getUserById(session?.user?.id || "")) as User;
      const books = await getAllBook();

      const favorites = user?.favorites || [];
      const booksByFavorites = books.filter((item) =>
        favorites.includes(item.id)
      );

      const filteredBooks = booksByFavorites.filter((item) =>
        type === TYPE_SEARCH.TITLE && value
          ? item.title.toLowerCase().includes(value.toLowerCase())
          : type === TYPE_SEARCH.AUTHOR && value
            ? item.author.toLowerCase().includes(value.toLowerCase())
            : item
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
    if (!dataUserById) return;

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
          <TableList
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
            idFavorite={dataUserById?.favorites?.includes(id)}
            onUpdateFavorites={handleUpdateFavorites}
          />
        );
      })}
    </Flex>
  );
};

export default MyBookShelfFavorites;
