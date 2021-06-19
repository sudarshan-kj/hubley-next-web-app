import { Box, Flex, Stack, Button, Spacer } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Icon } from "@chakra-ui/icon";
import Logo from "-!svg-react-loader!../../assets/logo.svg";

const initScrollState = {
  bgColor: "transparent",
  color: "gray.500",
};

const GenericHeader = ({ component: Component }) => {
  const [styleOnScroll, setStyleOnScoll] = useState(initScrollState);
  const router = useRouter();

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
            <Link href="/login">
              <Button fontSize="xl" variant="ghost" color="black">
                Login
              </Button>
            </Link>
            <Link href="/signup">
              <Button fontSize="xl">Signup</Button>
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
