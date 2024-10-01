import { auth } from "@app/auth";
import { ListContribute } from "@app/components";
import { getTopThreeBook, getUserById } from "../actions";
import { BookType, User } from "@app/models";

export const ListTopContribute = async () => {
  const session = await auth();
  const dataUserById = (await getUserById(session?.user?.id as string)) as User;
  const dataBooks = (await getTopThreeBook()) as BookType[];

  return <ListContribute list={dataBooks} user={dataUserById} />;
};
