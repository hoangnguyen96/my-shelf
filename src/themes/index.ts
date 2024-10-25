import { extendTheme } from "@chakra-ui/react";
import { colors } from "./colors";
import { spacing } from "./spacing";
import { Button } from "./button";
import { Text } from "./text";
import { Input } from "./input";
import { Checkbox } from "./checkbox";
import { fonts, fontSizes, lineHeights, radius } from "./typography";
import { Tabs } from "./tabs";

const config = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

export const theme = extendTheme({
  config,
  colors,
  spacing,
  fonts,
  fontSizes,
  lineHeights,
  radius,
  components: {
    Button,
    Text,
    Input,
    Checkbox,
    Tabs,
  },
});

export default theme;
