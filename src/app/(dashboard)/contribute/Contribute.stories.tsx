import { Meta, StoryFn } from "@storybook/react";
import { Box, ChakraProvider, Flex, Text } from "@chakra-ui/react";
import theme from "@app/themes";
import { RouterContext } from "next/dist/shared/lib/router-context.shared-runtime";
import { mockRouter, mockSession } from "@app/mocks/storybook";
import { SessionProvider } from "next-auth/react";
import { Logo, Navbar } from "@app/components/common";
import { ListContribute, MenuProfile } from "@app/components";
import Link from "next/link";
import { ROUTES } from "@app/constants";
import { User } from "@app/models";
import { DATA_BOOKS, DATA_USER } from "@app/mocks/data";
import ContributePage from "./page";

const meta: Meta<typeof ContributePage> = {
  component: ContributePage,
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

const Template: StoryFn<typeof ContributePage> = () => (
  <Flex bgColor="white" borderRadius="10px" height="100%">
    <Flex flexDir="column" gap="100px" padding="38px 66px" alignItems="center">
      <Logo
        user={
          {
            isAdmin: true,
            email: "admin@gmail.com",
            id: "3733403",
            name: "admin",
            image: "https://i.ibb.co/RHMqQGr/man-1.png",
          } as unknown as User
        }
      />
      <Navbar />
    </Flex>
    <Box
      w="100%"
      h="100%"
      bgColor="backgroundContent"
      borderRightRadius="10px"
      pos="relative"
    >
      <Flex alignItems="center" justifyContent="flex-end" p="32px 48px">
        <MenuProfile />
      </Flex>
      <Flex
        p="100px 68px"
        gap="56px"
        height={765}
        pos="relative"
        justifyContent="center"
      >
        <Flex
          flex={1}
          maxW={678}
          flexDir="column"
          bgColor="white"
          borderRadius="10px"
          p="28px 45px 45px 60px"
        >
          <ContributePage />
        </Flex>
        <Flex maxW={582} flexDir="column" w="100%">
          <Text fontSize="50px" lineHeight="64px" fontWeight={700}>
            Your{" "}
            <Text
              as="span"
              color="brand.90"
              fontSize="50px"
              lineHeight="64px"
              fontWeight={700}
            >
              Contribution
            </Text>{" "}
            Helps Other to Learn
          </Text>
          <Flex
            mt="75px"
            mb="30px"
            justifyContent="space-between"
            alignItems="center"
          >
            <Text size="xxl" fontWeight={400}>
              Your Previous Contributions
            </Text>
            <Link href={ROUTES.CONTRIBUTE_LIST}>
              <Text as="span" ml="9px" color="dark.60">
                Show All
              </Text>
            </Link>
          </Flex>
          <ListContribute list={DATA_BOOKS} user={DATA_USER[0]} />
        </Flex>
      </Flex>
    </Box>
  </Flex>
);

export const Default = Template.bind({});
Default.args = {};
