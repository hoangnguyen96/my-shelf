import { auth } from "@app/auth";
import { filterBooksFavorite } from "@app/utils";
import { getAllBook, getUserById } from "@app/features/dashboard/actions";
import { MyBookShelfFavorites } from "@app/features/dashboard/components";
import { Metadata } from "next";
import { BookType, User } from "@app/interface";

export const metadata: Metadata = {
  title: "Favorites",
  description:
    "My book shelf management is an online book reading application that helps users conveniently borrow books.",
};

const MyBookShelfFavoritesPage = async () => {
  const session = await auth();
  let user = null;
  let books = [];

  try {
    const { data: userData } = await getUserById(session?.user?.id as string);
    const { data: booksData } = await getAllBook();

    user = userData;
    books = booksData;
  } catch (error) {
    user = {} as User;
    books = [] as BookType[];
  }

  const favorites = user?.favorites || [];
  const booksByFavorites = filterBooksFavorite(books, favorites);

  return <MyBookShelfFavorites list={booksByFavorites} user={user} />;
};

export default MyBookShelfFavoritesPage;
