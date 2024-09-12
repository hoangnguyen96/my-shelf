"use client";

import { memo, useCallback, useMemo } from "react";
import { IconButton, StyleProps } from "@chakra-ui/react";
import { HeartIconFull, HeartIconOutline } from "@app/assets/icons";

interface IconHeartProps extends StyleProps {
  id: string;
  isFavorite: boolean;
  onUpdateFavorites?: () => void;
}

const IconHeart = ({
  id,
  isFavorite,
  onUpdateFavorites,
  ...rest
}: IconHeartProps) => {
  const iconHeart = useCallback(
    () => (isFavorite ? <HeartIconFull /> : <HeartIconOutline />),
    [isFavorite, onUpdateFavorites]
  );

  const colorHeart = useMemo(
    () => (isFavorite ? "red.500" : "gray.500"),
    [isFavorite, onUpdateFavorites]
  );

  return (
    <IconButton
      aria-label="Heart icon"
      icon={iconHeart()}
      onClick={onUpdateFavorites}
      variant="unstyled"
      fontSize="xl"
      color={colorHeart}
      minW={30}
      minH={30}
      {...rest}
    />
  );
};

export default memo(IconHeart);
