import { defineStyleConfig } from "@chakra-ui/react";

export const Text = defineStyleConfig({
  baseStyle: {
    color: "dark.90",
  },

  sizes: {
    xs: {
      fontSize: "xs",
      lineHeight: 10,
    },
    sm: {
      fontSize: "sm",
      lineHeight: 12,
    },
    md: {
      fontSize: "md",
      lineHeight: 16,
    },
    lg: {
      fontSize: "lg",
      lineHeight: 18,
    },
    xl: {
      fontSize: "xl",
      lineHeight: 24,
      fontWeight: 400,
    },
    xxl: {
      fontSize: "xxl",
      lineHeight: 26,
      fontWeight: 700,
    },
    xxxl: {
      fontSize: "xxxl",
      lineHeight: 36,
      fontWeight: 400,
    },
  },

  defaultProps: {
    size: "lg",
  },
});
