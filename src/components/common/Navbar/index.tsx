"use client";

import { useSession } from "next-auth/react";
import { Flex, Text } from "@chakra-ui/react";
import Link from "next/link";

// Constants
import { NAVBAR_STEP, ROUTES } from "@app/constants";

// Icons
import {
  BookshelfIcon,
  GiftIcon,
  HomeIcon,
  SearchIcon,
} from "@app/assets/icons";

const Navbar = () => {
  const { data: session } = useSession();
  const listNavbar = [
    {
      title: NAVBAR_STEP.HOME,
      link: ROUTES.HOME,
      icon: () => <HomeIcon />,
    },
    {
      title: NAVBAR_STEP.SEARCH,
      link: ROUTES.SEARCH,
      icon: () => <SearchIcon />,
    },
    {
      title: NAVBAR_STEP.MY_SHELF,
      link: ROUTES.MY_BOOK_SHELF,
      icon: () => <BookshelfIcon />,
    },
    {
      ...(session?.user?.isAdmin && {
        title: NAVBAR_STEP.CONTRIBUTE,
        link: ROUTES.CONTRIBUTE,
        icon: () => <GiftIcon />,
      }),
    },
  ];

  return (
    <Flex flexDir="column" gap="34px">
      {listNavbar.map((item) => {
        const { title, link = "", icon } = item;

        return (
          <Link key={title} href={link}>
            <Flex gap="12px">
              {icon && icon()}
              <Text size="xl">{title}</Text>
            </Flex>
          </Link>
        );
      })}
    </Flex>
  );
};

export default Navbar;
