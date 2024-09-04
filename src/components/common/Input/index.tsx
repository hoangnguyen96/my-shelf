"use client";

import { forwardRef, useCallback, useMemo, useState } from "react";
import {
  Input,
  InputGroup,
  InputRightElement,
  IconButton,
  InputProps,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

// Constants
import { PASSWORD } from "@app/constants";

type InputType = "text" | "password" | "number" | "file";

interface InputBaseProps extends InputProps {
  isTypePassword?: boolean;
  type?: InputType;
}

const InputBase = forwardRef<HTMLDivElement, InputBaseProps>(
  (
    {
      type = "text",
      width = "100%",
      isTypePassword = false,
      ...rest
    }: InputBaseProps,
    ref
  ) => {
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const handleToggleShowPassword = () => {
      setShowPassword((prevState) => !prevState);
    };

    const typeInput = useMemo(
      () => (isTypePassword ? (showPassword ? "text" : "password") : type),
      [isTypePassword, showPassword, type]
    );

    const textShowPassword = useMemo(
      () => (showPassword ? PASSWORD.HIDE : PASSWORD.SHOW),
      [showPassword]
    );

    const iconShowPassword = useCallback(
      () =>
        showPassword ? (
          <ViewIcon w="20px" h="17px" />
        ) : (
          <ViewOffIcon w="20px" h="17px" />
        ),
      [showPassword]
    );

    return (
      <InputGroup size="md" w={width}>
        <Input ref={ref} pr="16px" type={typeInput} {...rest} />
        {isTypePassword && (
          <InputRightElement width="4.5rem">
            <IconButton
              size="sm"
              color="viewIcon"
              bgColor="transparent"
              onClick={handleToggleShowPassword}
              icon={iconShowPassword()}
              aria-label={textShowPassword}
              _focusVisible="none"
              _hover={{ bgColor: "transparent" }}
            />
          </InputRightElement>
        )}
      </InputGroup>
    );
  }
);

export default InputBase;
