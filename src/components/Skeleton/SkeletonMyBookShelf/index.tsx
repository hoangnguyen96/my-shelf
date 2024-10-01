import { Flex, Skeleton } from "@chakra-ui/react";

const SkeletonMyBookShelf = () => (
  <Flex gap="40px" flexWrap="wrap">
    {Array.from({ length: 4 }, (_, index) => (
      <Skeleton key={index} w={308} h={260} borderRadius="10px" />
    ))}
  </Flex>
);

export default SkeletonMyBookShelf;
