"use client";

import { Navbar } from "@app/components/common";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";

const NavbarBase = () => {
  const { data: session } = useSession();

  return <Navbar user={session as Session} />;
};

export default NavbarBase;
