"use client";

import { memo } from "react";
import { Box, Flex, Text, useToast } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { MESSAGES } from "@app/constants";
import { User } from "@app/models";
import { updateUserById } from "../../actions";
import { FormProfile } from "@app/components";
import { UploadImage } from "@app/components/common";

interface ProfileUpdateProps {
  imageUrl: string;
  user: User;
}

export const ProfileUpdate = memo(({ imageUrl, user }: ProfileUpdateProps) => {
  const router = useRouter();
  const toast = useToast();

  const handleUpdateUser = async (id: string, user: Partial<User>) => {
    try {
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
      return router.refresh();
    } catch (error) {
      toast({
        title: "Update Failed!",
        description: MESSAGES.UPDATE_ERROR,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      if (error instanceof Error) {
        return error.message;
      }
      return MESSAGES.RESPONSE_ERROR;
    }
  };

  return (
    <Box p="5px 44px 20px">
      <Flex
        flexDir="column"
        bgColor="white"
        borderRadius="10px"
        width="100%"
        maxW={1136}
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
            <UploadImage image={imageUrl} user={user} />
          </Box>
        </Flex>
        <FormProfile user={user as User} onUpdate={handleUpdateUser} />
      </Flex>
    </Box>
  );
});
