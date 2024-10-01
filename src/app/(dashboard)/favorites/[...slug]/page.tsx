import { auth } from "@app/auth";
import { BookType, User } from "@app/models";
import { filterBooksFavorite, filterBooksFavoriteByParams } from "@app/utils";
import { getAllBook, getUserById } from "@app/features/dashboard/actions";
import { MyBookShelfFavorites } from "@app/features/dashboard/components";

const MyBookShelfFavoritesPage = async ({
  params,
}: {
  params: { slug: string[] };
}) => {
  const session = await auth();
  const type = params.slug[0];
  const value = params.slug[1];
  const user = (await getUserById(session?.user?.id as string)) as User;
  const books = (await getAllBook()) as BookType[];
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
