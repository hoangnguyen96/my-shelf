import { Meta, StoryFn } from "@storybook/react";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "@app/themes";
import Logo from ".";
import { SessionProvider } from "next-auth/react";
import { RouterContext } from "next/dist/shared/lib/router-context.shared-runtime";
import { mockRouter, mockSession } from "@app/__mocks__/storybook";

const meta: Meta<typeof Logo> = {
  component: Logo,
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

const Template: StoryFn<typeof Logo> = () => <Logo />;

export const Default = Template.bind({});
Default.args = {};
