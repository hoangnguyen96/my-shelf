import { auth } from "@app/auth";
import { filterBooksFavorite, filterBooksFavoriteByParams } from "@app/utils";
import { getAllBook, getUserById } from "@app/features/dashboard/actions";
import { MyBookShelfFavorites } from "@app/features/dashboard/components";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Favorites Search Params",
  description:
    "My book shelf management is an online book reading application that helps users conveniently borrow books.",
};

const MyBookShelfFavoritesPage = async ({
  params,
}: {
  params: { slug: string[] };
}) => {
  const session = await auth();
  const type = params.slug[0];
  const value = params.slug[1];
  const { data: user } = await getUserById(session?.user?.id as string);
  const { data: books } = await getAllBook();
  const favorites = user?.favorites || [];
  const booksByFavorites = filterBooksFavorite(books, favorites);
  const filteredBooks = filterBooksFavoriteByParams(
    booksByFavorites,
    type,
    value
  );

  return <MyBookShelfFavorites list={filteredBooks} user={user} />;
};

export default MyBookShelfFavoritesPage;
