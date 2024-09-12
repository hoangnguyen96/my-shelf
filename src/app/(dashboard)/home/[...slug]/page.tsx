"use client";

import { Grid } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { BookType, User } from "@app/models";
import { Cart, LoadingIndicator } from "@app/components/common";
import {
  getAllBook,
  getBookByParams,
  getUserById,
  updateUserById,
} from "@app/api-request";
import { useSession } from "next-auth/react";
import { getTwelveItemData } from "@app/utils";
import { useRouter } from "next/navigation";

const HomePage = ({ params }: { params?: { slug: string[] } }) => {
  const { data: session } = useSession();
  const [listData, setListData] = useState<BookType[]>([]);
  const [dataUserById, setDataUserById] = useState<User>();
  const router = useRouter();
  const type = params?.slug[0];
  const value = params?.slug[1];

  const fetchData = async () => {
    try {
      const dataAllBook = await getAllBook();
      const userData = (await getUserById(session?.user?.id || "")) as User;
      const dataBook = getTwelveItemData(dataAllBook);

      let dataBookByParams: BookType[] = [];
      if (type && value) {
        const dataParams = await getBookByParams(`${type}=${value}`);
        dataBookByParams = getTwelveItemData(dataParams);
      }

      const listData: BookType[] =
        type && value ? dataBookByParams || [] : dataBook || [];

      setListData(listData);
      setDataUserById(userData);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [session?.user?.id, type, value]);

  const handleUpdateFavorites = async (id: string) => {
    if (!dataUserById) return;

    try {
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
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  if (!listData || !dataUserById) {
    return <LoadingIndicator />;
  }

  return (
    <Grid p="70px 44px" gridTemplateColumns="repeat(6, 1fr)" gap="40px 10px">
      {listData.map((item: BookType) => {
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
            onUpdateFavorites={() => handleUpdateFavorites(id)}
          />
        );
      })}
    </Grid>
  );
};

export default HomePage;
