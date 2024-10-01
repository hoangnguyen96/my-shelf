import { auth } from "@app/auth";
import { BookType, User } from "@app/models";
import { SearchList } from "@app/features/dashboard/components";
import { getPaginatedBook, getUserById } from "@app/features/dashboard/actions";

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
