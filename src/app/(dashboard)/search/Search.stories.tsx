import { Meta, StoryFn } from "@storybook/react";
import { Box, ChakraProvider, Flex, Text } from "@chakra-ui/react";
import theme from "@app/themes";
import { RouterContext } from "next/dist/shared/lib/router-context.shared-runtime";
import { mockRouter, mockSession } from "@app/mocks/storybook";
import { SessionProvider } from "next-auth/react";
import { Logo, Navbar } from "@app/components/common";
import { TopContent } from "@app/components";
import SearchPage from "./(main)/page";

const meta: Meta<typeof SearchPage> = {
  component: SearchPage,
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

const Template: StoryFn<typeof SearchPage> = () => (
  <Flex bgColor="white" borderRadius="10px" height="100%">
    <Flex flexDir="column" gap="100px" padding="38px 66px" alignItems="center">
      <Logo />
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
      <Box p="70px 44px" height="70vh">
        <Flex gap="90px" alignItems="center">
          <Text size="xl" fontWeight={500} w="100%" maxW={352}>
            Title
          </Text>
          <Flex gap="60px" w="100%" maxW={312}>
            <Text size="xl" fontWeight={500}>
              Ratings
            </Text>
            <Text size="xl" fontWeight={500}>
              Category
            </Text>
          </Flex>
          <Text size="xl" fontWeight={500}>
            Status
          </Text>
        </Flex>
        <SearchPage />
      </Box>
    </Box>
  </Flex>
);

export const Default = Template.bind({});
Default.args = {};
