"use client";

import { useSession } from "next-auth/react";
import { Flex } from "@chakra-ui/react";
import {
  getAllBook,
  getBookByParams,
  getUserById,
  updateUserById,
} from "@app/api-request";
import { BookType, User } from "@app/models";
import { LoadingIndicator, Pagination } from "@app/components/common";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  dividePaginationBooks,
  getDataByParams,
  getListDataByTypeAndValue,
} from "@app/utils";
import { TableItem } from "@app/components";

const SearchPage = ({ params }: { params: { slug: string[] } }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const [dataUserById, setDataUserById] = useState<User>();
  const [listData, setListData] = useState<BookType[]>([]);
  const [dataPagination, setDataPagination] = useState<BookType[][]>([]);
  const [pagination, setPagination] = useState<number>(0);
  const type = params.slug[0];
  const value = params.slug[1];

  const fetchData = async () => {
    try {
      const dataUserById = (await getUserById(
        session?.user?.id as string
      )) as User;
      const dataAllBook = await getAllBook();
      const dataBook = dividePaginationBooks(dataAllBook);

      let dataBookByParams: BookType[][] = [];
      if (type && value) {
        const dataParams = await getBookByParams(`${type}=${value}`);
        dataBookByParams = dividePaginationBooks(dataParams);
      }

      const listData: BookType[] = getListDataByTypeAndValue(
        type,
        value,
        dataBookByParams,
        dataBook,
        pagination
      );

      const dataPagination = getDataByParams(
        type,
        value,
        dataBookByParams,
        dataBook
      );

      setDataUserById(dataUserById);
      setDataPagination(dataPagination);
      setListData(listData);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [session?.user?.id, pagination, type, value]);

  const handleUpdateFavorites = async (id: string) => {
    try {
      let listFavorite = dataUserById?.favorites || [];
      if (dataUserById?.favorites?.includes(id)) {
        listFavorite = dataUserById.favorites.filter((item) => item !== id);
      } else {
        listFavorite = [...(dataUserById?.favorites as string[]), id];
      }

      await updateUserById(dataUserById?.id as string, {
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
        maxH="62vh"
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
        data={dataPagination}
        pagination={pagination}
        setPagination={setPagination}
      />
    </>
  );
};

export default SearchPage;
