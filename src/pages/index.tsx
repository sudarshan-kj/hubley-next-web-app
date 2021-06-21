import { Box, Flex, Heading, Center, Button, HStack } from "@chakra-ui/react";
import { VStack } from "@chakra-ui/react";
import { withHeader } from "../utils/withHeader";
import Image from "next/image";
import { AddIcon, Search2Icon } from "@chakra-ui/icons";

const Home = () => (
  <Box px={20} py={20}>
    <VStack>
      <Flex direction={["column", "row"]}>
        <Center flex="3" flexDirection="column">
          <VStack spacing="10">
            <Heading fontSize="6xl">
              Hubley. Leading Virtual Events Manager.
            </Heading>
            <HStack alignSelf="flex-start" spacing={6}>
              <Button
                leftIcon={<AddIcon boxSize="4" />}
                size="lg"
                fontSize="2xl"
              >
                Create Event
              </Button>
              <Button
                leftIcon={<Search2Icon boxSize="4" />}
                size="lg"
                fontSize="2xl"
                variant="outline"
              >
                Browse Events
              </Button>
            </HStack>
          </VStack>
        </Center>
        <Center flex="4">
          <Image
            alt="Mountains"
            src="/test.png"
            height="500px"
            width="640px"
            layout="intrinsic"
          />
        </Center>
      </Flex>
    </VStack>
  </Box>
);

export default withHeader(Home);
