import type { Meta, StoryFn, StoryObj } from "@storybook/react";
import Avatar from ".";
import { RouterContext } from "next/dist/shared/lib/router-context.shared-runtime";
import { mockRouter } from "@app/mocks/storybook";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "@app/themes";

const meta: Meta<typeof Avatar> = {
  component: Avatar,
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
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
type Story = StoryObj<typeof Avatar>;

export const Default: Story = {
  args: {
    image: "https://i.ibb.co/SKHPQYq/avatar-default.webp",
  },
};
