"use client";

import { Grid, Text } from "@chakra-ui/react";
import { BookType, User } from "@app/models";
import { Cart, LoadingIndicator } from "@app/components/common";
import { getAllBook, getUserById, updateUserById } from "@app/api-request";
import { useSession } from "next-auth/react";
import { getTwelveItemData } from "@app/utils";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const HomePage = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [dataBook, setDataBook] = useState<BookType[]>([]);
  const [dataUserById, setDataUserById] = useState<User>();

  const fetchData = async () => {
    try {
      if (session?.user?.id) {
        const dataAllBook = await getAllBook();
        const user = await getUserById(session.user.id);
        const books = getTwelveItemData(dataAllBook);

        setDataBook(books);
        setDataUserById(user as User);
      }
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [session?.user?.id]);

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
      console.error("Failed to fetch data:", error);
    }
  };

  if (!dataBook || !dataUserById) {
    return <LoadingIndicator />;
  }

  return (
    <Grid p="70px 44px" gridTemplateColumns="repeat(6, 1fr)" gap="40px 10px">
      {dataBook.map((item: BookType) => {
        const { id, title, author, imageUrl, publicationYear, rating } = item;

        return (
          <Cart
            key={id}
            id={id}
            title={title}
            author={author}
            imageUrl={imageUrl}
            publicationYear={publicationYear}
            rating={rating}
            isFavorite={dataUserById?.favorites?.includes(id)}
            onUpdateFavorites={() => handleUpdateFavorites(id)}
          />
        );
      })}
    </Grid>
  );
};

export default HomePage;
