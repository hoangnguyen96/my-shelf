import { memo } from "react";
import { Flex, Text } from "@chakra-ui/react";

interface HeadingTableProps {
  isStatus?: boolean;
}

const HeadingTable = ({ isStatus = true }: HeadingTableProps) => (
  <Flex
    gap={{ base: "2%", xl: "5%", "2xl": "6%" }}
    alignItems="center"
    bgColor="var(--chakra-colors-chakra-subtle-bg)"
    pos="sticky"
    w="100%"
    minH="48px"
    top={0}
    minW={isStatus ? 740 : 700}
    zIndex={10}
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
    {isStatus && (
      <Flex maxW={{ base: 100, "2xl": 200 }} w="100%">
        <Text size="xl" fontWeight={500}>
          Status
        </Text>
      </Flex>
    )}
  </Flex>
);

export default memo(HeadingTable);
