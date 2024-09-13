import { Box, Flex, Text } from "@chakra-ui/react";

const SearchLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => (
  <Box p="70px 44px" height="90%">
    <Flex gap="90px" alignItems="center">
      <Text size="xl" fontWeight={500} w="100%" maxW={352}>
        Title
      </Text>
      <Flex gap="60px" w="100%" maxW={312}>
        <Text size="xl" fontWeight={500}>
          Ratings
        </Text>
        <Text size="xl" fontWeight={500}>
          Category
        </Text>
      </Flex>
      <Text size="xl" fontWeight={500}>
        Status
      </Text>
    </Flex>
    {children}
  </Box>
);

export default SearchLayout;
