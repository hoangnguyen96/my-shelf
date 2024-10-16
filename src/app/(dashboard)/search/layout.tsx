import { SkeletonSearchList } from "@app/components";
import { Box, Flex, Text } from "@chakra-ui/react";
import { Suspense } from "react";

const SearchLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => (
  <Box p="70px 44px" height="90%">
    <Flex gap={{ base: "2%", xl: "5%", "2xl": "6%" }} alignItems="center">
      <Text
        size="xl"
        w="100%"
        fontWeight={500}
        minW={{ base: 235, "2xl": 320 }}
        maxW={{ base: "24%", "2xl": "22%" }}
        gap={{ base: "20px", "2xl": "47px" }}
      >
        Title
      </Text>
      <Flex
        w="100%"
        alignItems="center"
        maxW={{ base: "18%" }}
        gap={{ base: "10px", xl: "20px", "2xl": "60px" }}
        minW={{ base: 205, xl: "22%", "2xl": 225 }}
      >
        <Text size="xl" fontWeight={500}>
          Ratings
        </Text>
        <Text size="xl" fontWeight={500}>
          Category
        </Text>
      </Flex>
      <Flex maxW={{ base: 100, "2xl": 200 }} w="100%">
        <Text size="xl" fontWeight={500}>
          Status
        </Text>
      </Flex>
    </Flex>
    <Suspense fallback={<SkeletonSearchList />}>{children}</Suspense>
  </Box>
);

export default SearchLayout;
