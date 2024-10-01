import { Meta, StoryFn } from "@storybook/react";
import { Box, ChakraProvider, Flex } from "@chakra-ui/react";
import theme from "@app/themes";
import { RouterContext } from "next/dist/shared/lib/router-context.shared-runtime";
import { mockRouter, mockSession } from "@app/mocks/storybook";
import { SessionProvider } from "next-auth/react";
import { Logo, Navbar } from "@app/components/common";
import { MenuProfile, TopContent } from "@app/components";
import ProfilePage from "./page";
import { User } from "@app/models";

const meta: Meta<typeof ProfilePage> = {
  component: ProfilePage,
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

const Template: StoryFn<typeof ProfilePage> = () => (
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
      <Flex alignItems="center" justifyContent="flex-end" p="32px 48px">
        <MenuProfile />
      </Flex>
      <ProfilePage />
    </Box>
  </Flex>
);

export const Default = Template.bind({});
Default.args = {};
