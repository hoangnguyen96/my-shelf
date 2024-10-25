import { memo } from "react";
import { Flex } from "@chakra-ui/react";
import { BookType, User } from "@app/interface";
import { Cart } from "@app/components/common";

interface ListContributeProps {
  user: User;
  list: BookType[];
}

const ListContribute = ({ user, list }: ListContributeProps) => (
  <Flex
    flexDir="row"
    gap="40px"
    maxW="100%"
    justifyContent={{ base: "flex-start", "2xl": "space-between" }}
  >
    {list.map((item: BookType) => {
      const { id, title, author, imageUrl, publicationYear, rating } =
        item || {};

      return (
        <Cart
          key={id}
          id={id}
          title={title}
          author={author}
          imageUrl={imageUrl}
          publicationYear={publicationYear}
          rating={rating}
          isFavorite={user?.favorites?.includes(id)}
          isContribute={true}
        />
      );
    })}
  </Flex>
);

export default memo(ListContribute);
