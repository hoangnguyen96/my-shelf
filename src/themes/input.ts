import { defineStyleConfig } from "@chakra-ui/react";

export const Input = defineStyleConfig({
  baseStyle: {
    field: {
      color: "dark.90",
      fontSize: "lg",
      lineHeight: 18,
      height: "56px",
      borderRadius: "8px",
      border: "1px solid",
      _placeholder: {
        color: "dark.60",
      },
      _invalid: {
        borderColor: "red.500",
      },
    },
  },

  variants: {
    default: {
      field: {
        borderColor: "borderDefault",
      },
      _focus: {
        borderColor: "brand.90",
      },
    },
  },

  defaultProps: {
    variant: "default",
  },
});
