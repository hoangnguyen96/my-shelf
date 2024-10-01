import { Flex, Skeleton } from "@chakra-ui/react";

const SkeletonSearchList = () => (
  <Flex
    flexDir="column"
    gap="23px"
    mt="23px"
    justifyContent="space-between"
    overflowY="scroll"
    maxH="75%"
  >
    {Array.from({ length: 4 }, (_, index) => (
      <Skeleton key={index} w="100%" h={125} borderRadius="10px" />
    ))}
  </Flex>
);

export default SkeletonSearchList;
