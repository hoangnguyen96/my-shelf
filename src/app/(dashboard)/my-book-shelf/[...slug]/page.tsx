import { auth } from "@app/auth";
import { getAllBook, getUserById } from "@app/features/dashboard/actions";
import { filterBooksOnShelf, filterBooksOnShelfByParams } from "@app/utils";
import { MyBookShelf } from "@app/features/dashboard/components";
import { Metadata } from "next";

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
  const { data: user } = await getUserById(session?.user?.id as string);
  const { data: allBooks } = await getAllBook();
  const shelfBooks = user?.shelfBooks || [];
  const booksOnShelf = filterBooksOnShelf(allBooks, shelfBooks);
  const filteredBooks = filterBooksOnShelfByParams(booksOnShelf, type, value);

  return <MyBookShelf list={filteredBooks} user={user} />;
};

export default MyBookShelfByParamsPage;
