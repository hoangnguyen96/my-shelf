"use client";

import { useCallback, useMemo } from "react";
import { IconButton, StyleProps } from "@chakra-ui/react";
import { HeartIconFull, HeartIconOutline } from "@app/assets/icons";
import { getUserById, updateUserById } from "@app/api";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { User } from "@app/models";

interface IconHeartProps extends StyleProps {
  id: string;
  isFavorite?: boolean;
}

const IconHeart = ({ id, isFavorite = false, ...rest }: IconHeartProps) => {
  const { data: session } = useSession();
  const router = useRouter();

  const handleClick = async () => {
    const dataUserById = (await getUserById(session?.user?.id || "")) as User;

    let listFavorite = dataUserById.favorites;
    if (dataUserById.favorites.includes(id)) {
      listFavorite = dataUserById.favorites.filter((item) => item !== id);
    } else {
      listFavorite = [...dataUserById.favorites, id];
    }

    updateUserById(dataUserById.id, {
      ...dataUserById,
      favorites: listFavorite,
    });
    return router.refresh();
  };

  const iconHeart = useCallback(
    () => (isFavorite ? <HeartIconFull /> : <HeartIconOutline />),
    [isFavorite]
  );

  const colorHeart = useMemo(
    () => (isFavorite ? "red.500" : "gray.500"),
    [isFavorite]
  );

  return (
    <IconButton
      aria-label="Heart icon"
      icon={iconHeart()}
      onClick={handleClick}
      variant="unstyled"
      fontSize="xl"
      color={colorHeart}
      minW={30}
      minH={30}
      {...rest}
    />
  );
};

export default IconHeart;
