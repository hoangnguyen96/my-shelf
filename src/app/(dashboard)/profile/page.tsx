"use client";

import { useSession } from "next-auth/react";
import { Box, Flex, Text, useToast } from "@chakra-ui/react";
import { getUserById, updateUserById } from "@app/api-request";
import { User } from "@app/models";
import { LoadingIndicator, UploadImage } from "@app/components/common";
import { useEffect, useState } from "react";
import { MESSAGES } from "@app/constants";
import { useRouter } from "next/navigation";
import { FormProfile } from "@app/components";

const ProfilePage = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const toast = useToast();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [dataUserById, setDataUserById] = useState<User>();

  const fetchData = async () => {
    if (session?.user?.id) {
      try {
        const user = (await getUserById(session.user.id)) as User;
        setDataUserById(user);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [session]);

  const handleUpdateUser = async (id: string, user: Partial<User>) => {
    try {
      setIsLoading(true);
      const { username, email, phone, bio } = user;

      const payload: Partial<User> = {
        ...user,
        username,
        email,
        phone,
        bio,
      };

      await updateUserById(id, payload);
      toast({
        title: "Update Successful.",
        description: MESSAGES.UPDATE_SUCCESS,
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      setIsLoading(false);
      return router.refresh();
    } catch (error) {
      toast({
        title: "Update Failed!",
        description: MESSAGES.UPDATE_ERROR,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      console.error("Failed to update user!", error);
    }
  };

  if (!dataUserById) {
    return <LoadingIndicator />;
  }

  return (
    <>
      <Flex
        flexDir="column"
        bgColor="white"
        borderRadius="10px"
        width="100%"
        maxW={1136}
        ml="44px"
        mt="4px"
        mb="20px"
        p="48px 24px 24px"
        boxShadow="0 0 5px 1px rgb(0 0 0 / 10%)"
      >
        <Text size="xl" color="brand.80" fontWeight={700}>
          Account Setting
        </Text>
        <Flex
          flexDir="column"
          alignItems="center"
          alignSelf="flex-start"
          mt="50px"
        >
          <Text>Your Profile Picture</Text>
          <Box mt="17px">
            <UploadImage
              image={session?.user?.image || ""}
              user={dataUserById as User}
            />
          </Box>
        </Flex>
        <FormProfile
          isLoading={isLoading}
          user={dataUserById as User}
          onUpdate={handleUpdateUser}
        />
      </Flex>
    </>
  );
};

export default ProfilePage;
