import { Meta, StoryFn } from "@storybook/react";
import { Box, ChakraProvider, Flex, Text } from "@chakra-ui/react";
import theme from "@app/themes";
import { RouterContext } from "next/dist/shared/lib/router-context.shared-runtime";
import { mockRouter, mockSession } from "@app/mocks/storybook";
import { SessionProvider } from "next-auth/react";
import { Logo, Navbar } from "@app/components/common";
import { HeadingFavorites, TopContent } from "@app/components";
import { User } from "@app/models";
import MyBookShelfFavoritesPage from "./page";

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
  <Flex bgColor="white" borderRadius="10px" height="100%">
    <Flex flexDir="column" gap="100px" padding="38px 66px" alignItems="center">
      <Logo
        user={
          {
            isAdmin: true,
            email: "admin@gmail.com",
            id: "3733403",
            name: "admin",
            image: "https://i.ibb.co/RHMqQGr/man-1.png",
          } as unknown as User
        }
      />
      <Navbar />
    </Flex>
    <Box
      w="100%"
      h="100%"
      bgColor="backgroundContent"
      borderRightRadius="10px"
      pos="relative"
    >
      <TopContent />
      <Flex p="18px 44px" flexDir="column" height="80%">
        <Text size="xxl">
          Your{" "}
          <Text as="span" size="xxl" color="brand.70">
            Shelf
          </Text>
        </Text>
        <Flex flexDir="column" mt="37px" height="100%">
          <HeadingFavorites />
          <Box mt="34px" height="100%">
            <MyBookShelfFavoritesPage />
          </Box>
        </Flex>
      </Flex>
    </Box>
  </Flex>
);

export const Default = Template.bind({});
Default.args = {};
