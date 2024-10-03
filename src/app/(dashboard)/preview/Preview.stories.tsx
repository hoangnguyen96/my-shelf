import { Meta, StoryFn } from "@storybook/react";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "@app/themes";
import { RouterContext } from "next/dist/shared/lib/router-context.shared-runtime";
import { mockRouter, mockSession } from "@app/mocks/storybook";
import { SessionProvider } from "next-auth/react";
import { PreviewBookDetails } from "@app/features/dashboard/components";
import { DATA_BOOKS, DATA_USER } from "@app/mocks/data";
import { MainLayout } from "@app/layouts";

const meta: Meta<typeof PreviewBookDetails> = {
  component: PreviewBookDetails,
  decorators: [
    (Story: StoryFn) => (
      <ChakraProvider theme={theme}>
        <RouterContext.Provider value={mockRouter}>
          <SessionProvider session={mockSession}>
            <Story />
          </SessionProvider>
        </RouterContext.Provider>
      </ChakraProvider>
    ),
  ],
};

export default meta;

const Template: StoryFn<typeof PreviewBookDetails> = () => (
  <MainLayout>
    <PreviewBookDetails book={DATA_BOOKS[0]} user={DATA_USER[0]} />
  </MainLayout>
);

export const Default = Template.bind({});
Default.args = {};
