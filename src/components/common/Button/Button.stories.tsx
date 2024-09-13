import { Meta, StoryFn } from "@storybook/react";
import { ChakraProvider } from "@chakra-ui/react";
import ButtonBase from ".";
import theme from "@app/themes";
import { RouterContext } from "next/dist/shared/lib/router-context.shared-runtime";
import { mockRouter } from "@app/__mocks__/storybook";

const meta: Meta<typeof ButtonBase> = {
  component: ButtonBase,
  decorators: [
    (Story: StoryFn) => (
      <ChakraProvider theme={theme}>
        <RouterContext.Provider value={mockRouter}>
          <Story />
        </RouterContext.Provider>
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

export const Small = Template.bind({});
Small.args = {
  size: "sm",
  variant: "outline",
};

export const Medium = Template.bind({});
Medium.args = {
  size: "md",
  variant: "outline",
};
