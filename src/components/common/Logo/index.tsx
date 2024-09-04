"use client";

import Link from "next/link";
import { LogoMain } from "@app/assets/icons";

const Logo = () => {
  return (
    <Link href="/">
      <LogoMain />
    </Link>
  );
};

export default Logo;
