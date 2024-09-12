import { Meta, StoryFn } from "@storybook/react";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "@app/themes";
import CartBorrow from ".";
import { RouterContext } from "next/dist/shared/lib/router-context.shared-runtime";
import { mockRouter } from "@app/__mocks__/storybook";

const meta: Meta<typeof CartBorrow> = {
  component: CartBorrow,
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

const Template: StoryFn<typeof CartBorrow> = () => (
  <CartBorrow
    title={"Don’t Make Me think"}
    author={"Steve Krug, "}
    publicationYear={1900}
    rating={4.5}
    imgUrl="https://i.ibb.co/2Kn2kW2/book1.webp"
    createDate={"11 Mar 2023 09:00 AM"}
    id={""}
    onReturnBook={() => {}}
  />
);

export const Default = Template.bind({});
Default.args = {};
