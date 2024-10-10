import { auth } from "@app/auth";
import { getAllBook, getUserById } from "@app/features/dashboard/actions";
import { ContributeList } from "@app/features/dashboard/components";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contribute List",
  description:
    "My book shelf management is an online book reading application that helps users conveniently borrow books.",
};

const ContributeListPage = async () => {
  const session = await auth();
  const { data: user } = await getUserById(session?.user?.id as string);
  const { data: books } = await getAllBook();

  return <ContributeList list={books} user={user} />;
};

export default ContributeListPage;
