"use client";

import { memo } from "react";
import Image from "next/image";
import { Flex, Text, useDisclosure } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { ROUTES } from "@app/constants";
import { deleteBook } from "@app/features/dashboard/actions";
import { Button } from "../common";
import HeartIcon from "../HeartIcon";
import StatusBook from "../StatusBook";
import dynamic from "next/dynamic";

const ModalDeleteBook = dynamic(() => import("../ModalDeleteBook"), {
  ssr: false,
});

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
        bgColor="var(--chakra-colors-chakra-body-bg)"
        borderRadius="10px"
        py="12px"
        pl="24px"
        pr="48px"
        minW="min-content"
        gap={{ base: "2%", xl: "5%", "2xl": "6%" }}
        alignItems="center"
      >
        <Flex
          alignItems="center"
          minW={{ base: 205, xl: 240, "2xl": 300 }}
          maxW={{ base: 205, xl: 240, "2xl": 300 }}
          gap={{ base: "20px", "2xl": "47px" }}
        >
          <Image
            src={imageUrl || ""}
            alt={title || "Table item book!"}
            width={75}
            height={100}
            priority={true}
            fetchPriority="high"
            style={{ borderRadius: "5px", minHeight: 100 }}
          />
          <Flex flexDir="column">
            <Text
              size="xl"
              mb="20px"
              textOverflow="ellipsis"
              style={{
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
              }}
              overflow="hidden"
              max-width={180}
              display="-webkit-box"
              word-wrap="break-word"
            >
              {title}
            </Text>
            <Flex mb="10px">
              <Text size="md">{author},</Text>
              <Text size="md">{publicationYear}</Text>
            </Flex>
            <Text size="xs">{edition} Edition</Text>
          </Flex>
        </Flex>
        <Flex
          alignItems="center"
          minW={{ base: 230, "2xl": 300 }}
          maxW={{ base: 230, "2xl": 300 }}
          gap={{ base: "10px", xl: "20px", "2xl": "60px" }}
        >
          <Text size="xl" minW="71px">
            {rating}
            <Text as="span" size="md">
              /5
            </Text>
          </Text>
          <Flex flexDir="column" gap="11px" flex={1}>
            <Text size="xl">{category}</Text>
            <Text size="md">UX Design</Text>
          </Flex>
        </Flex>
        {!isContribute && (
          <Flex w="96px">
            <StatusBook status={status} />
          </Flex>
        )}
        <Flex
          gap={{
            base: "20px",
            "2xl": isContribute ? "36px" : "64px",
          }}
          alignItems="center"
          maxW={220}
          w={{ base: "unset", "2xl": "100%" }}
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
