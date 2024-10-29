"use client";

import { memo } from "react";
import { useRouter } from "next/navigation";
import { Box, Text, useToast } from "@chakra-ui/react";
import { ROUTES } from "@app/constants";
import { BookType } from "@app/interface";
import { updateBookById } from "../../actions";
import { FormContribute } from "@app/components";
import isEqual from "react-fast-compare";

interface EditContributionProps {
  book: BookType;
}

const EditContributionComponent = ({ book }: EditContributionProps) => {
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
      <Text size="xl" color="var(--chakra-colors-chakra-body-text)" mb="34px">
        Preview Book Details
      </Text>
      <FormContribute itemUpdate={book} onUpdate={handleUpdate} />
    </Box>
  );
};

const areEqual = (
  prevProps: EditContributionProps,
  nextProps: EditContributionProps
) => {
  return isEqual(prevProps, nextProps);
};

export const EditContribution = memo(EditContributionComponent, areEqual);
