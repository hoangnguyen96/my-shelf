import { Meta, StoryFn } from "@storybook/react";
import { Box, ChakraProvider, Flex, Text } from "@chakra-ui/react";
import theme from "@app/themes";
import { RouterContext } from "next/dist/shared/lib/router-context.shared-runtime";
import { mockRouter, mockSession } from "@app/mocks/storybook";
import { SessionProvider } from "next-auth/react";
import MyBookShelfFavoritesPage from "./page";
import { MyBookShelfFavorites } from "@app/features/dashboard/components";
import { DATA_BOOKS, DATA_USER } from "@app/mocks/data";
import { MainLayout } from "@app/layouts";
import Link from "next/link";

const meta: Meta<typeof MyBookShelfFavoritesPage> = {
  component: MyBookShelfFavoritesPage,
  decorators: [
    (Story: StoryFn) => (
      <ChakraProvider theme={theme}>
        <RouterContext.Provider value={mockRouter}>
          <SessionProvider session={mockSession}>
            <Story />
          </SessionProvider>
        </RouterContext.Provider>
      </ChakraProvider>
    ),
  ],
};

export default meta;

const Template: StoryFn<typeof MyBookShelfFavoritesPage> = () => (
  <MainLayout>
    <Flex p="18px 44px" flexDir="column" height="80%">
      <Text size="xxl">
        Your{" "}
        <Text as="span" size="xxl" color="brand.70">
          Shelf
        </Text>
      </Text>
      <Flex flexDir="column" mt="37px" height="100%">
        <Flex gap="50px">
          <Link href="#" style={{ textDecoration: "none" }}>
            All Books
          </Link>

          <Link href="#" style={{ textDecoration: "underline" }}>
            Favorites
          </Link>
        </Flex>
        <Box mt="34px" height="100%">
          <MyBookShelfFavorites user={DATA_USER[0]} list={DATA_BOOKS} />
        </Box>
      </Flex>
    </Flex>
  </MainLayout>
);

export const Default = Template.bind({});
Default.args = {};
