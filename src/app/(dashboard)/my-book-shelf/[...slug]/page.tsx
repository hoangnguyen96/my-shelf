import { auth } from "@app/auth";
import { getAllBook, getUserById } from "@app/features/dashboard/actions";
import { filterBooksOnShelf, filterBooksOnShelfByParams } from "@app/utils";
import { MyBookShelf } from "@app/features/dashboard/components";
import { Metadata } from "next";
import { BookType, User } from "@app/interface";

export const metadata: Metadata = {
  title: "MyBookShelf Search Params",
  description:
    "My book shelf management is an online book reading application that helps users conveniently borrow books.",
};

const MyBookShelfByParamsPage = async ({
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

  const shelfBooks = user?.shelfBooks || [];
  const booksOnShelf = filterBooksOnShelf(books, shelfBooks);
  const filteredBooks = filterBooksOnShelfByParams(booksOnShelf, type, value);

  return <MyBookShelf list={filteredBooks} user={user} />;
};

export default MyBookShelfByParamsPage;
