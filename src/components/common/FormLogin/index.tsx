"use client";

import { useEffect, useMemo, useState } from "react";
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
import { Button, Checkbox, Input } from "..";

interface LoginForm {
  onSubmit: (data: Partial<User>) => Promise<void | string>;
}

const FormLogin = ({ onSubmit }: LoginForm) => {
  const REQUIRED_FIELDS = ["email", "password"];
  const [rememberMe, setRememberMe] = useState<boolean>(false);

  const {
    control,
    clearErrors,
    getValues,
    handleSubmit: submitLogin,
    formState: { errors, isValid, dirtyFields },
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

  const handleRememberMeClick = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const isChecked = event.target.checked;
    setRememberMe(isChecked);

    if (isChecked) {
      // Save email and password to localStorage
      const email = getValues("email") || "";
      const password = getValues("password") || "";
      localStorage.setItem("email", email);
      localStorage.setItem("password", password);
    } else {
      // Clear email and password from localStorage
      localStorage.removeItem("email");
      localStorage.removeItem("password");
    }
  };

  const handleLogin = async (formData: Partial<User>) => {
    if (rememberMe) {
      localStorage.setItem("email", formData.email || "");
      localStorage.setItem("password", formData.password || "");
    }
    try {
      await onSubmit(formData);
    } catch (error) {
      throw new Error(MESSAGES.LOGIN_FAILED);
    }
  };

  useEffect(() => {
    // Read from localStorage on component mount
    const savedEmail = localStorage.getItem("email") || "";
    const savedPassword = localStorage.getItem("password") || "";
    setRememberMe(!!savedEmail); // Check if email exists in localStorage
    reset({
      email: savedEmail,
      password: savedPassword,
    });
  }, [reset]);

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

      <Checkbox isChecked={rememberMe} onChange={handleRememberMeClick} />
      <Button
        variant="full"
        text="Login"
        mt="40px"
        mb="60px"
        isDisabled={isDisableSubmit}
        onClick={submitLogin(handleLogin)}
      />
    </Box>
  );
};

export default FormLogin;
