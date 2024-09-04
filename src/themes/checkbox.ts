import { defineStyleConfig } from "@chakra-ui/react";

export const Checkbox = defineStyleConfig({
  baseStyle: {
    control: {
      _checked: {
        bg: "orange.400",
        borderColor: "orange.400",
        color: "white",
        _hover: {
          bg: "orange.500",
          borderColor: "orange.500",
        },
      },
    },
  },
});
