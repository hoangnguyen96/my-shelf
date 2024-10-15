import { Meta, StoryFn } from "@storybook/react";
import { Box, ChakraProvider } from "@chakra-ui/react";
import theme from "@app/themes";
import CartBorrow from ".";
import { RouterContext } from "next/dist/shared/lib/router-context.shared-runtime";
import { mockRouter, mockSession } from "@app/mocks/storybook";
import { SessionProvider } from "next-auth/react";

const meta: Meta<typeof CartBorrow> = {
  component: CartBorrow,
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

const Template: StoryFn<typeof CartBorrow> = () => (
  <CartBorrow
    title={"Don’t Make Me think"}
    author={"Steve Krug, "}
    publicationYear={1900}
    rating={4.5}
    imgUrl="https://i.ibb.co/2Kn2kW2/book1.webp"
    createDate={"2024-10-15T08:32:57.347Z"}
    id={""}
    onReturnBook={() => {}}
  />
);

export const Default = Template.bind({});
Default.args = {};
