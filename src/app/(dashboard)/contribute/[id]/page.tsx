import { getBookById } from "@app/features/dashboard/actions";
import { ContributeUpdate } from "@app/features/dashboard/components";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contribute Update",
  description:
    "My book shelf management is an online book reading application that helps users conveniently borrow books.",
};

const ContributeUpdatePage = async ({ params }: { params: { id: string } }) => {
  const { data: book } = await getBookById(params.id);

  return <ContributeUpdate book={book} />;
};

export default ContributeUpdatePage;
