"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { Flex, Text } from "@chakra-ui/react";
import { ROUTES } from "@app/constants";
import { getAllBook, getBookById, getUserById, updateBookById } from "@app/api";
import { BookType, User } from "@app/models";
import { getThreeTopBook } from "@app/utils";
import { Cart, FormContribute } from "@app/components/common";
import { TopContent } from "@app/components";

const ContributePage = async ({ params }: { params: { id: string } }) => {
  const { data: session } = useSession();
  const dataBooks = await getAllBook();
  const dataUserById = (await getUserById(session?.user?.id || "")) as User;
  const dataBookById = await getBookById(params.id);
  const dataTop = getThreeTopBook(dataBooks);

  const handleUpdate = async (id: string, values: Partial<BookType>) => {
    const {
      title,
      author,
      category,
      imageUrl,
      description,
      status,
      publicationYear,
      rating,
      createdDate,
      edition,
    } = values;

    const payload: Partial<BookType> = {
      title,
      author,
      category,
      imageUrl,
      description,
      status,
      publicationYear,
      rating,
      createdDate,
      edition,
    };

    return await updateBookById(id, payload);
  };

  return (
    <>
      <TopContent isSearch={false} />
      <Flex p="100px 68px" gap="56px" height={765}>
        <Flex
          flex={1}
          maxW={678}
          flexDir="column"
          bgColor="white"
          borderRadius="10px"
          p="28px 45px 45px 60px"
        >
          <Text size="xl" color="dark.100" mb="34px">
            Preview Book Details
          </Text>
          <FormContribute
            itemUpdate={dataBookById as BookType}
            onUpdate={handleUpdate}
          />
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
