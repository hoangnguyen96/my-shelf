"use client";

import { Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { ROUTES } from "@app/constants";
import { BookType } from "@app/interface";
import { addBook } from "../../actions";
import { FormContribute } from "@app/components";

export const Contribute = () => {
  const router = useRouter();

  const handleSubmit = async (values: Partial<BookType>) => {
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
    } = values || {};

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
      return router.push(ROUTES.CONTRIBUTE_COMPLETE);
    } catch (error) {
      throw new Error("Failed to add books!");
    }
  };

  return (
    <>
      <Text size="xl" color="var(--chakra-colors-chakra-body-text)" mb="34px">
        Fill up Book Details
      </Text>
      <FormContribute onSubmit={handleSubmit} />
    </>
  );
};
