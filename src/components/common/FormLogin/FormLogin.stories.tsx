import { Meta, StoryFn } from "@storybook/react";
import { Box, ChakraProvider } from "@chakra-ui/react";
import theme from "@app/themes";
import FormLogin from ".";
import HeadingForm from "../HeadingForm";
import FooterForm from "../FooterForm";

const meta: Meta<typeof FormLogin> = {
  component: FormLogin,
  decorators: [
    (Story: StoryFn) => (
      <ChakraProvider theme={theme}>
        <Story />
      </ChakraProvider>
    ),
  ],
};

export default meta;

const Template: StoryFn<typeof FormLogin> = () => (
  <Box
    w="100%"
    maxW={565}
    pt="63px"
    px="70px"
    bgColor="white"
    borderRadius="10px"
    boxShadow="0 0 5px 1px rgb(0 0 0 / 25%)"
  >
    <HeadingForm
      title="Welcome Back !"
      description="Sign in to continue to yourDigital Library"
    />
    <FormLogin
      onSubmit={async () => {
        return Promise.resolve();
      }}
    />
    <FooterForm text="New User?" textLink="Register Here" pb="160px" link="/" />
  </Box>
);
export const Default = Template.bind({});
Default.args = {};
