"use client";

import { Button, ButtonProps } from "@chakra-ui/react";

type ButtonVariant = "normal" | "outline" | "full";
type ButtonSize = "xs" | "sm" | "md" | "lg" | "xl";

interface ButtonBaseProps extends ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  text?: string;
}

const ButtonBase = ({
  variant = "normal",
  size = "lg",
  text = "Submit",
  ...rest
}: ButtonBaseProps) => {
  return (
    <Button size={size} variant={variant} {...rest}>
      {text}
    </Button>
  );
};

export default ButtonBase;
