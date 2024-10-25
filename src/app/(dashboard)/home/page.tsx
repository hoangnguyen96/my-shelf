import { auth } from "@app/auth";
import { getBooksByLimit, getUserById } from "@app/features/dashboard/actions";
import { HomeList } from "@app/features/dashboard/components";
import { BookType, User } from "@app/interface";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
  description:
    "My book shelf management is an online book reading application that helps users conveniently borrow books.",
};

const HomePage = async () => {
  const session = await auth();
  let user = null;
  let books = [];

  try {
    const { data: userData } = await getUserById(session?.user?.id as string);
    const { data: booksData } = await getBooksByLimit();

    user = userData;
    books = booksData;
  } catch (error) {
    user = {} as User;
    books = [] as BookType[];
  }

  return <HomeList user={user} list={books} />;
};

export default HomePage;
