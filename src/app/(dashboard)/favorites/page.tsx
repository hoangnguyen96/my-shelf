import { auth } from "@app/auth";
import { filterBooksFavorite } from "@app/utils";
import { getAllBook, getUserById } from "@app/features/dashboard/actions";
import { MyBookShelfFavorites } from "@app/features/dashboard/components";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Favorites",
  description:
    "My book shelf management is an online book reading application that helps users conveniently borrow books.",
};

const MyBookShelfFavoritesPage = async () => {
  const session = await auth();
  const { data: user } = await getUserById(session?.user?.id as string);
  const { data: books } = await getAllBook();
  const favorites = user?.favorites || [];
  const booksByFavorites = filterBooksFavorite(books, favorites);

  return <MyBookShelfFavorites list={booksByFavorites} user={user} />;
};

export default MyBookShelfFavoritesPage;
