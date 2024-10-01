"use client";

import { memo } from "react";
import Image from "next/image";
import { Flex, Text, useDisclosure } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { ROUTES } from "@app/constants";
import { deleteBook } from "@app/features/dashboard/actions";
import ModalDeleteBook from "../ModalDeleteBook";
import { Button } from "../common";
import HeartIcon from "../HeartIcon";
import StatusBook from "../StatusBook";

interface TableItemProps {
  id: string;
  title: string;
  author: string;
  imageUrl: string;
  category: string;
  edition: string;
  publicationYear: number;
  rating: number;
  isFavorite?: boolean;
  status?: boolean;
  isContribute?: boolean;
  onUpdateFavorites?: () => void;
}

const TableItem = ({
  id,
  title,
  author,
  imageUrl,
  edition,
  category,
  isFavorite = false,
  publicationYear,
  rating,
  status = false,
  isContribute = false,
  onUpdateFavorites,
}: TableItemProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();

  const handleRedirectPreview = () => {
    router.push(`${isContribute ? ROUTES.CONTRIBUTE : ROUTES.PREVIEW}/${id}`);
  };

  const handleDeleteBook = () => {
    return onOpen();
  };

  const confirmDeleteBook = async () => {
    await deleteBook(id);
    onClose();
    return router.refresh();
  };

  return (
    <>
      <Flex
        bgColor="white"
        borderRadius="10px"
        boxShadow="0 0 5px 0px rgb(0 0 0 / 10%)"
        py="12px"
        px="24px"
        gap="90px"
        alignItems="center"
      >
        <Flex gap="47px" alignItems="center" maxW={329} w="100%">
          <Image
            src={imageUrl || ""}
            alt="Don't make me think"
            width={75}
            height={100}
            priority
          />
          <Flex flexDir="column">
            <Text size="xl" mb="20px">
              {title}
            </Text>
            <Flex mb="10px">
              <Text size="md">{author},</Text>
              <Text size="md">{publicationYear}</Text>
            </Flex>
            <Text size="xs">{edition} Edition</Text>
          </Flex>
        </Flex>
        <Flex gap="72px" alignItems="center" maxW={312} w="100%">
          <Text size="xl" w="60px">
            {rating}
            <Text as="span" size="md" color="dark.70">
              /5
            </Text>
          </Text>
          <Flex flexDir="column" gap="11px">
            <Text size="xl">{category}</Text>
            <Text size="md">UX Design</Text>
          </Flex>
        </Flex>
        {!isContribute && <StatusBook status={status} />}
        <Flex
          gap={isContribute ? "36px" : "64px"}
          alignItems="center"
          maxW={179}
          w="100%"
        >
          {!isContribute && (
            <HeartIcon
              id={id}
              data-testid="handle-favorite"
              isFavorite={isFavorite}
              onUpdateFavorites={onUpdateFavorites}
            />
          )}
          <Button
            data-testid="redirect-preview"
            size="sm"
            variant="outline"
            text="Preview"
            onClick={handleRedirectPreview}
          />
          {isContribute && (
            <Button
              data-testid="delete-book"
              size="sm"
              variant="outline"
              text="Delete"
              onClick={handleDeleteBook}
            />
          )}
        </Flex>
      </Flex>
      <ModalDeleteBook
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={confirmDeleteBook}
      />
    </>
  );
};

export default memo(TableItem);
