"use client";

import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { logout } from "@app/actions/auth";
import { ROUTES } from "@app/constants";
import { MenuProfile } from "@app/components/common";

const AccountMenu = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const handleLogout = async () => {
    await logout();
    router.push(ROUTES.LOGIN);
  };

  const handleRedirectProfile = () => router.push(ROUTES.PROFILE);

  const handleRedirectFavorites = () =>
    router.push(ROUTES.MY_BOOK_SHELF_FAVORITES);

  return (
    <MenuProfile
      user={session as Session}
      onRedirectFavorites={handleRedirectFavorites}
      onRedirectProfile={handleRedirectProfile}
      onLogout={handleLogout}
    />
  );
};

export default AccountMenu;
