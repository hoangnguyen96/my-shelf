import { Meta, StoryFn } from "@storybook/react";
import { Box, ChakraProvider } from "@chakra-ui/react";
import theme from "@app/themes";
import Navbar from ".";
import { SessionProvider } from "next-auth/react";
import { mockSession } from "@app/mocks/storybook";

const meta: Meta<typeof Navbar> = {
  component: Navbar,
  decorators: [
    (Story: StoryFn) => (
      <ChakraProvider theme={theme}>
        <SessionProvider session={mockSession}>
          <Story />
        </SessionProvider>
      </ChakraProvider>
    ),
  ],
};

export default meta;

const Template: StoryFn<typeof Navbar> = () => (
  <Box w={400}>
    <Navbar />
  </Box>
);

export const Default = Template.bind({});
Default.args = {};
