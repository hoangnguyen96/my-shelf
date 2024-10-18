import { HeadingTable, SkeletonSearchList } from "@app/components";
import { MyBookShelfLayout } from "@app/layouts";
import { Flex, Text } from "@chakra-ui/react";
import { Suspense } from "react";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => (
  <MyBookShelfLayout>
    <Flex
      flexDir="column"
      gap="12px"
      justifyContent="space-between"
      overflow="auto"
      maxH="75%"
      sx={{
        "::-webkit-scrollbar-track": {
          marginTop: "60px",
        },
      }}
    >
      <HeadingTable />
      <Suspense fallback={<SkeletonSearchList />}>{children}</Suspense>
    </Flex>
  </MyBookShelfLayout>
);

export default Layout;
