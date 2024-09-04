"use client";

import { Grid } from "@chakra-ui/react";
import { BookType, User } from "@app/models";
import { Cart, Pagination } from "@app/components/common";
import { getAllBook, getBookByParams, getUserById } from "@app/api";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { dividePaginationBooks } from "@app/utils";
import { TopContent } from "@app/components";
import { useSearchParams } from "next/navigation";

const HomePage = async () => {
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const type = searchParams.get("type");
  const value = searchParams.get("query");
  const [pagination, setPagination] = useState<number>(0);

  const dataAllBook = await getAllBook();
  const dataUserById = (await getUserById(session?.user?.id || "")) as User;
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

  return (
    <>
      <TopContent />
      <Grid p="70px 44px" gridTemplateColumns="repeat(6, 1fr)" gap="40px 10px">
        {listData.map((item: BookType) => {
          const { id, title, author, imageUrl, publicationYear, rating } = item;

          return (
            <Cart
              id={id}
              title={title}
              author={author}
              imageUrl={imageUrl}
              publicationYear={publicationYear}
              rating={rating}
              isFavorite={dataUserById.favorites.includes(id) || false}
            />
          );
        })}
      </Grid>
      <Pagination
        data={dataPagination}
        pagination={pagination}
        setPagination={setPagination}
      />
    </>
  );
};

export default HomePage;
