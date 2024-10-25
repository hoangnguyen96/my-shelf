import { auth } from "@app/auth";
import { getBooksByLimit, getUserById } from "@app/features/dashboard/actions";
import { HomeList } from "@app/features/dashboard/components";
import { BookType, User } from "@app/interface";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home Search Params",
  description:
    "My book shelf management is an online book reading application that helps users conveniently borrow books.",
};

const HomePage = async ({ params }: { params?: { slug: string[] } }) => {
  const session = await auth();
  const type = params?.slug[0];
  const value = params?.slug[1];
  let user = null;
  let books = [];

  const searchParams = type && value ? `${type}=${value}&` : "";

  try {
    const { data: userData } = await getUserById(session?.user?.id as string);
    const { data: booksData } = await getBooksByLimit(searchParams);

    user = userData;
    books = booksData;
  } catch (error) {
    user = {} as User;
    books = [] as BookType[];
  }

  return <HomeList user={user} list={books} />;
};

export default HomePage;
