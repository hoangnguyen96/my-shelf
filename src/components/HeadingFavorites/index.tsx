"use client";

import { ROUTES } from "@app/constants";
import { Flex } from "@chakra-ui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { memo } from "react";

const HeadingFavorites = () => {
  const pathname = usePathname();

  const textMyShelf = pathname === ROUTES.MY_BOOK_SHELF ? "underline" : "none";
  const textFavorite =
    pathname === ROUTES.MY_BOOK_SHELF_FAVORITES ? "underline" : "none";

  return (
    <Flex gap="50px">
      <Link href={ROUTES.MY_BOOK_SHELF} style={{ textDecoration: textMyShelf }}>
        All Books
      </Link>

      <Link
        href={ROUTES.MY_BOOK_SHELF_FAVORITES}
        style={{ textDecoration: textFavorite }}
      >
        Favorites
      </Link>
    </Flex>
  );
};

export default memo(HeadingFavorites);
