import { Meta, StoryFn } from "@storybook/react";
import { Box, ChakraProvider, Flex } from "@chakra-ui/react";
import theme from "@app/themes";
import { RouterContext } from "next/dist/shared/lib/router-context.shared-runtime";
import { mockRouter, mockSession } from "@app/mocks/storybook";
import { SessionProvider } from "next-auth/react";
import { Logo, Navbar } from "@app/components/common";
import { MenuProfile } from "@app/components";
import { User } from "@app/models";
import { ProfileUpdate } from "@app/features/dashboard/components";
import { DATA_USER } from "@app/mocks/data";
import { MainLayout } from "@app/layouts";

const meta: Meta<typeof ProfileUpdate> = {
  component: ProfileUpdate,
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

const Template: StoryFn<typeof ProfileUpdate> = () => (
  <MainLayout isNotSearch={true} isProfile={true}>
    <ProfileUpdate
      imageUrl="https://i.ibb.co/RHMqQGr/man-1.png"
      user={DATA_USER[0]}
    />
  </MainLayout>
);

export const Default = Template.bind({});
Default.args = {};
