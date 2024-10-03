"use client";

import { Flex, Skeleton } from "@chakra-ui/react";

const SkeletonListTopContribute = () => (
  <Flex gap="39px" justifyContent="space-between">
    {Array.from({ length: 3 }, (_, index) => (
      <Skeleton key={index} w={160} h={260} borderRadius="10px" />
    ))}
  </Flex>
);

export default SkeletonListTopContribute;
