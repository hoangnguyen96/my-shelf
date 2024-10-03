import { SkeletonSearchList } from "@app/components";
import { Box, Flex, Text } from "@chakra-ui/react";
import { Suspense } from "react";

const SearchLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => (
  <Box p="70px 44px" height="90%">
    <Flex gap="10%" alignItems="center">
      <Text size="xl" fontWeight={500} w="100%" maxW={345}>
        Title
      </Text>
      <Flex gap="20%" w="100%" maxW={300}>
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
    <Suspense fallback={<SkeletonSearchList />}>{children}</Suspense>
  </Box>
);

export default SearchLayout;
