import { Box, Flex, Heading, Center, Button, HStack } from "@chakra-ui/react";
import { VStack } from "@chakra-ui/react";
import { withHeader } from "../utils/withHeader";
import Image from "next/image";
import { AddIcon, Search2Icon } from "@chakra-ui/icons";
import TextInputField from "../components/inputs/TextInputField";

const Home = () => (
  <Box px={20} py={20}>
    <VStack spacing={100}>
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
            src="/event-cards.png"
            height="500px"
            width="640px"
            layout="intrinsic"
          />
        </Center>
      </Flex>
      <Flex direction={["column", "row"]}>
        <Center>
          <Image
            alt="events"
            src="/event-platforms.png"
            height="465"
            width="900"
            layout="intrinsic"
          />
        </Center>
        <Center>
          <Heading fontSize="6xl">
            Find events across all major platforms.
          </Heading>
        </Center>
      </Flex>
      <Flex direction={["column", "row"]} bg="brand.500" width="100%">
        <Center>
          <TextInputField
            label="name"
            onChange={() => console.log("Value is being changed")}
            value="contact name"
          />
        </Center>
        <Center>
          <Heading fontSize="6xl">
            Find events across all major platforms.
          </Heading>
        </Center>
      </Flex>
    </VStack>
  </Box>
);

export default withHeader(Home);
