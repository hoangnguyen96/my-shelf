import { Meta, StoryFn } from "@storybook/react";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "@app/themes";
import MenuProfile from ".";

const meta: Meta<typeof MenuProfile> = {
  component: MenuProfile,
  decorators: [
    (Story: StoryFn) => (
      <ChakraProvider theme={theme}>
        <Story />
      </ChakraProvider>
    ),
  ],
};

export default meta;

const Template: StoryFn<typeof MenuProfile> = (args) => <MenuProfile />;

export const Default = Template.bind({});
Default.args = {};
