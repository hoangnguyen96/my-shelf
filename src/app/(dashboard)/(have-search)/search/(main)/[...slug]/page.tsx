"use client";

import { useSession } from "next-auth/react";
import { Flex } from "@chakra-ui/react";
import {
  getAllBook,
  getBookByParams,
  getUserById,
  updateUserById,
} from "@app/api";
import { BookType, User } from "@app/models";
import {
  LoadingIndicator,
  Pagination,
  TableList,
} from "@app/components/common";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { dividePaginationBooks } from "@app/utils";

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
      const dataUserById = (await getUserById(session?.user?.id || "")) as User;
      const dataAllBook = await getAllBook();
      const dataBook = dividePaginationBooks(dataAllBook);

      let dataBookByParams: BookType[][] = [];
      if (type && value) {
        const dataParams = await getBookByParams(`${type}=${value}`);
        dataBookByParams = dividePaginationBooks(dataParams);
      }
      const listData: BookType[] =
        type && value
          ? dataBookByParams[pagination] || []
          : dataBook[pagination] || [];
      const dataPagination = type && value ? dataBookByParams : dataBook;

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
    if (!dataUserById) return;

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

  if (!dataUserById) {
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
            <TableList
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
              idFavorite={dataUserById?.favorites?.includes(id) || false}
              onUpdateFavorites={handleUpdateFavorites}
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
