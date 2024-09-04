import { Meta, StoryFn } from "@storybook/react";
import { ChakraProvider } from "@chakra-ui/react";
import ButtonBase from ".";
import theme from "@app/themes";

const meta: Meta<typeof ButtonBase> = {
  component: ButtonBase,
  decorators: [
    (Story: StoryFn) => (
      <ChakraProvider theme={theme}>
        <Story />
      </ChakraProvider>
    ),
  ],
};

export default meta;

const Template: StoryFn<typeof ButtonBase> = (args) => <ButtonBase {...args} />;

export const Normal = Template.bind({});
Normal.args = {
  variant: "normal",
  size: "lg",
};

export const Full = Template.bind({});
Full.args = {
  size: "lg",
  variant: "full",
};

export const OutlineSmall = Template.bind({});
OutlineSmall.args = {
  size: "sm",
  variant: "outline",
};

export const OutlineMedium = Template.bind({});
OutlineMedium.args = {
  size: "md",
  variant: "outline",
};
