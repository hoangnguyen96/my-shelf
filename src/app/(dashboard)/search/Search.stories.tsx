import { Meta, StoryFn } from "@storybook/react";
import { Box, ChakraProvider, Flex, Text } from "@chakra-ui/react";
import theme from "@app/themes";
import { RouterContext } from "next/dist/shared/lib/router-context.shared-runtime";
import { mockRouter, mockSession } from "@app/mocks/storybook";
import { SessionProvider } from "next-auth/react";
import { SearchList } from "@app/features/dashboard/components";
import { DATA_BOOKS, DATA_USER } from "@app/mocks/data";
import { MainLayout } from "@app/layouts";

const meta: Meta<typeof SearchList> = {
  component: SearchList,
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

const Template: StoryFn<typeof SearchList> = () => (
  <MainLayout>
    <Box p="70px 44px" height="70vh">
      <Flex gap="10%" alignItems="center">
        <Text size="xl" fontWeight={500} w="100%" maxW={345}>
          Title
        </Text>
        <Flex gap="20%" w="100%" maxW={300}>
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
      <SearchList totalPages={1} list={[DATA_BOOKS]} user={DATA_USER[0]} />
    </Box>
  </MainLayout>
);

export const Default = Template.bind({});
Default.args = {};
