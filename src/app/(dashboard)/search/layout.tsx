import { HeadingTable, SkeletonSearchList } from "@app/components";
import { Box, Flex } from "@chakra-ui/react";
import { Suspense } from "react";

const SearchLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => (
  <Box p="70px 44px" height="90%">
    <Flex
      flexDir="column"
      gap="12px"
      overflow="auto"
      h="80%"
      sx={{
        "::-webkit-scrollbar-track": {
          marginTop: "60px",
        },
      }}
    >
      <HeadingTable />
      <Suspense fallback={<SkeletonSearchList />}>{children}</Suspense>
    </Flex>
  </Box>
);

export default SearchLayout;
