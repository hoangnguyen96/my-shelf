"use client";

import { TopContent } from "@app/components";
import { ROUTES } from "@app/constants";
import { Box, Flex, Text } from "@chakra-ui/react";
import Link from "next/link";

const MyShelfLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <TopContent />
      <Flex p="18px 44px" flexDir="column">
        <Text size="xxl">
          Your{" "}
          <Text as="span" size="xxl" color="brand.70">
            Shelf
          </Text>
        </Text>
        <Flex flexDir="column" mt="37px">
          <Flex gap="50px">
            <Link href={ROUTES.MY_BOOK_SHELF}>All Books</Link>

            <Link href={ROUTES.MY_BOOK_SHELF_FAVORITES}>Favorites</Link>
          </Flex>

          <Box mt="34px">{children}</Box>
        </Flex>
      </Flex>
    </>
  );
};

export default MyShelfLayout;
