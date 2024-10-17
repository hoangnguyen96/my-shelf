import { SkeletonSearchList } from "@app/components";
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
      gap={{ base: "2%", xl: "5%", "2xl": "6%" }}
      alignItems="center"
      overflow="hidden"
    >
      <Text
        size="xl"
        minW={{ base: 227, xl: 260, "2xl": 318 }}
        maxW={{ base: 227, xl: 260, "2xl": 318 }}
        fontWeight={500}
        gap={{ base: "20px", "2xl": "47px" }}
      >
        Title
      </Text>
      <Flex
        alignItems="center"
        minW={{ base: 228, "2xl": 296 }}
        maxW={{ base: 228, "2xl": 296 }}
        gap={{ base: "10px", xl: "20px", "2xl": "60px" }}
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
  </MyBookShelfLayout>
);

export default Layout;
