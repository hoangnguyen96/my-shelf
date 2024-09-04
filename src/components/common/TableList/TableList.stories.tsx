import { Meta, StoryFn } from "@storybook/react";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "@app/themes";
import TableList from ".";

const meta: Meta<typeof TableList> = {
  component: TableList,
  decorators: [
    (Story: StoryFn) => (
      <ChakraProvider theme={theme}>
        <Story />
      </ChakraProvider>
    ),
  ],
};

export default meta;

const Template: StoryFn<typeof TableList> = (args) => <TableList {...args} />;

export const Default = Template.bind({});
Default.args = { isContribute: true };
