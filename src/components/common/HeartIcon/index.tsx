"use client";

import { useCallback, useMemo } from "react";
import { IconButton, StyleProps } from "@chakra-ui/react";
import { HeartIconFull, HeartIconOutline } from "@app/assets/icons";

interface IconHeartProps extends StyleProps {
  id: string;
  isFavorite?: boolean;
  onUpdateFavorites?: (id: string) => void;
}

const IconHeart = ({
  id,
  isFavorite = false,
  onUpdateFavorites,
  ...rest
}: IconHeartProps) => {
  const handleClick = () => {
    onUpdateFavorites?.(id);
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
