import { getAllBook, getUserById } from "@app/api";
import { Cart, LoadingIndicator } from "@app/components/common";
import { BookType, User } from "@app/models";
import { getThreeTopBook } from "@app/utils";
import { Flex } from "@chakra-ui/react";
import { auth } from "@app/auth";

const List = async () => {
  const session = await auth();
  const dataUserById = (await getUserById(session?.user?.id || "")) as User;
  const dataBooks = await getAllBook();
  const dataTop = getThreeTopBook(dataBooks);

  if (!dataTop || !dataUserById) {
    return <LoadingIndicator />;
  }

  return (
    <Flex gap="39px" justifyContent="space-between">
      {dataTop.map((item: BookType) => {
        const { id, title, author, imageUrl, publicationYear, rating } = item;

        return (
          <Cart
            key={id}
            id={id}
            title={title}
            author={author}
            imageUrl={imageUrl}
            publicationYear={publicationYear}
            rating={rating}
            isFavorite={dataUserById?.favorites?.includes(id) || false}
            isContribute={true}
          />
        );
      })}
    </Flex>
  );
};

export default List;
