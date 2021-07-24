import {
  Box,
  Flex,
  Stack,
  Button,
  Spacer,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import Link from "next/link";
import { Icon } from "@chakra-ui/icon";
const Logo = require("-!svg-react-loader!assets/logo.svg");
import { useAuth } from "utils/AuthProvider";
import { useRouter } from "next/router";

const initScrollState = {
  bgColor: "transparent",
  color: "gray.500",
};

const WithAuthHeader = ({ component: Component, ...rest }) => {
  const [styleOnScroll, setStyleOnScoll] = useState(initScrollState);
  const { currentUser, logout } = useAuth();
  const router = useRouter();
  const toast = useToast();

  async function handleLogout() {
    try {
      await logout();
      router.push("/");
      toast({
        title: "Successfully logged out",
        description: "We will see you soon.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (e) {
      toast({
        title: "Error while logging out",
        description: "Something went wrong while logging out.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  }

  React.useEffect(() => {
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

  React.useEffect(() => {
    if (!currentUser) router.push("/auth/login");
  }, [currentUser]);

  if (!currentUser) {
    return (
      <Box color="brand.500" fontWeight="bold" p={10}>
        Please Wait...
      </Box>
    );
  }

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
        zIndex={100}
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
            <Text>Logged in as {currentUser && currentUser.displayName}</Text>
            <Button fontSize="xl" onClick={handleLogout}>
              Logout
            </Button>
          </Stack>
        </Flex>
      </Box>
      {/* The component passed is rendered here, beneath the header component */}
      <Box>
        <Component {...rest} />
      </Box>
    </>
  );
};

export default WithAuthHeader;
