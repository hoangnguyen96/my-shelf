"use client";

import { memo } from "react";
import Image from "next/image";
import { Box } from "@chakra-ui/react";

interface AvatarProps {
  image: string;
  width?: number;
  height?: number;
  border?: string;
}

const Avatar = ({
  image,
  width = 100,
  height = 100,
  border = "none",
  ...rest
}: AvatarProps) => {
  return (
    <Box
      position="relative"
      width={`${width}px`}
      height={`${height}px`}
      borderRadius="50%"
      overflow="hidden"
      border={border}
    >
      <Image
        src={image || "https://i.ibb.co/SKHPQYq/avatar-default.webp"}
        layout="fill"
        objectFit="cover"
        alt="Avatar user"
        fetchPriority="high"
        loading="lazy"
        {...rest}
      />
    </Box>
  );
};

export default memo(Avatar);
