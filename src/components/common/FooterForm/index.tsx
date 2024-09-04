import { Box, StyleProps, Text } from "@chakra-ui/react";
import Link from "next/link";

interface FooterFormProps extends StyleProps {
  text: string;
  link: string;
  textLink: string;
}
const FooterForm = ({ text, link, textLink, ...rest }: FooterFormProps) => (
  <Box pb="160px" {...rest}>
    <Text as="span">
      {text}{" "}
      <Link href={link} style={{ textDecoration: "underline" }}>
        {textLink}
      </Link>
    </Text>
  </Box>
);

export default FooterForm;
