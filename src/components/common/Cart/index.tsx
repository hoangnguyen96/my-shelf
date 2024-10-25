import { memo } from "react";
import { Flex, Text } from "@chakra-ui/react";
import Image from "next/image";
import { ROUTES } from "@app/constants";
import Link from "next/link";
import HeartIcon from "../../HeartIcon";

interface CartType {
  id: string;
  title: string;
  author: string;
  imageUrl: string;
  isFavorite: boolean;
  publicationYear: number;
  rating: number;
  isContribute?: boolean;
  onUpdateFavorites?: () => void;
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
  onUpdateFavorites,
}: CartType) => (
  <Flex
    w={160}
    flexDirection="column"
    gap="5px"
    h="auto"
    px="15px"
    pt="15px"
    pb="13px"
    bgColor="var(--chakra-colors-chakra-body-bg)"
    borderRadius="10px"
    boxShadow="0 0 3px 0px #a9a9a9"
    position="relative"
  >
    <Link href={`${ROUTES.PREVIEW}/${id}`}>
      <Image
        src={imageUrl || "https://i.ibb.co/Lt7GmF2/place-holder.webp"}
        alt="Don't make me think"
        width={130}
        height={172}
        priority={true}
        fetchPriority="high"
        style={{ borderRadius: "5px", minHeight: 172, maxHeight: 172 }}
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
          data-testid="update-favorite-cart"
          right="10px"
          bottom="5px"
          id={id}
          isFavorite={isFavorite}
          onUpdateFavorites={onUpdateFavorites}
        />
      </>
    )}
  </Flex>
);

export default memo(Cart);
