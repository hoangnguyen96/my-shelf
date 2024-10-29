"use client";

import { memo } from "react";
import { Grid } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { BookType, User } from "@app/interface";
import { Cart } from "@app/components/common";
import { updateUserById } from "../../actions";
import { MESSAGES } from "@app/constants";
import isEqual from "react-fast-compare";

interface HomeListProps {
  user: User;
  list: BookType[];
}

const HomeListComponent = ({ list, user }: HomeListProps) => {
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
      gridTemplateColumns="repeat(6, 1fr)"
      gap="40px 20px"
      p="70px 2px"
      ml="42px"
      mr="44px"
      maxH="76%"
      overflow="auto"
      maxW={{ base: "100%", "2xl": 1260 }}
    >
      {list.map((item: BookType) => {
        const { id, title, author, imageUrl, publicationYear, rating } =
          item || {};

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
};

const areEqual = (prevProps: HomeListProps, nextProps: HomeListProps) => {
  return (
    isEqual(prevProps.user, nextProps.user) &&
    isEqual(prevProps.list, nextProps.list)
  );
};

export const HomeList = memo(HomeListComponent, areEqual);
