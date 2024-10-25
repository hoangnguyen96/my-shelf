import { auth } from "@app/auth";
import { filterBooksFavorite, filterBooksFavoriteByParams } from "@app/utils";
import { getAllBook, getUserById } from "@app/features/dashboard/actions";
import { MyBookShelfFavorites } from "@app/features/dashboard/components";
import { Metadata } from "next";
import { BookType, User } from "@app/interface";

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
  const filteredBooks = filterBooksFavoriteByParams(
    booksByFavorites,
    type,
    value
  );

  return <MyBookShelfFavorites list={filteredBooks} user={user} />;
};

export default MyBookShelfFavoritesPage;
