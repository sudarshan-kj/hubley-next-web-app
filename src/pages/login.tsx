import SideSection from "../components/entry/SideSection";
import CommonInputs from "../components/entry/CommonInputs";
import React from "react";
import { Flex } from "@chakra-ui/layout";
import { Text, Button, Box, VStack } from "@chakra-ui/react";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";

const Login = () => {
  const leftSectionWidthAndHeight = 35;
  function getDifference(input: number): number {
    return 100 - input;
  }

  return (
    <Flex direction={["column", "row"]} minH="80vh" h="100vh">
      <SideSection
        headingName="Login"
        w={["100%", `${leftSectionWidthAndHeight}%`]}
        h={["35%", "100%"]}
      />

      <CommonInputs
        buttonName="Login"
        w={["100%", `${getDifference(leftSectionWidthAndHeight)}%`]}
        h={["65%", "100%"]}
      >
        <Button
          leftIcon={<FcGoogle />}
          w="100%"
          size="lg"
          fontSize="calc(0.4vw + 0.9rem )"
          variant="outline"
        >
          Login with Google
        </Button>
        <Button
          leftIcon={<FaFacebook />}
          w="100%"
          size="lg"
          fontSize="calc(0.4vw + 0.9rem )"
          variant="outline"
        >
          Login with Facebook
        </Button>
        <Text fontSize="lg" fontWeight="bold" color="gray.500">
          Already have an account?{" "}
          <Link href="/signup">
            <a>
              <Box as="span" color="brand.500">
                Signup
              </Box>
            </a>
          </Link>
        </Text>
      </CommonInputs>
    </Flex>
  );
};

export default Login;
