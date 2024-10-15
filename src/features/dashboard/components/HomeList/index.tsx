"use client";

import { memo } from "react";
import { Flex } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { BookType, User } from "@app/interface";
import { Cart } from "@app/components/common";
import { updateUserById } from "../../actions";
import { MESSAGES } from "@app/constants";

interface HomeListProps {
  user: User;
  list: BookType[];
}

export const HomeList = memo(({ list, user }: HomeListProps) => {
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
    <Flex
      p="70px 44px"
      gap="40px"
      flexWrap="wrap"
      maxH="70vh"
      overflowY={{ base: "scroll", xl: "hidden" }}
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
    </Flex>
  );
});
