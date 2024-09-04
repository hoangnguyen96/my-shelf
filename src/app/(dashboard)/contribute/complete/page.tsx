"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { Flex, Text } from "@chakra-ui/react";
import { ROUTES } from "@app/constants";
import { getAllBook, getUserById } from "@app/api";
import { BookType, User } from "@app/models";
import { getThreeTopBook } from "@app/utils";
import { Cart, ContributeComplete } from "@app/components/common";
import { TopContent } from "@app/components";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { useRouter } from "next/navigation";

const ContributePage = async () => {
  const { data: session } = useSession();
  const router = useRouter();
  const dataUserById = (await getUserById(session?.user?.id || "")) as User;
  const dataBooks = await getAllBook();
  const dataTop = getThreeTopBook(dataBooks);

  return (
    <>
      <TopContent isSearch={false} />
      <Link href="#" onClick={() => router.back()} style={{ margin: "0 68px" }}>
        <ArrowBackIcon w={5} h={5} />
        <Text as="span" ml="9px">
          Back
        </Text>
      </Link>
      <Flex p="100px 68px" gap="56px" height={765}>
        <Flex
          flex={1}
          maxW={678}
          flexDir="column"
          bgColor="white"
          borderRadius="10px"
          p="28px 45px 45px 60px"
        >
          <ContributeComplete />
        </Flex>
        <Flex maxW={582} flexDir="column">
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
              <Text as="span" ml="9px" color="dark.60">
                Show All
              </Text>
            </Link>
          </Flex>

          <Flex gap="39px" justifyContent="space-between">
            {dataTop.map((item: BookType) => {
              const { id, title, author, imageUrl, publicationYear, rating } =
                item;

              return (
                <Cart
                  key={id}
                  id={id}
                  title={title}
                  author={author}
                  imageUrl={imageUrl}
                  publicationYear={publicationYear}
                  rating={rating}
                  isFavorite={dataUserById.favorites?.includes(id) || false}
                  isContribute={true}
                />
              );
            })}
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default ContributePage;
