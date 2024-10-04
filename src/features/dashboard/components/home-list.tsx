"use client";

import { memo } from "react";
import { Grid } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { BookType, User } from "@app/models";
import { Cart } from "@app/components/common";
import { updateUserById } from "../actions";
import { MESSAGES } from "@app/constants";

interface ListCartProps {
  user: User;
  list: BookType[];
}

export const ListCart = memo(({ list, user }: ListCartProps) => {
  const router = useRouter();

  const handleUpdateFavorites = async (id: string) => {
    try {
      let listFavorite = user?.favorites;
      if (user?.favorites.includes(id)) {
        listFavorite = user?.favorites.filter((item) => item !== id);
      } else {
        listFavorite = [...(user?.favorites as string[]), id];
      }

      await updateUserById(user?.id as string, {
        ...user,
        favorites: listFavorite,
      });

      return router.refresh();
    } catch (error) {
      if (error instanceof Error) {
        return error.message;
      }
      return MESSAGES.RESPONSE_ERROR;
    }
  };

  return (
    <Grid
      p="70px 44px"
      gridTemplateRows="auto auto"
      gridTemplateColumns="repeat(6, 1fr)"
      gap="40px 10px"
    >
      {list.map((item: BookType) => {
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
            isFavorite={user?.favorites?.includes(id)}
            onUpdateFavorites={() => handleUpdateFavorites(id)}
          />
        );
      })}
    </Grid>
  );
});
