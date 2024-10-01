import { auth } from "@app/auth";
import { BookType, User } from "@app/models";
import { getAllBook, getUserById } from "@app/features/dashboard/actions";
import { ContributeList } from "@app/features/dashboard/components";

const ContributeListPage = async () => {
  const session = await auth();
  const user = (await getUserById(session?.user?.id as string)) as User;
  const books = (await getAllBook()) as BookType[];

  return <ContributeList list={books} user={user} />;
};

export default ContributeListPage;
