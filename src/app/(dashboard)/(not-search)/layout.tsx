import { Flex } from "@chakra-ui/react";
import { MenuProfile } from "@app/components/common";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Flex alignItems="center" justifyContent="flex-end" p="32px 48px">
        <MenuProfile />
      </Flex>
      {children}
    </>
  );
};

export default Layout;
