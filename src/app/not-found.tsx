import Link from "next/link";
import { Heading, Text, Flex } from "@chakra-ui/react";

// Constants
import { ROUTES } from "@app/constants";
import { Button } from "@app/components/common";

const NotFound = () => (
  <Flex
    flexDir="column"
    alignItems="center"
    justifyContent="center"
    gap={5}
    mt={230}
  >
    <Heading>Not Found</Heading>
    <Text>Could not find requested resource</Text>
    <Link href={ROUTES.HOME} style={{ textAlign: "center" }}>
      <Button colorScheme="brand" text="Return Home" />
    </Link>
  </Flex>
);

export default NotFound;
