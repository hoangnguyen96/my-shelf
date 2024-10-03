import { Meta, StoryFn } from "@storybook/react";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "@app/themes";
import { RouterContext } from "next/dist/shared/lib/router-context.shared-runtime";
import { mockRouter, mockSession } from "@app/mocks/storybook";
import { SessionProvider } from "next-auth/react";
import { DATA_BOOKS, DATA_USER } from "@app/mocks/data";
import { ContributeList } from "@app/features/dashboard/components";
import { MainLayout } from "@app/layouts";

const meta: Meta<typeof ContributeList> = {
  component: ContributeList,
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

const Template: StoryFn<typeof ContributeList> = () => (
  <MainLayout isNotSearch={true}>
    <ContributeList user={DATA_USER[0]} list={DATA_BOOKS} />
  </MainLayout>
);

export const Default = Template.bind({});
Default.args = {};
