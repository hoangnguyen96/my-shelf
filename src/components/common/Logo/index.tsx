"use client";

import { memo } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { LogoMain } from "@app/assets/icons";
import { ROUTES } from "@app/constants";

const Logo = () => {
  const { data: session } = useSession();

  const url = session ? ROUTES.HOME : ROUTES.LOGIN;

  return (
    <Link href={url}>
      <LogoMain />
    </Link>
  );
};

export default memo(Logo);
