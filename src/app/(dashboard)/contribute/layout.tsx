import { Suspense } from "react";
import { auth } from "@app/auth";
import { Flex, Text } from "@chakra-ui/react";
import { ROUTES } from "@app/constants";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ListContribute,
  SkeletonFormContribute,
  SkeletonListTopContribute,
} from "@app/components";
import { getBooksByLimit, getUserById } from "@app/features/dashboard/actions";

const ContributeLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const session = await auth();
  const { data: dataUserById } = await getUserById(session?.user?.id as string);
  const { data: dataBooks } = await getBooksByLimit("", 3);

  if (!session?.user?.isAdmin) {
    return notFound();
  }

  return (
    <Flex
      gap="56px"
      pos="relative"
      justifyContent="flex-start"
      height={{ base: "80%", "2xl": 765 }}
      overflowY={{ base: "scroll", "2xl": "hidden" }}
      flexDir={{ base: "column", "2xl": "row" }}
      p={{ base: "0 48px 60px", "2xl": "100px 68px" }}
    >
      <Flex
        flex={1}
        maxW={{ base: "unset", "2xl": 678 }}
        maxH={590}
        flexDir="column"
        bgColor="white"
        borderRadius="10px"
        p="28px 45px 45px 60px"
      >
        <Suspense fallback={<SkeletonFormContribute />}>{children}</Suspense>
      </Flex>
      <Flex maxW={{ base: "unset", "2xl": 582 }} flexDir="column" w="100%">
        <Text
          fontSize={{ base: "xxxl", "2xl": "50px" }}
          lineHeight={{ base: "36px", "2xl": "64px" }}
          fontWeight={700}
        >
          Your{" "}
          <Text
            as="span"
            color="brand.90"
            fontSize={{ base: "xxxl", "2xl": "50px" }}
            lineHeight={{ base: "36px", "2xl": "64px" }}
            fontWeight={700}
          >
            Contribution
          </Text>{" "}
          Helps Other to Learn
        </Text>
        <Flex
          mb="30px"
          alignItems="center"
          justifyContent="space-between"
          mt={{ base: "30px", "2xl": "75px" }}
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
          <ListContribute list={dataBooks} user={dataUserById} />
        </Suspense>
      </Flex>
    </Flex>
  );
};

export default ContributeLayout;
