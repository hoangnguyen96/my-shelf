import { memo } from "react";
import Link from "next/link";
import { LogoMain } from "@app/assets/icons";
import { ROUTES } from "@app/constants";
import { User } from "@app/interface";

interface LogoProps {
  user: Partial<User>;
}

const Logo = ({ user }: LogoProps) => {
  const url = Object.keys(user || {}).length > 0 ? ROUTES.HOME : ROUTES.LOGIN;

  return (
    <Link href={url} aria-label="logo-book-shelf">
      <LogoMain />
    </Link>
  );
};

export default memo(Logo);
