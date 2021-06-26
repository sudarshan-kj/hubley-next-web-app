import { Box, Flex, Stack, Button, Spacer } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Icon } from "@chakra-ui/icon";
import Logo from "-!svg-react-loader!../../assets/logo.svg";

const initScrollState = {
  bgColor: "transparent",
  color: "gray.700",
  loginColor: "black",
  signUpBgColor: "brand.500",
};

const GenericHeader = ({ component: Component }) => {
  const [styleOnScroll, setStyleOnScoll] = useState(initScrollState);

  useEffect(() => {
    function listenToScrollEvent() {
      if (window.scrollY > 50) {
        setStyleOnScoll({
          bgColor: "brand.500",
          color: "white",
          loginColor: "white",
          signUpBgColor: "brand.600",
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
            <Link href="/auth/login">
              <Button
                fontSize="xl"
                variant="ghost"
                color={styleOnScroll.loginColor}
                _hover={{}}
              >
                Login
              </Button>
            </Link>
            <Link href="/auth/signup">
              <Button fontSize="xl" bg={styleOnScroll.signUpBgColor}>
                Signup
              </Button>
            </Link>
          </Stack>
        </Flex>
      </Box>
      <Box p={4}>
        <Component />
      </Box>
    </>
  );
};

export default GenericHeader;
