import { BookType } from "@app/models";
import { getBookById } from "@app/features/dashboard/actions";
import { ContributeUpdate } from "@app/features/dashboard/components";

const ContributeUpdatePage = async ({ params }: { params: { id: string } }) => {
  const book = (await getBookById(params.id)) as BookType;

  return <ContributeUpdate book={book} />;
};

export default ContributeUpdatePage;
