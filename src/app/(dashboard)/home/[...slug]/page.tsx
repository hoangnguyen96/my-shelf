import { auth } from "@app/auth";
import { BookType, User } from "@app/models";
import {
  getTwelveItemBook,
  getUserById,
} from "@app/features/dashboard/actions";
import { ListCart } from "@app/features/dashboard/components";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home Search Params",
  description:
    "My book shelf management is an online book reading application that helps users conveniently borrow books.",
};

const HomePage = async ({ params }: { params?: { slug: string[] } }) => {
  const type = params?.slug[0];
  const value = params?.slug[1];
  const searchParams = type && value ? `${type}=${value}&` : "";
  const session = await auth();
  const dataUserById = (await getUserById(session?.user?.id as string)) as User;
  const books = (await getTwelveItemBook(searchParams)) as BookType[];

  return <ListCart user={dataUserById} list={books} />;
};

export default HomePage;
