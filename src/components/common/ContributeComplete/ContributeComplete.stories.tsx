import { Meta, StoryFn } from "@storybook/react";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "@app/themes";
import ContributeComplete from ".";

const meta: Meta<typeof ContributeComplete> = {
  component: ContributeComplete,
  decorators: [
    (Story: StoryFn) => (
      <ChakraProvider theme={theme}>
        <Story />
      </ChakraProvider>
    ),
  ],
};

export default meta;

const Template: StoryFn<typeof ContributeComplete> = (args) => (
  <ContributeComplete />
);

export const Default = Template.bind({});
Default.args = {};
