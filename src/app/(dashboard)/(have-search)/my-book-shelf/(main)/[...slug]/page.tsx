"use client";

import {
  getAllBook,
  getBookById,
  getUserById,
  updateBookById,
  updateUserById,
} from "@app/api";
import { CartBorrow } from "@app/components/common";
import { TYPE_SEARCH } from "@app/constants";
import { BookType, User } from "@app/models";
import { Flex } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const MyBookShelfByParams = ({ params }: { params: { slug: string[] } }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const [dataByShelf, setDataByShelf] = useState<BookType[]>([]);
  const [dataUserById, setDataUserById] = useState<User>();
  const type = params.slug[0];
  const value = params.slug[1];

  const fetchData = async () => {
    try {
      const user = (await getUserById(session?.user?.id || "")) as User;
      const allBooks = await getAllBook();
      const shelfBooks = user?.shelfBooks || [];
      const booksOnShelf = allBooks.filter((item) =>
        shelfBooks.includes(item.id)
      );

      const filteredBooks = booksOnShelf.filter((item) =>
        type === TYPE_SEARCH.TITLE && value
          ? item.title.toLowerCase().includes(value.toLowerCase())
          : type === TYPE_SEARCH.AUTHOR && value
            ? item.author.toLowerCase().includes(value.toLowerCase())
            : item
      );

      setDataUserById(user);
      setDataByShelf(filteredBooks);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [session?.user?.id, type, value]);

  const handleReturnBook = async (id: string) => {
    if (!dataUserById) return;

    const dataBookById = await getBookById(parseInt(id));
    const updateShelfBook = dataUserById.shelfBooks.filter(
      (item: string) => item !== id
    );

    await updateUserById(dataUserById.id, {
      ...dataUserById,
      shelfBooks: updateShelfBook,
    });

    await updateBookById(id, {
      ...dataBookById,
      status: false,
    });
    return router.refresh();
  };

  return (
    <Flex gap="40px" flexWrap="wrap" overflow="hidden scroll" maxH="65vh">
      {dataByShelf.map((item) => {
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
};

export default MyBookShelfByParams;
