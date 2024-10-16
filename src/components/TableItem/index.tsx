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
        bgColor="white"
        borderRadius="10px"
        boxShadow="0 0 5px 0px rgb(0 0 0 / 10%)"
        py="12px"
        pl="24px"
        pr="48px"
        minW="min-content"
        gap={{ base: "2%", xl: "5%", "2xl": "6%" }}
        alignItems="center"
      >
        <Flex
          alignItems="center"
          minW={{ base: 220, "2xl": 310 }}
          maxW={{ base: "27%", "2xl": "23%" }}
          w="100%"
          gap={{ base: "20px", "2xl": "47px" }}
        >
          <Image
            src={imageUrl || ""}
            alt={title || "Table item book!"}
            width={75}
            height={100}
            priority={true}
            fetchPriority="high"
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
        <Flex
          gap={{ base: "10px", xl: "20px", "2xl": "60px" }}
          alignItems="center"
          minW={{ base: 205, xl: "22%", "2xl": 225 }}
          maxW={{ base: "18%" }}
          w="100%"
        >
          <Text size="xl" minW="48px">
            {rating}
            <Text as="span" size="md" color="colorDescription">
              /5
            </Text>
          </Text>
          <Flex flexDir="column" gap="11px" flex={1}>
            <Text size="xl">{category}</Text>
            <Text size="md">UX Design</Text>
          </Flex>
        </Flex>
        {!isContribute && (
          <Flex maxW={{ base: 100, "2xl": 200 }} w="100%">
            <StatusBook status={status} />
          </Flex>
        )}
        <Flex
          gap={{
            base: "20px",
            "2xl": isContribute ? "36px" : "64px",
          }}
          alignItems="center"
          minW={140}
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
