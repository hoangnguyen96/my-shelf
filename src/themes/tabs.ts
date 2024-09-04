import { defineStyleConfig } from "@chakra-ui/react";

export const Tabs = defineStyleConfig({
  baseStyle: {
    tab: {
      border: "none",
      borderBottom: "none",
      _selected: {
        bg: "transparent",
        color: "dark.90",
        borderColor: "none",
      },
    },
    tablist: {
      border: "none",
    },
    tabpanel: {
      border: "none",
    },
  },
});
