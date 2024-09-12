import { Meta, StoryFn } from "@storybook/react";
import { ChakraProvider } from "@chakra-ui/react";
import Cart from ".";
import theme from "@app/themes";

const meta: Meta<typeof Cart> = {
  component: Cart,
  decorators: [
    (Story: StoryFn) => (
      <ChakraProvider theme={theme}>
        <Story />
      </ChakraProvider>
    ),
  ],
};

export default meta;

const Template: StoryFn<typeof Cart> = () => (
  <Cart
    title="Don't Make Me Think"
    author="Steve Krug"
    imageUrl="https://i.ibb.co/QbQgVtG/book1.png"
    publicationYear={2000}
    rating={4.5}
    isFavorite={true}
    id="1"
    onUpdateFavorites={() => {}}
  />
);

export const Default = Template.bind({});
Default.args = {};
