import { Flex, Text } from "@chakra-ui/react";
import Image from "next/image";
import { HeartIcon } from "..";
import { ROUTES } from "@app/constants";
import Link from "next/link";

interface CartType {
  id: string;
  title: string;
  author: string;
  imageUrl: string;
  isFavorite: boolean;
  publicationYear: number;
  rating: number;
  isContribute?: boolean;
}

const Cart = ({
  id,
  title,
  author,
  imageUrl,
  isFavorite,
  publicationYear,
  rating,
  isContribute = false,
}: CartType) => {
  return (
    <Flex
      w={160}
      flexDirection="column"
      gap="5px"
      h="auto"
      px="15px"
      pt="15px"
      pb="13px"
      bgColor="white"
      borderRadius="10px"
      boxShadow="0 0 3px 0px #a9a9a9"
      position="relative"
    >
      <Link key={id} href={`${ROUTES.PREVIEW}/${id}`}>
        <Image
          src={imageUrl}
          alt="Don't make me think"
          width={130}
          height={172}
        />
      </Link>
      <Text size="sm">{title}</Text>
      <Flex>
        <Text size="xs">{author},</Text>
        <Text size="xs">{publicationYear}</Text>
      </Flex>

      {!isContribute && (
        <>
          <Flex>
            <Text size="xs">{rating}/</Text>
            <Text size="xs" color="dark.70">
              5
            </Text>
          </Flex>
          <HeartIcon
            position="absolute"
            right="10px"
            bottom="5px"
            id={id}
            isFavorite={isFavorite}
          />
        </>
      )}
    </Flex>
  );
};

export default Cart;
