"use client";

import { memo } from "react";
import { useRouter } from "next/navigation";
import { Box, Text, useToast } from "@chakra-ui/react";
import { ROUTES } from "@app/constants";
import { BookType } from "@app/interface";
import { updateBookById } from "../../actions";
import { FormContribute } from "@app/components";

interface ContributeUpdateProps {
  book: BookType;
}

export const ContributeUpdate = memo(({ book }: ContributeUpdateProps) => {
  const router = useRouter();
  const toast = useToast();

  const handleUpdate = async (id: string, values: Partial<BookType>) => {
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

    await updateBookById(id, payload);
    toast({
      title: "Update book successful",
      description: "",
      status: "success",
      duration: 5000,
      isClosable: true,
    });

    return router.push(ROUTES.CONTRIBUTE_LIST);
  };

  return (
    <Box>
      <Text size="xl" color="dark.100" mb="34px">
        Preview Book Details
      </Text>
      <FormContribute itemUpdate={book} onUpdate={handleUpdate} />
    </Box>
  );
});
