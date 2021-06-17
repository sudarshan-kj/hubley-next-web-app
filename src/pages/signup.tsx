import SideSection from "../components/entry/SideSection";
import CommonInputs from "../components/entry/CommonInputs";
import React from "react";
import Link from "next/link";
import { Box, Text, Flex } from "@chakra-ui/layout";

const Signup = () => {
  const leftSectionWidthAndHeight = 45;
  function getDifference(input: number): number {
    return 100 - input;
  }

  return (
    <Flex direction={["column", "row"]} minH="80vh" h="100vh">
      <SideSection
        headingName="Signup"
        w={["100%", `${leftSectionWidthAndHeight}%`]}
        h={["50%", "100%"]}
      />
      <CommonInputs
        buttonName="Signup"
        w={["100%", `${getDifference(leftSectionWidthAndHeight)}%`]}
        h={["50%", "100%"]}
      >
        <Text fontSize="lg" fontWeight="bold" color="gray.500">
          Already have an account?{" "}
          <Link href="/login">
            <a>
              <Box color="brand.500" display="inline">
                Login
              </Box>
            </a>
          </Link>
        </Text>
      </CommonInputs>
    </Flex>
  );
};

export default Signup;
