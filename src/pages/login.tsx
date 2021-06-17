import SideSection from "../components/entry/SideSection";
import CommonInputs from "../components/entry/CommonInputs";
import React from "react";
import { Flex } from "@chakra-ui/layout";
import { Text, Button, Box, VStack } from "@chakra-ui/react";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";

const Login = () => {
  const leftSectionWidthAndHeight = 45;
  function getDifference(input: number): number {
    return 100 - input;
  }

  return (
    <Flex direction={["column", "row"]} minH="80vh" h="100vh">
      <SideSection
        headingName="Login"
        w={["100%", `${leftSectionWidthAndHeight}%`]}
        h={["50%", "100%"]}
      />

      <CommonInputs
        buttonName="Login"
        w={["100%", `${getDifference(leftSectionWidthAndHeight)}%`]}
        h={["50%", "100%"]}
      >
        <Button
          leftIcon={<FcGoogle />}
          w="100%"
          size="lg"
          fontSize="xl"
          variant="outline"
        >
          Login with Google
        </Button>
        <Button
          leftIcon={<FaFacebook />}
          w="100%"
          size="lg"
          fontSize="xl"
          variant="outline"
        >
          Login with Facebook
        </Button>
        <Text fontSize="lg" fontWeight="bold" color="gray.500">
          Already have an account?{" "}
          <Link href="/signup">
            <a>
              <Box color="brand.500" display="inline">
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
