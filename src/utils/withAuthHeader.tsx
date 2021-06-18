import { Box, Flex, Stack, Button, Spacer, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Icon } from "@chakra-ui/icon";
import Logo from "-!svg-react-loader!../assets/logo.svg";
import { useAuth } from "./AuthProvider";

const initScrollState = {
  bgColor: "transparent",
  color: "gray.500",
};

const withAuthHeader = (Component) => () => {
  const [styleOnScroll, setStyleOnScoll] = useState(initScrollState);
  const { currentUser, logout } = useAuth();

  useEffect(() => {
    function listenToScrollEvent() {
      if (window.scrollY > 50) {
        setStyleOnScoll({
          bgColor: "brand.500",
          color: "white",
        });
        return;
      }
      setStyleOnScoll(initScrollState);
    }

    window.addEventListener("scroll", listenToScrollEvent);
    return () => window.removeEventListener("scroll", listenToScrollEvent);
  });

  return (
    <>
      <Box
        w="100%"
        pos="sticky"
        top={0}
        right={0}
        left={0}
        bg={styleOnScroll.bgColor}
        transition="0.5s all"
        px={10}
        py={6}
      >
        <Flex>
          <Stack
            direction={["column", "row"]}
            spacing="46px"
            fontSize="xl"
            color={styleOnScroll.color}
            align="center"
          >
            <Icon as={Logo} boxSize={16} />
            <Link href="/">Home</Link>
            <Link href="/guides">Guides</Link>
            <Link href="/events">Events</Link>
          </Stack>
          <Spacer />
          <Stack direction={["column", "row"]} spacing="24px" align="center">
            <Text>Logged in as {currentUser && currentUser.name}</Text>
            <Button fontSize="xl" onClick={() => logout()}>
              Logout
            </Button>
          </Stack>
        </Flex>
      </Box>
      <Box p={4}>
        <Component />
      </Box>
    </>
  );
};

export default withAuthHeader;
