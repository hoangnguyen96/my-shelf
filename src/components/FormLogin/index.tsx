"use client";

import { memo, useMemo, useState } from "react";
import {
  Box,
  FormControl,
  FormErrorMessage,
  FormLabel,
} from "@chakra-ui/react";
import { useForm, Controller } from "react-hook-form";

// Constants
import { MESSAGES, REGEX_PATTERN } from "@app/constants";

// Models
import { User } from "@app/models";

// Utils
import {
  clearErrorOnChange,
  isEnableSubmitButton,
  validatePassword,
  validateRegExpFormat,
} from "@app/utils";

// Components
import { Button, Input } from "../common";

interface LoginForm {
  onSubmit: (data: Partial<User>) => Promise<void | string>;
}

const FormLogin = ({ onSubmit }: LoginForm) => {
  const REQUIRED_FIELDS = ["email", "password"];

  const {
    control,
    clearErrors,
    handleSubmit: submitLogin,
    formState: { errors, isValid, dirtyFields, isSubmitting },
    reset,
  } = useForm<Partial<User>>({
    mode: "onBlur",
    reValidateMode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Checking to disable/enable submit button
  const dirtyItems = Object.keys(dirtyFields);

  const shouldEnable = useMemo(
    () => isEnableSubmitButton(REQUIRED_FIELDS, dirtyItems, errors),
    [dirtyItems, errors]
  );

  const isDisableSubmit = !(shouldEnable || isValid);

  const handleLogin = async (formData: Partial<User>) => {
    await onSubmit(formData);
  };

  return (
    <Box as="form" style={{ marginTop: "40px" }}>
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
            validate: (value) =>
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
            validate: (value) => validatePassword(value as string),
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

      <Button
        data-testid="submit-login"
        variant="full"
        text="Login"
        mt="40px"
        mb="60px"
        isLoading={isSubmitting}
        isDisabled={isDisableSubmit || isSubmitting}
        onClick={submitLogin(handleLogin)}
      />
    </Box>
  );
};

export default memo(FormLogin);
