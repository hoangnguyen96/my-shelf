"use client";

import { memo } from "react";
import Image from "next/image";

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
    <Image
      src={image || "https://i.ibb.co/SKHPQYq/avatar-default.webp"}
      width={width}
      height={height}
      alt="Avatar user"
      style={{
        maxWidth: "100%",
        borderRadius: "50%",
        border: border,
        height: "100%",
      }}
      priority={true}
      fetchPriority="high"
      {...rest}
    />
  );
};

export default memo(Avatar);
