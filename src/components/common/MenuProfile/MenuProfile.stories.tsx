import { Meta, StoryFn } from "@storybook/react";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "@app/themes";
import MenuProfile from ".";

const meta: Meta<typeof MenuProfile> = {
  component: MenuProfile,
  decorators: [
    (Story: StoryFn) => (
      <ChakraProvider theme={theme}>
        <Story />
      </ChakraProvider>
    ),
  ],
};

export default meta;

const Template: StoryFn<typeof MenuProfile> = (args) => (
  <MenuProfile
    user={{
      user: {
        id: "123",
        name: "John Doe",
        email: "johndoe@example.com",
        image: "https://example.com/johndoe.jpg",
        isAdmin: true,
      },
      expires: "2024-12-31T23:59:59.999Z",
    }}
    onRedirectFavorites={() => {}}
    onRedirectProfile={() => {}}
    onLogout={() => {}}
  />
);

export const Default = Template.bind({});
Default.args = {};
