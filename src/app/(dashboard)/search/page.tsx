import { auth } from "@app/auth";
import { SearchList } from "@app/features/dashboard/components";
import { getPaginatedBook, getUserById } from "@app/features/dashboard/actions";
import { Metadata } from "next";
import { BookType, User } from "@app/interface";

export const metadata: Metadata = {
  title: "Search",
  description:
    "My book shelf management is an online book reading application that helps users conveniently borrow books.",
};

const SearchPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const session = await auth();
  const type = Object.keys(searchParams)[0];
  const value = Object.values(searchParams)[0];
  const paramSearch = type && value ? `${type}=${value}&` : "";
  let user = null;
  let listBooks = [];

  try {
    const { data: userData } = await getUserById(session?.user?.id as string);
    const { data: bookData } = await getPaginatedBook(paramSearch);

    user = userData;
    listBooks = bookData;
  } catch (error) {
    user = {} as User;
    listBooks = [] as BookType[][];
  }

  const totalPages = listBooks.length;

  return <SearchList totalPages={totalPages} list={listBooks} user={user} />;
};

export default SearchPage;
