import { Meta, StoryFn } from "@storybook/react";
import { ChakraProvider } from "@chakra-ui/react";
import InputBase from ".";
import theme from "@app/themes";

const meta: Meta<typeof InputBase> = {
  component: InputBase,
  decorators: [
    (Story: StoryFn) => (
      <ChakraProvider theme={theme}>
        <Story />
      </ChakraProvider>
    ),
  ],
};

export default meta;

const Template: StoryFn<typeof InputBase> = (args) => <InputBase {...args} />;

export const Text = Template.bind({});
Text.args = {
  type: "text",
  width: 400,
  placeholder: "Text...",
};

export const Password = Template.bind({});
Password.args = {
  type: "text",
  width: 400,
  placeholder: "Password...",
  isTypePassword: true,
};
