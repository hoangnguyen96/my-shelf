"use client";

import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import Avatar from "../Avatar";
import { logout } from "@app/actions/auth";
import { useRouter } from "next/navigation";
import { ROUTES } from "@app/constants";
import Link from "next/link";
import { useSession } from "next-auth/react";

const MenuProfile = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const handleLogout = async () => {
    await logout();
    router.push(ROUTES.LOGIN);
  };

  return (
    <Menu>
      <MenuButton
        as={Button}
        rightIcon={<ChevronDownIcon color="dark.90" />}
        variant="outline"
        borderColor="borderDefault"
        bgColor="white"
        minW={205}
        h={50}
        borderRadius="33px"
        py="3px"
        pl="2px"
        pr="30px"
        boxShadow="0 0 4px -1px #a9a9a9"
      >
        <Flex justifyContent="flex-start" alignItems="center" gap={4}>
          <Avatar
            image={session?.user?.image || ""}
            width={45}
            height={45}
            border="2px solid white"
          />
          <Text size="xl" flex={1}>
            {session?.user?.name}
          </Text>
        </Flex>
      </MenuButton>
      <MenuList minW={205} borderRadius="10px" boxShadow="0 0 3px 0px #a9a9a9">
        <MenuItem>
          <Link href={ROUTES.PROFILE} style={{ width: "100%" }}>
            Profile
          </Link>
        </MenuItem>
        <MenuItem>
          <Link
            href={`${ROUTES.MY_BOOK_SHELF_FAVORITES}`}
            style={{ width: "100%" }}
          >
            Favorite
          </Link>
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <Text lineHeight="30px" w="100%">
            Logout
          </Text>
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default MenuProfile;
