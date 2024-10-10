import { auth } from "@app/auth";
import { filterBooksOnShelf } from "@app/utils";
import { getAllBook, getUserById } from "@app/features/dashboard/actions";
import { MyBookShelf } from "@app/features/dashboard/components";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "MyBookShelf",
  description:
    "My book shelf management is an online book reading application that helps users conveniently borrow books.",
};

const MyBookShelfPage = async () => {
  const session = await auth();
  const { data: user } = await getUserById(session?.user?.id as string);
  const { data: allBooks } = await getAllBook();
  const shelfBooks = user?.shelfBooks || [];
  const booksOnShelf = filterBooksOnShelf(allBooks, shelfBooks);

  return <MyBookShelf list={booksOnShelf} user={user} />;
};

export default MyBookShelfPage;
