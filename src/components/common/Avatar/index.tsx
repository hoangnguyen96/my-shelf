import Image from "next/image";
import { avatar } from "@app/assets/images";

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
      src={image}
      width={width}
      height={height}
      alt="Avatar user"
      style={{
        maxWidth: "100%",
        maxHeight: "100%",
        borderRadius: "50%",
        border: border,
      }}
      {...rest}
    />
  );
};

export default Avatar;
