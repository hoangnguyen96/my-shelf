import { Meta, StoryFn } from "@storybook/react";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "@app/themes";
import Logo from ".";

const meta: Meta<typeof Logo> = {
  component: Logo,
  decorators: [
    (Story: StoryFn) => (
      <ChakraProvider theme={theme}>
        <Story />
      </ChakraProvider>
    ),
  ],
};

export default meta;

const Template: StoryFn<typeof Logo> = () => <Logo />;

export const Default = Template.bind({});
Default.args = {};
