import { auth } from "@app/auth";
import { getPaginatedBook, getUserById } from "@app/features/dashboard/actions";
import { SearchList } from "@app/features/dashboard/components";
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
  const { data: userById } = await getUserById(session?.user?.id as string);
  const { data: listBooks } = await getPaginatedBook(paramSearch);

  const totalPages = listBooks.length;

  return (
    <SearchList totalPages={totalPages} list={listBooks} user={userById} />
  );
};

export default SearchPage;
