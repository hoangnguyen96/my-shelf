import { Meta, StoryFn } from "@storybook/react";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "@app/themes";
import TableItem from ".";

const meta: Meta<typeof TableItem> = {
  component: TableItem,
  decorators: [
    (Story: StoryFn) => (
      <ChakraProvider theme={theme}>
        <Story />
      </ChakraProvider>
    ),
  ],
};

export default meta;

const Template: StoryFn<typeof TableItem> = (args) => <TableItem {...args} />;

export const Default = Template.bind({});
Default.args = { isContribute: true };
