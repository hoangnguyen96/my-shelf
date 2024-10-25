import { auth } from "@app/auth";
import { getPaginatedBook, getUserById } from "@app/features/dashboard/actions";
import { SearchList } from "@app/features/dashboard/components";
import { BookType, User } from "@app/interface";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Search By Params",
  description:
    "My book shelf management is an online book reading application that helps users conveniently borrow books.",
};

interface SearchPageProps {
  params: { slug: string[] };
}

const SearchPage = async ({ params }: SearchPageProps) => {
  const session = await auth();
  const type = params.slug[0];
  const value = params.slug[1];
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
