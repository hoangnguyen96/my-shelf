import { Suspense } from "react";
import { auth } from "@app/auth";
import { Flex, Text } from "@chakra-ui/react";
import { ROUTES } from "@app/constants";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ListTopContribute } from "@app/features/dashboard/components";
import {
  SkeletonFormContribute,
  SkeletonListTopContribute,
} from "@app/components";

const ContributeLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const session = await auth();

  if (!session?.user?.isAdmin) {
    return notFound();
  }

  return (
    <Flex
      p="100px 68px"
      gap="56px"
      height={765}
      pos="relative"
      justifyContent="center"
    >
      <Flex
        flex={1}
        maxW={678}
        flexDir="column"
        bgColor="white"
        borderRadius="10px"
        p="28px 45px 45px 60px"
      >
        <Suspense fallback={<SkeletonFormContribute />}>{children}</Suspense>
      </Flex>
      <Flex maxW={582} flexDir="column" w="100%">
        <Text fontSize="50px" lineHeight="64px" fontWeight={700}>
          Your{" "}
          <Text
            as="span"
            color="brand.90"
            fontSize="50px"
            lineHeight="64px"
            fontWeight={700}
          >
            Contribution
          </Text>{" "}
          Helps Other to Learn
        </Text>
        <Flex
          mt="75px"
          mb="30px"
          justifyContent="space-between"
          alignItems="center"
        >
          <Text size="xxl" fontWeight={400}>
            Your Previous Contributions
          </Text>
          <Link href={ROUTES.CONTRIBUTE_LIST}>
            <Text as="span" ml="9px" color="colorDescription">
              Show All
            </Text>
          </Link>
        </Flex>
        <Suspense fallback={<SkeletonListTopContribute />}>
          <ListTopContribute />
        </Suspense>
      </Flex>
    </Flex>
  );
};

export default ContributeLayout;
