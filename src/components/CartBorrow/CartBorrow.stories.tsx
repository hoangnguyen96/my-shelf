import { Meta, StoryFn } from "@storybook/react";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "@app/themes";
import CartBorrow from ".";
import { book1 } from "@app/assets/images";

const meta: Meta<typeof CartBorrow> = {
  component: CartBorrow,
  decorators: [
    (Story: StoryFn) => (
      <ChakraProvider theme={theme}>
        <Story />
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
    imgUrl={`${book1}`}
    createDate={"11 Mar 2023 09:00 AM"}
    id={""}
    onReturnBook={() => {}}
  />
);

export const Default = Template.bind({});
Default.args = {};
