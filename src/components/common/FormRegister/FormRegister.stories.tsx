import { Meta, StoryFn } from "@storybook/react";
import { Box, ChakraProvider } from "@chakra-ui/react";

// Theme
import theme from "@app/themes";

// Components
import FormRegister from ".";
import HeadingForm from "../HeadingForm";
import FooterForm from "../FooterForm";

const meta: Meta<typeof FormRegister> = {
  component: FormRegister,
  decorators: [
    (Story: StoryFn) => (
      <ChakraProvider theme={theme}>
        <Story />
      </ChakraProvider>
    ),
  ],
};

export default meta;

const Template: StoryFn<typeof FormRegister> = () => (
  <Box
    w="100%"
    maxW={565}
    pt="63px"
    px="70px"
    bgColor="white"
    borderRadius="10px"
    boxShadow="0 0 5px 1px rgb(0 0 0 / 25%)"
  >
    <HeadingForm title="Registration" description="For Both Staff & Students" />
    <FormRegister onSubmit={() => {}} />
    <FooterForm
      text="Already a User?"
      textLink="Login now"
      pb="80px"
      link="/"
    />
  </Box>
);

export const Default = Template.bind({});
Default.args = {};
