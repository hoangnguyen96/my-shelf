import { defineStyleConfig } from "@chakra-ui/react";

export const Button = defineStyleConfig({
  baseStyle: {
    fontWeight: "normal",
    borderRadius: "5px",
    color: "white",
    _hover: {
      _disabled: {
        bgColor: "brand.80",
      },
    },
  },

  sizes: {
    xs: {
      minW: "115px",
      fontsize: "xs",
      fontWeight: 500,
      lineHeight: "24px",
    },
    sm: {
      minW: "85px",
      h: "30px",
      fontSize: "md",
      fontWeight: 400,
      px: "12px",
      py: "6px",
    },
    md: {
      minW: "125px",
      h: "40px",
      fontSize: "md",
      fontWeight: 600,
      px: "16px",
      py: "10px",
    },
    lg: {
      minW: "125px",
      h: "48px",
      fontSize: "lg",
      fontWeight: 700,
    },
    xl: {
      h: "60px",
      fontSize: "xl",
      fontWeight: 600,
      minW: "200px",
      px: "12px",
      py: "6px",
    },
  },

  variants: {
    normal: {
      bgColor: "brand.80",
      _hover: { bgColor: "brand.70" },
    },
    outline: {
      color: "brand.70",
      borderColor: "brand.70",
    },
    full: {
      width: "100%",
      fontWeight: 600,
      bgColor: "brand.80",
      _hover: { bgColor: "brand.70" },
    },
  },
});
