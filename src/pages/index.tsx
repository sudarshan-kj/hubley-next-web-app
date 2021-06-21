import { Box, Flex, Heading } from "@chakra-ui/react";
import { VStack } from "@chakra-ui/react";
import { withHeader } from "../utils/withHeader";
import Image from "next/image";

const Home = () => (
  <Box>
    <VStack>
      <Flex direction="column">
        <Heading>Hello!</Heading>
        <Heading>I am sitting here</Heading>
        <Image
          alt="Mountains"
          src="/test.png"
          height="500px"
          width="640px"
          layout="intrinsic"
        />
      </Flex>
    </VStack>
  </Box>
);

export default withHeader(Home);
