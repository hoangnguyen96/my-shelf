import { Flex } from "@chakra-ui/react";
import AccountMenu from "@app/app/ui/menu";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Flex alignItems="center" justifyContent="flex-end" p="32px 48px">
        <AccountMenu />
      </Flex>
      {children}
    </>
  );
};

export default Layout;
