import { auth } from "@app/auth";
import { filterBooksOnShelf } from "@app/utils";
import { getAllBook, getUserById } from "@app/features/dashboard/actions";
import { MyBookShelf } from "@app/features/dashboard/components";
import { Metadata } from "next";
import { BookType, User } from "@app/interface";

export const metadata: Metadata = {
  title: "MyBookShelf",
  description:
    "My book shelf management is an online book reading application that helps users conveniently borrow books.",
};

const MyBookShelfPage = async () => {
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

  const shelfBooks = user?.shelfBooks || [];
  const booksOnShelf = filterBooksOnShelf(books, shelfBooks);

  return <MyBookShelf list={booksOnShelf} user={user} />;
};

export default MyBookShelfPage;
