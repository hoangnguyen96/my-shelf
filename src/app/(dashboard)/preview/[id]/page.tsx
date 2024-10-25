import { auth } from "@app/auth";
import { getBookById, getUserById } from "@app/features/dashboard/actions";
import { PreviewBookDetails } from "@app/features/dashboard/components";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { User } from "@app/interface";

export const generateMetadata = async ({
  params: { id },
}: PreviewBookProps): Promise<Metadata> => {
  const { data: book } = await getBookById(id);

  if (!book) {
    return {
      title: "Book Not Found",
      description: "The requested book does not exist or was removed.",
    };
  }

  return {
    title: `${book.title}`,
    description: `Preview and learn more about "${book.title}", written by ${book.author}. This book is available in the My Book Shelf application.`,
  };
};

interface PreviewBookProps {
  params: {
    id: string;
  };
}

const PreviewBook = async ({ params: { id } }: PreviewBookProps) => {
  const session = await auth();
  const { data: book } = await getBookById(id);
  let user = null;

  try {
    const { data: userData } = await getUserById(session?.user?.id as string);
    user = userData;
  } catch (error) {
    user = {} as User;
  }

  if (Object.keys(book || {}).length === 0) return notFound();

  return <PreviewBookDetails book={book} user={user} />;
};

export default PreviewBook;
