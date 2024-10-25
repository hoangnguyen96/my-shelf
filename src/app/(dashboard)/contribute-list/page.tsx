import { auth } from "@app/auth";
import { getAllBook, getUserById } from "@app/features/dashboard/actions";
import { ContributeList } from "@app/features/dashboard/components";
import { BookType, User } from "@app/interface";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contribute List",
  description:
    "My book shelf management is an online book reading application that helps users conveniently borrow books.",
};

const ContributeListPage = async () => {
  const session = await auth();
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

  return <ContributeList list={books} user={user} />;
};

export default ContributeListPage;
