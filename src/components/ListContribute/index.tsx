"use client";

import { getAllBook, getUserById } from "@app/api-request";
import { Cart, LoadingIndicator } from "@app/components/common";
import { BookType, User } from "@app/models";
import { getThreeTopBook } from "@app/utils";
import { Flex } from "@chakra-ui/react";
import { memo, useEffect, useState } from "react";
import { useSession } from "next-auth/react";

const ListContribute = () => {
  const [dataTop, setDataTop] = useState<BookType[] | null>(null);
  const [dataUserById, setDataUserById] = useState<User | null>(null);

  const { data: session } = useSession();

  const fetchData = async () => {
    try {
      const dataUserById = (await getUserById(session?.user?.id as string)) as User;
      const dataBooks = await getAllBook();
      const dataTop = getThreeTopBook(dataBooks);

      setDataUserById(dataUserById);
      setDataTop(dataTop);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!dataTop || !dataUserById) {
    return <LoadingIndicator />;
  }

  return (
    <Flex gap="39px" justifyContent="space-between">
      {dataTop.map((item: BookType) => {
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
            isContribute={true}
          />
        );
      })}
    </Flex>
  );
};

export default memo(ListContribute);
