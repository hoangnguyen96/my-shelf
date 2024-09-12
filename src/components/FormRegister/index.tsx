"use client";

import { memo, useCallback, useMemo } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Box,
  FormControl,
  FormErrorMessage,
  FormLabel,
} from "@chakra-ui/react";

// Constants
import { MESSAGES, REGEX_PATTERN } from "@app/constants";

// Models
import { User } from "@app/models";

// Utils
import {
  checkEmailExists,
  clearErrorOnChange,
  isEnableSubmitButton,
  validateConfirmPassword,
  validatePassword,
  validateRegExpFormat,
} from "@app/utils";

// Components
import { Button, Input } from "../common";

interface FormRegisterProps {
  itemUpdate?: Partial<User>;
  onSubmit: (user: Partial<User>) => void;
}

interface FormRegisterData extends Partial<User> {
  confirmPassword: string;
}

const FormRegister = ({ itemUpdate, onSubmit }: FormRegisterProps) => {
  const { username, email, password } = itemUpdate || {};

  const REQUIRED_FIELDS = ["username", "email", "password", "confirmPassword"];

  const formInitData: FormRegisterData = useMemo(
    () => ({
      username: username || "",
      email: email || "",
      password: password || "",
      confirmPassword: password || "",
    }),
    [username, email, password]
  );

  const {
    control,
    getValues,
    clearErrors,
    handleSubmit: submitLogin,
    formState: { errors, isValid, dirtyFields, isSubmitting },
    reset,
  } = useForm<FormRegisterData>({
    mode: "onBlur",
    reValidateMode: "onBlur",
    defaultValues: formInitData,
  });

  // Checking to disable/enable submit button
  const dirtyItems = Object.keys(dirtyFields);

  const shouldEnable = useMemo(
    () => isEnableSubmitButton(REQUIRED_FIELDS, dirtyItems, errors),
    [dirtyItems, errors]
  );

  const isDisableSubmit = !(shouldEnable || isValid);

  const handleFormSubmit = useCallback(
    async (data: FormRegisterData) => {
      onSubmit(data);
      reset();
    },
    [onSubmit, reset]
  );

  return (
    <Box as="form" style={{ marginTop: "40px" }}>
      {/* Name */}
      <FormControl
        isInvalid={!!errors.username}
        mb={errors.username?.message ? "0" : "22px"}
      >
        <FormLabel htmlFor="name">Name</FormLabel>
        <Controller
          name="username"
          control={control}
          defaultValue=""
          rules={{
            required: MESSAGES.FIELD_REQUIRED,
          }}
          render={({
            field: { value, onChange, ...rest },
            fieldState: { error },
          }) => (
            <Input
              id="name"
              value={value}
              placeholder="Username..."
              isInvalid={!!error?.message}
              onChange={(e) => {
                onChange(e);
                clearErrorOnChange("username", errors, clearErrors);
              }}
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
        mb={errors.email?.message ? "0" : "22px"}
      >
        <FormLabel htmlFor="email">Email</FormLabel>
        <Controller
          name="email"
          control={control}
          defaultValue=""
          rules={{
            required: MESSAGES.FIELD_REQUIRED,
            validate: async (value) => {
              const formatError = validateRegExpFormat(
                value as string,
                REGEX_PATTERN.EMAIL,
                "Email"
              );

              if (formatError !== true) {
                return formatError;
              }

              return await checkEmailExists(value || "");
            },
          }}
          render={({
            field: { value, onChange, ...rest },
            fieldState: { error },
          }) => (
            <Input
              id="email"
              value={value}
              placeholder="Email..."
              isInvalid={!!error?.message}
              onChange={(e) => {
                onChange(e);
                clearErrorOnChange("email", errors, clearErrors);
              }}
              {...rest}
            />
          )}
        />
        <FormErrorMessage pl="10px">
          {errors.email?.message && errors.email.message}
        </FormErrorMessage>
      </FormControl>

      {/* Password */}
      <FormControl
        isInvalid={!!errors.password}
        mb={errors.password?.message ? "0" : "22px"}
      >
        <FormLabel htmlFor="password">Password</FormLabel>
        <Controller
          name="password"
          control={control}
          defaultValue=""
          rules={{
            required: MESSAGES.FIELD_REQUIRED,
            validate: (value) => validatePassword(value || ""),
          }}
          render={({
            field: { value, onChange, ...rest },
            fieldState: { error },
          }) => (
            <Input
              id="password"
              value={value}
              placeholder="Password..."
              isTypePassword={true}
              isInvalid={!!error?.message}
              onChange={(e) => {
                onChange(e);
                clearErrorOnChange("password", errors, clearErrors);
              }}
              {...rest}
            />
          )}
        />
        <FormErrorMessage pl="10px">
          {errors.password?.message && errors.password.message}
        </FormErrorMessage>
      </FormControl>

      {/* Confirm Password */}
      <FormControl
        isInvalid={!!errors.confirmPassword}
        mb={errors.confirmPassword?.message ? "0" : "22px"}
      >
        <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
        <Controller
          name="confirmPassword"
          control={control}
          defaultValue=""
          rules={{
            required: MESSAGES.FIELD_REQUIRED,
            validate: (value) =>
              validateConfirmPassword(
                value as string,
                getValues("password") || ""
              ),
          }}
          render={({
            field: { value, onChange, ...rest },
            fieldState: { error },
          }) => (
            <Input
              id="confirmPassword"
              value={value}
              placeholder="ConfirmPassword..."
              isTypePassword={true}
              isInvalid={!!error?.message}
              onChange={(e) => {
                onChange(e);
                clearErrorOnChange("confirmPassword", errors, clearErrors);
              }}
              {...rest}
            />
          )}
        />
        <FormErrorMessage pl="10px">
          {errors.confirmPassword?.message && errors.confirmPassword.message}
        </FormErrorMessage>
      </FormControl>

      <Button
        data-testid="submit-register"
        type="submit"
        variant="full"
        text="Register"
        my="40px"
        isLoading={isSubmitting}
        isDisabled={isDisableSubmit || isSubmitting}
        onClick={submitLogin(handleFormSubmit)}
      />
    </Box>
  );
};

export default memo(FormRegister);
