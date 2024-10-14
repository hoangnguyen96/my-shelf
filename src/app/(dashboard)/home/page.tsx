import { auth } from "@app/auth";
import { getBooksByLimit, getUserById } from "@app/features/dashboard/actions";
import { HomeList } from "@app/features/dashboard/components";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
  description:
    "My book shelf management is an online book reading application that helps users conveniently borrow books.",
};

const HomePage = async () => {
  const session = await auth();
  const { data: dataUserById } = await getUserById(session?.user?.id as string);
  const { data: books } = await getBooksByLimit();

  return <HomeList user={dataUserById} list={books} />;
};

export default HomePage;
