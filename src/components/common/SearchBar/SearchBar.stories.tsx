import { Meta, StoryFn } from "@storybook/react";
import { ChakraProvider } from "@chakra-ui/react";
import SearchBar from ".";
import theme from "@app/themes";
import { RouterContext } from "next/dist/shared/lib/router-context.shared-runtime";
import { mockRouter } from "@app/__mocks__/storybook";

const meta: Meta<typeof SearchBar> = {
  component: SearchBar,
  decorators: [
    (Story: StoryFn) => (
      <ChakraProvider theme={theme}>
        <RouterContext.Provider value={mockRouter}>
          <Story />
        </RouterContext.Provider>
      </ChakraProvider>
    ),
  ],
};

export default meta;

const Template: StoryFn<typeof SearchBar> = (args) => <SearchBar {...args} />;

export const Default = Template.bind({});
Default.args = {
  placeholder: "Search...",
};
