import { auth } from "@app/auth";
import { BookType, User } from "@app/models";
import { SearchList } from "@app/features/dashboard/components";
import { getPaginatedBook, getUserById } from "@app/features/dashboard/actions";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Search",
  description:
    "My book shelf management is an online book reading application that helps users conveniently borrow books.",
};

const SearchPage = async () => {
  const session = await auth();
  const userById = (await getUserById(session?.user?.id as string)) as User;
  const listBooks = (await getPaginatedBook()) as BookType[][];

  const totalPages = listBooks.length;

  return (
    <SearchList totalPages={totalPages} list={listBooks} user={userById} />
  );
};

export default SearchPage;
