import { auth } from "@app/auth";
import { BookType, User } from "@app/models";
import { getBookById, getUserById } from "@app/features/dashboard/actions";
import { PreviewBookDetails } from "@app/features/dashboard/components";
import { notFound } from "next/navigation";

interface PreviewBookProps {
  params: {
    id: string;
  };
}

const PreviewBook = async ({ params: { id } }: PreviewBookProps) => {
  const session = await auth();
  const user = (await getUserById(session?.user?.id as string)) as User;
  const book = (await getBookById(id)) as BookType;

  if (!book) return notFound();

  return <PreviewBookDetails book={book} user={user} />;
};

export default PreviewBook;
