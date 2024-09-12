"use client";

import Image from "next/image";
import { avatar } from "@app/assets/images";
import { memo } from "react";

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
      src={image || avatar}
      width={width}
      height={height}
      alt="Avatar user"
      style={{
        maxWidth: "100%",
        maxHeight: "100%",
        borderRadius: "50%",
        border: border,
      }}
      priority
      {...rest}
    />
  );
};

export default memo(Avatar);
