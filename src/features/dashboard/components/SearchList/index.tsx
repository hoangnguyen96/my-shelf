"use client";

import { memo, useState } from "react";
import { Flex } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { BookType, User } from "@app/interface";
import { updateUserById } from "../../actions";
import { Pagination } from "@app/components/common";
import { TableItem } from "@app/components";
import { MESSAGES } from "@app/constants";
import isEqual from "react-fast-compare";

interface SearchListProps {
  user: User;
  totalPages: number;
  list: BookType[][];
}

const SearchListComponent = ({ totalPages, list, user }: SearchListProps) => {
  const [pagination, setPagination] = useState<number>(0);
  const router = useRouter();

  const listPagination = list[pagination] || [];

  const handleUpdateFavorites = async (id: string) => {
    try {
      let listFavorite = user?.favorites;
      if (user?.favorites.includes(id)) {
        listFavorite = user.favorites.filter((item) => item !== id);
      } else {
        listFavorite = [...(user?.favorites as string[]), id];
      }

      await updateUserById(user?.id as string, {
        ...user,
        favorites: listFavorite,
      });

      return router.refresh();
    } catch (error) {
      if (error instanceof Error) {
        return error.message;
      }
      return MESSAGES.RESPONSE_ERROR;
    }
  };

  return (
    <>
      <Flex flexDir="column" gap="23px" justifyContent="space-between">
        {listPagination.map((itemBook: BookType) => {
          const {
            id,
            title,
            author,
            imageUrl,
            publicationYear,
            rating,
            edition,
            category,
          } = itemBook || {};

          return (
            <TableItem
              key={id}
              id={id}
              title={title}
              author={author}
              imageUrl={imageUrl}
              category={category}
              status={user?.shelfBooks?.includes(id)}
              publicationYear={publicationYear}
              rating={rating}
              edition={edition}
              isFavorite={user?.favorites?.includes(id)}
              onUpdateFavorites={() => handleUpdateFavorites(id)}
            />
          );
        })}
      </Flex>
      <Pagination
        pagination={pagination}
        totalPages={totalPages}
        setPagination={setPagination}
      />
    </>
  );
};

const areEqual = (prevProps: SearchListProps, nextProps: SearchListProps) => {
  return (
    isEqual(prevProps.user, nextProps.user) &&
    isEqual(prevProps.list, nextProps.list)
  );
};

export const SearchList = memo(SearchListComponent, areEqual);
