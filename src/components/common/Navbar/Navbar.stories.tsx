import { Meta, StoryFn } from "@storybook/react";
import { Box, ChakraProvider } from "@chakra-ui/react";
import theme from "@app/themes";
import Navbar from ".";
import { SessionProvider } from "next-auth/react";

const mockSession = {
  expires: "2024-12-31T23:59:59.999Z",
  user: {
    name: "John Doe",
    email: "john.doe@example.com",
  },
};

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
