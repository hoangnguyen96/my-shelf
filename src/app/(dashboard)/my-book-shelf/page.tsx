import { auth } from "@app/auth";
import { BookType, User } from "@app/models";
import { filterBooksOnShelf } from "@app/utils";
import { getAllBook, getUserById } from "@app/features/dashboard/actions";
import { MyBookShelf } from "@app/features/dashboard/components";

const MyBookShelfPage = async () => {
  const session = await auth();
  const user = (await getUserById(session?.user?.id as string)) as User;
  const allBooks = (await getAllBook()) as BookType[];
  const shelfBooks = user?.shelfBooks || [];
  const booksOnShelf = filterBooksOnShelf(allBooks, shelfBooks) as BookType[];

  return <MyBookShelf list={booksOnShelf} user={user} />;
};

export default MyBookShelfPage;
