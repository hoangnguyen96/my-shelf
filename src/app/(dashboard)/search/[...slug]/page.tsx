import { auth } from "@app/auth";
import { BookType, User } from "@app/models";
import { getPaginatedBook, getUserById } from "@app/features/dashboard/actions";
import { SearchList } from "@app/features/dashboard/components";

interface SearchPageProps {
  params: { slug: string[] };
}

const SearchPage = async ({ params }: SearchPageProps) => {
  const session = await auth();
  const type = params.slug[0];
  const value = params.slug[1];
  const paramSearch = type && value ? `${type}=${value}&` : "";
  const userById = (await getUserById(session?.user?.id as string)) as User;
  const listBooks = (await getPaginatedBook(paramSearch)) as BookType[][];

  const totalPages = listBooks.length;

  return (
    <SearchList totalPages={totalPages} list={listBooks} user={userById} />
  );
};

export default SearchPage;
