"use client";

import { Grid, Text } from "@chakra-ui/react";
import { BookType, User } from "@app/models";
import { Cart } from "@app/components/common";
import { getAllBook, getUserById, updateUserById } from "@app/api";
import { useSession } from "next-auth/react";
import { getTwelveItemData } from "@app/utils";
import { useRouter } from "next/navigation";

const HomePage = async () => {
  const { data: session } = useSession();
  const router = useRouter();

  const dataAllBook = await getAllBook();
  const dataUserById = (await getUserById(session?.user?.id || "")) as User;
  const dataBook = getTwelveItemData(dataAllBook);

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

  if (!dataBook || !dataUserById) {
    return <Text>No data...</Text>;
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
            isFavorite={dataUserById?.favorites?.includes(id) || false}
            onUpdateFavorites={handleUpdateFavorites}
          />
        );
      })}
    </Grid>
  );
};

export default HomePage;
