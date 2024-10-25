"use client";

import { memo } from "react";
import { useRouter } from "next/navigation";
import { Flex } from "@chakra-ui/react";
import { BookType, User } from "@app/interface";
import { getBookById, updateBookById, updateUserById } from "../../actions";
import { CartBorrow } from "@app/components";
import { MESSAGES } from "@app/constants";

interface MyBookShelfProps {
  user: User;
  list: BookType[];
}

export const MyBookShelf = memo(({ list, user }: MyBookShelfProps) => {
  const router = useRouter();

  const handleReturnBook = async (id: string) => {
    try {
      const { data: dataBookById } = await getBookById(id);
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
      if (error instanceof Error) {
        return error.message;
      }
      return MESSAGES.RESPONSE_ERROR;
    }
  };

  return (
    <Flex gap="40px" flexWrap="wrap" overflow="hidden scroll" h="85%">
      {list.map((item) => {
        const {
          id,
          title,
          author,
          publicationYear,
          rating,
          imageUrl,
          createdDate,
        } = item || {};

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
