"use client";

import { MESSAGES, REGEX_PATTERN } from "@app/constants";
import { User } from "@app/models";
import {
  clearErrorOnChange,
  isEnableSubmitButton,
  validateRegExpFormat,
} from "@app/utils";
import {
  Box,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  IconButton,
  Textarea,
} from "@chakra-ui/react";
import { memo, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { EditProfileIcon } from "@app/assets/icons";
import { Button, Input } from "../common";

interface FormProfileProps {
  isLoading?: boolean;
  user: User;
  onUpdate: (id: string, user: Partial<User>) => void;
}

const FormProfile = ({
  isLoading = false,
  user,
  onUpdate,
}: FormProfileProps) => {
  const [isReadOnly, setIsReadOnly] = useState<boolean>(true);
  const REQUIRED_FIELDS = ["username", "email", "phone"];

  const { id, username, email, userId, phone, bio } = user;

  const formInitData: Partial<User> = useMemo(
    () => ({
      username,
      email,
      userId,
      phone,
      bio,
    }),
    [username, email, userId, phone, bio]
  );

  const {
    control,
    clearErrors,
    handleSubmit: submitForm,
    formState: { errors, isValid, dirtyFields, isSubmitting },
    reset,
  } = useForm<Partial<User>>({
    mode: "onBlur",
    reValidateMode: "onBlur",
    defaultValues: formInitData,
  });

  const dirtyItems = Object.keys(dirtyFields);

  const shouldEnable = useMemo(
    () => isEnableSubmitButton(REQUIRED_FIELDS, dirtyItems, errors),
    [dirtyItems, errors]
  );

  const isDisableSubmit = !(shouldEnable || isValid);

  const handleUnReadOnly = () => {
    setIsReadOnly(!isReadOnly);
    reset();
  };

  const handleSubmitForm = (user: Partial<User>) => {
    onUpdate(id, user);
    setIsReadOnly(!isReadOnly);
  };

  return (
    <Box as="form" pos="relative" mt="56px">
      <IconButton
        minW="48px"
        h="48px"
        pos="absolute"
        right={0}
        top="-50px"
        borderRadius="20px"
        bgColor="white"
        boxShadow="0 0 5px 1px rgb(0 0 0 / 10%)"
        icon={<EditProfileIcon />}
        aria-label={""}
        onClick={handleUnReadOnly}
      />
      <Flex
        justifyContent="space-between"
        alignItems="flex-start"
        gap="24px"
        h={111}
      >
        {/* Full name */}
        <FormControl
          isInvalid={!!errors.username}
          mb={errors.username?.message ? "2px" : "24px"}
        >
          <FormLabel color="dark.90" htmlFor="username">
            Full name
          </FormLabel>
          <Controller
            name="username"
            control={control}
            rules={{
              required: !isReadOnly && MESSAGES.FIELD_REQUIRED,
            }}
            render={({
              field: { value, onChange, ...rest },
              fieldState: { error },
            }) => (
              <Input
                id="username"
                value={value}
                placeholder="Full name"
                color={isReadOnly ? "dark.60" : "dark.90"}
                isInvalid={!!error?.message}
                isReadOnly={isReadOnly}
                onChange={(e) => {
                  onChange(e);
                  clearErrorOnChange("username", errors, clearErrors);
                }}
                _readOnly={{ bgColor: "backgroundReadOnly" }}
                {...rest}
              />
            )}
          />
          <FormErrorMessage pl="10px">
            {errors.username?.message && errors.username.message}
          </FormErrorMessage>
        </FormControl>

        {/* Email */}
        <FormControl
          isInvalid={!!errors.email}
          mb={errors.email?.message ? "2px" : "24px"}
        >
          <FormLabel color="dark.90" htmlFor="email">
            College Email ID
          </FormLabel>
          <Controller
            name="email"
            control={control}
            rules={{
              required: !isReadOnly && MESSAGES.FIELD_REQUIRED,
              validate: (value) =>
                !isReadOnly &&
                validateRegExpFormat(
                  value as string,
                  REGEX_PATTERN.EMAIL,
                  "Email"
                ),
            }}
            render={({
              field: { value, onChange, ...rest },
              fieldState: { error },
            }) => (
              <Input
                id="email"
                value={value}
                placeholder="Email..."
                isReadOnly={isReadOnly}
                color={isReadOnly ? "dark.60" : "dark.90"}
                isInvalid={!!error?.message}
                onChange={(e) => {
                  onChange(e);
                  clearErrorOnChange("email", errors, clearErrors);
                }}
                _readOnly={{ bgColor: "backgroundReadOnly" }}
                {...rest}
              />
            )}
          />
          <FormErrorMessage pl="10px">
            {errors.email?.message && errors.email.message}
          </FormErrorMessage>
        </FormControl>
      </Flex>

      <Flex
        justifyContent="space-between"
        alignItems="flex-start"
        gap="24px"
        h={111}
      >
        {/* Register Number */}
        <FormControl
          isInvalid={!!errors.userId}
          mb={errors.userId?.message ? "2px" : "24px"}
        >
          <FormLabel color="dark.90" htmlFor="userId">
            Register Number
          </FormLabel>
          <Controller
            name="userId"
            control={control}
            render={({
              field: { value, onChange, ...rest },
              fieldState: { error },
            }) => (
              <Input
                id="userId"
                value={value}
                placeholder="UserId"
                isReadOnly={true}
                color="dark.60"
                isInvalid={!!error?.message}
                onChange={(e) => {
                  onChange(e);
                  clearErrorOnChange("userId", errors, clearErrors);
                }}
                _readOnly={{ bgColor: "backgroundReadOnly" }}
                {...rest}
              />
            )}
          />
          <FormErrorMessage pl="10px">
            {errors.userId?.message && errors.userId.message}
          </FormErrorMessage>
        </FormControl>

        {/* Phone number */}
        <FormControl
          isInvalid={!!errors.phone}
          mb={errors.phone?.message ? "2px" : "24px"}
        >
          <FormLabel color="dark.90" htmlFor="phone">
            Phone number
          </FormLabel>
          <Controller
            name="phone"
            control={control}
            rules={{
              required: !isReadOnly && MESSAGES.FIELD_REQUIRED,
            }}
            render={({
              field: { value, onChange, ...rest },
              fieldState: { error },
            }) => (
              <Input
                id="phone"
                type="number"
                value={value}
                placeholder="Phone"
                isReadOnly={isReadOnly}
                color={isReadOnly ? "dark.60" : "dark.90"}
                isInvalid={!!error?.message}
                onChange={(e) => {
                  onChange(e);
                  clearErrorOnChange("phone", errors, clearErrors);
                }}
                _readOnly={{ bgColor: "backgroundReadOnly" }}
                {...rest}
              />
            )}
          />
          <FormErrorMessage pl="10px">
            {errors.phone?.message && errors.phone.message}
          </FormErrorMessage>
        </FormControl>
      </Flex>

      {/* Reason */}
      <FormControl
        w="100%"
        h="100%"
        isInvalid={!!errors.bio}
        mb={errors.bio?.message ? "0" : "12px"}
      >
        <FormLabel color="dark.90" htmlFor="phone">
          Bio
        </FormLabel>
        <Controller
          name="bio"
          control={control}
          render={({
            field: { value, onChange, ...rest },
            fieldState: { error },
          }) => (
            <Textarea
              h="100%"
              minH={158}
              isReadOnly={isReadOnly}
              color={isReadOnly ? "dark.60" : "dark.90"}
              value={value}
              border="1px solid"
              borderColor="borderDefault"
              placeholder="Reason For Your Contribution"
              _placeholder={{ color: "dark.60" }}
              _focusVisible={{ boxShadow: "unset" }}
              _readOnly={{ bgColor: "backgroundReadOnly" }}
              onChange={(e) => {
                onChange(e);
                clearErrorOnChange("bio", errors, clearErrors);
              }}
              {...rest}
            />
          )}
        />
        <FormErrorMessage pl="10px">
          {errors.bio?.message && errors.bio.message}
        </FormErrorMessage>
      </FormControl>

      <Button
        type="submit"
        text="Update Profile"
        mt="34px"
        h="50px"
        fontSize="18px"
        fontWeight={700}
        borderRadius="8px"
        isLoading={isLoading}
        isDisabled={isReadOnly ? true : isDisableSubmit || isSubmitting}
        onClick={submitForm(handleSubmitForm)}
      />
    </Box>
  );
};

export default memo(FormProfile);
