import { MenuProfile } from "@app/components";
import { Logo, Navbar, SearchBar } from "@app/components/common";
import { DATA_USER } from "@app/mocks/data";
import { Box, Flex } from "@chakra-ui/react";
import "../../styles/globals.css";

const MainLayout = ({
  isNotSearch = false,
  isProfile = false,
  children,
}: {
  isNotSearch?: boolean;
  isProfile?: boolean;
  children: React.ReactNode;
}) => (
  <Box
    className="app"
    style={{
      padding: "48px 35px 38px",
      width: "98vw",
      height: isProfile ? "100%" : "97vh",
      minHeight: "100%",
    }}
  >
    <Flex bgColor="white" borderRadius="10px" height="100%">
      <Flex
        flexDir="column"
        gap="100px"
        padding="38px 66px"
        alignItems="center"
      >
        <Logo user={DATA_USER[0]} />
        <Navbar isAdmin={DATA_USER[0].isAdmin} />
      </Flex>
      <Box
        w="100%"
        h="100%"
        bgColor="backgroundContent"
        borderRightRadius="10px"
        pos="relative"
      >
        <Flex
          alignItems="center"
          justifyContent={!isNotSearch ? "space-between" : "flex-end"}
          p="32px 48px"
        >
          {!isNotSearch && <SearchBar />}
          <MenuProfile
            session={{
              user: {
                isAdmin: true,
                email: "admin@gmail.com",
                id: "3733403",
                name: "admin",
                image: "https://i.ibb.co/RHMqQGr/man-1.png",
              },
              expires: "2024-12-31T23:59:59.999Z",
            }}
          />
        </Flex>
        {children}
      </Box>
    </Flex>
  </Box>
);

export default MainLayout;
