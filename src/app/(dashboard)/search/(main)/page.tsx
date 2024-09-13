"use client";

import { useSession } from "next-auth/react";
import { Flex } from "@chakra-ui/react";
import { getAllBook, getUserById, updateUserById } from "@app/api-request";
import { BookType, User } from "@app/models";
import { LoadingIndicator, Pagination } from "@app/components/common";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { dividePaginationBooks } from "@app/utils";
import { TableItem } from "@app/components";

const SearchPage = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [listData, setListData] = useState<BookType[]>([]);
  const [dataBook, setDataBook] = useState<BookType[][]>([]);
  const [dataUserById, setDataUserById] = useState<User>();
  const [pagination, setPagination] = useState<number>(0);

  const fetchData = async () => {
    try {
      const user = (await getUserById(session?.user?.id || "")) as User;
      const allBooks = await getAllBook();
      const paginatedBooks = dividePaginationBooks(allBooks);
      setDataUserById(user);
      setDataBook(paginatedBooks);
      setListData(paginatedBooks[pagination] || []);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [session?.user?.id, pagination]);

  const handleUpdateFavorites = async (id: string) => {
    if (!dataUserById) return;

    try {
      let listFavorite = dataUserById?.favorites || [];
      if (dataUserById?.favorites.includes(id)) {
        listFavorite = dataUserById.favorites.filter((item) => item !== id);
      } else {
        listFavorite = [...dataUserById.favorites, id];
      }

      await updateUserById(dataUserById.id, {
        ...dataUserById,
        favorites: listFavorite,
      });

      return router.refresh();
    } catch (error) {
      console.error("Failed to update favorite book:", error);
    }
  };

  if (!listData || !dataUserById) {
    return <LoadingIndicator />;
  }

  return (
    <>
      <Flex
        flexDir="column"
        gap="23px"
        mt="23px"
        justifyContent="space-between"
        overflowY="scroll"
        maxH="75%"
      >
        {listData.map((itemBook: BookType) => {
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
            <TableItem
              key={id}
              id={id}
              title={title}
              author={author}
              imageUrl={imageUrl}
              category={category}
              status={dataUserById?.shelfBooks?.includes(id)}
              publicationYear={publicationYear}
              rating={rating}
              edition={edition}
              isFavorite={dataUserById?.favorites?.includes(id) || false}
              onUpdateFavorites={() => handleUpdateFavorites(id)}
            />
          );
        })}
      </Flex>
      <Pagination
        data={dataBook}
        pagination={pagination}
        setPagination={setPagination}
      />
    </>
  );
};

export default SearchPage;
