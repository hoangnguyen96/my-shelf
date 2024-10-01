import { Meta, StoryFn } from "@storybook/react";
import { Box, ChakraProvider, Flex, Text } from "@chakra-ui/react";
import theme from "@app/themes";
import { RouterContext } from "next/dist/shared/lib/router-context.shared-runtime";
import { mockRouter, mockSession } from "@app/mocks/storybook";
import { SessionProvider } from "next-auth/react";
import { Logo, Navbar } from "@app/components/common";
import { MenuProfile, TableItem, TopContent } from "@app/components";
import ContributeList from "./page";
import { BookType, User } from "@app/models";
import { DATA_BOOKS, DATA_USER } from "@app/mocks/data";
import Link from "next/link";
import { ArrowBackIcon } from "@chakra-ui/icons";

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
      <Box p="20px 44px">
        <Link href="#" data-testid="click-back" onClick={() => {}}>
          <ArrowBackIcon w={5} h={5} />
          <Text as="span" ml="9px">
            Back
          </Text>
        </Link>

        <Flex gap="10%" alignItems="center" mt="66px">
          <Text size="xl" fontWeight={500} w="100%" maxW={352}>
            Title
          </Text>
          <Flex gap="10%" w="100%" maxW={312}>
            <Text size="xl" fontWeight={500}>
              Ratings
            </Text>
            <Text size="xl" fontWeight={500}>
              Category
            </Text>
          </Flex>
        </Flex>
        <Flex
          flexDir="column"
          gap="23px"
          mt="23px"
          justifyContent="space-between"
          overflow="hidden scroll"
          maxH="65vh"
        >
          {DATA_BOOKS.map((itemBook: BookType) => {
            const {
              id,
              title,
              author,
              imageUrl,
              publicationYear,
              rating,
              edition,
              category,
            } = itemBook;

            return (
              <TableItem
                key={id}
                id={id}
                title={title}
                author={author}
                imageUrl={imageUrl}
                isContribute={true}
                category={category}
                publicationYear={publicationYear}
                rating={rating}
                edition={edition}
                isFavorite={DATA_USER[0]?.favorites?.includes(id)}
              />
            );
          })}
        </Flex>
      </Box>
    </Box>
  </Flex>
);

export const Default = Template.bind({});
Default.args = {};
