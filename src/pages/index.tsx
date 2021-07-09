import {
  Box,
  Flex,
  Heading,
  Center,
  Button,
  HStack,
  Text,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { VStack } from "@chakra-ui/react";
import { withHeader } from "utils/withHeader";
import Image from "next/image";
import { AddIcon, Search2Icon } from "@chakra-ui/icons";
import ContactUs from "components/contactUs";
import Link from "next/link";
import { useRouter } from "next/router";
const Logo = require("-!svg-react-loader!../assets/logo.svg");
const InstagramIcon = require("-!svg-react-loader!../assets/instaicon.svg");
const FacebookIcon = require("-!svg-react-loader!../assets/fbicon.svg");
const TwitterIcon = require("-!svg-react-loader!../assets/twittericon.svg");

const socialLinks = {
  twitter: "https://twitter.com",
  instagram: "https://instagram.com",
  facebook: "https://facebook.com",
};

const Home = () => {
  const router = useRouter();
  return (
    <Box>
      <VStack spacing={100}>
        <Flex px={20} direction={["column", "row"]}>
          <Center flex="3" flexDirection="column">
            <VStack spacing="10">
              <Heading fontSize={["3xl", "6xl"]}>
                Hubley. Leading Virtual Events Manager.
              </Heading>
              <HStack alignSelf="flex-start" spacing={6}>
                <Button
                  leftIcon={<AddIcon boxSize="4" />}
                  size="lg"
                  fontSize={["xl", "2xl"]}
                  onClick={() => router.push("events/create")}
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
              alt="event-cards"
              src="/event-cards.png"
              height="500px"
              width="640px"
              layout="intrinsic"
            />
          </Center>
        </Flex>
        <Flex px={20} direction={["column", "row"]}>
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
        <Flex
          direction={["column", "row"]}
          bg="brand.500"
          width="100%"
          justify="space-evenly"
        >
          <Center py="14">
            <ContactUs />
          </Center>
          <Flex direction="column" justify="space-evenly">
            <VStack spacing={6}>
              <Logo />
              <Link href="/terms-and-conditions">
                <a>
                  <Box as="span" color="white" fontWeight="bold">
                    Terms and Conditions
                  </Box>
                </a>
              </Link>
              <Link href="/privacy-policy">
                <a>
                  <Box as="span" color="white" fontWeight="bold">
                    Privacy Policy
                  </Box>
                </a>
              </Link>
            </VStack>
            <VStack spacing={4}>
              <Text fontSize="xl" color="white">
                Follow Us
              </Text>
              <HStack spacing={10}>
                <ChakraLink href={socialLinks.instagram} isExternal>
                  <InstagramIcon />
                </ChakraLink>
                <ChakraLink href={socialLinks.facebook} isExternal>
                  <FacebookIcon />
                </ChakraLink>
                <ChakraLink href={socialLinks.twitter} isExternal>
                  <TwitterIcon />
                </ChakraLink>
              </HStack>
            </VStack>
          </Flex>
        </Flex>
      </VStack>
    </Box>
  );
};

export default withHeader(Home);
