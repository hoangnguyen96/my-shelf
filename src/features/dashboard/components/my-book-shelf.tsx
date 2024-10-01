"use client";

import { memo } from "react";
import { useRouter } from "next/navigation";
import { Flex } from "@chakra-ui/react";
import { BookType, User } from "@app/models";
import { getBookById, updateBookById, updateUserById } from "../actions";
import { CartBorrow } from "@app/components";

interface MyBookShelfProps {
  user: User;
  list: BookType[];
}

export const MyBookShelf = memo(({ list, user }: MyBookShelfProps) => {
  const router = useRouter();

  const handleReturnBook = async (id: string) => {
    try {
      const dataBookById = (await getBookById(id)) as BookType;
      const updateShelfBook = user?.shelfBooks.filter(
        (item: string) => item !== id
      );

      await updateUserById(user?.id as string, {
        ...user,
        shelfBooks: updateShelfBook,
      });

      await updateBookById(id, {
        ...dataBookById,
        status: false,
      });
      return router.refresh();
    } catch (error) {
      console.error("Failed to return book:", error);
    }
  };

  return (
    <Flex gap="40px" flexWrap="wrap" overflow="hidden scroll" maxH="65vh">
      {list.map((item) => {
        const {
          id,
          title,
          author,
          publicationYear,
          rating,
          imageUrl,
          createdDate,
        } = item;

        return (
          <CartBorrow
            key={id}
            id={id}
            title={title}
            author={author}
            publicationYear={publicationYear}
            rating={rating}
            imgUrl={imageUrl}
            createDate={createdDate}
            onReturnBook={handleReturnBook}
          />
        );
      })}
    </Flex>
  );
});
