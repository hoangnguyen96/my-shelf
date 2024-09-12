"use client";

import { addBook } from "@app/api-request";
import { FormContribute } from "@app/components";
import { ROUTES } from "@app/constants";
import { BookType } from "@app/models";
import { Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const ContributePage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleSubmit = async (values: Partial<BookType>) => {
    setIsLoading(true);
    const {
      title,
      author,
      category,
      imageUrl,
      description,
      status,
      publicationYear,
      rating,
      createdDate,
      edition,
    } = values;

    const payload: Partial<BookType> = {
      title,
      author,
      category,
      imageUrl,
      description,
      status,
      publicationYear,
      rating,
      createdDate,
      edition,
    };

    try {
      await addBook(payload);
      setIsLoading(false);
      return router.push(ROUTES.CONTRIBUTE_COMPLETE);
    } catch (error) {
      throw new Error("Failed to add books!");
    }
  };

  return (
    <>
      <Text size="xl" color="dark.100" mb="34px">
        Fill up Book Details
      </Text>
      <FormContribute isLoading={isLoading} onSubmit={handleSubmit} />
    </>
  );
};

export default ContributePage;
