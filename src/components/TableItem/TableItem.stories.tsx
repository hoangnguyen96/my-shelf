import { Meta, StoryFn } from "@storybook/react";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "@app/themes";
import TableItem from ".";
import { RouterContext } from "next/dist/shared/lib/router-context.shared-runtime";
import { mockRouter, mockSession } from "@app/__mocks__/storybook";
import { SessionProvider } from "next-auth/react";

const meta: Meta<typeof TableItem> = {
  component: TableItem,
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

const Template: StoryFn<typeof TableItem> = (args) => <TableItem {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: "Test",
  author: "Test",
  category: "Test",
  edition: "First",
  publicationYear: 2000,
  rating: 4.5,
  status: true,
  onUpdateFavorites: () => {},
  isContribute: false,
  isFavorite: true,
};
