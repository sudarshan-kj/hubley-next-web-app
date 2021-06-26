import { Center, Box, Heading, Text, Stack } from "@chakra-ui/layout";
import { Icon } from "@chakra-ui/icon";
import { AiFillHome as HomeIcon } from "react-icons/ai";
import { HStack, VStack } from "@chakra-ui/react";
import Link from "next/link";
const Logo = require("-!svg-react-loader!../../assets/logo.svg");
const LoginIllustration = require("-!svg-react-loader!../../assets/login-graphic.svg");
const SignupIllustration = require("-!svg-react-loader!../../assets/signup-graphic.svg");

const SideSection = ({ headingName, ...rest }) => {
  return (
    <>
      <Center {...rest} bgColor="brand.500" color="white">
        <VStack spacing={[4, 10]}>
          <HStack>
            <Icon as={Logo} boxSize={["60px", "100px"]} />
            <Heading size="2xl">{headingName}</Heading>
          </HStack>
          <Icon
            as={
              headingName === "Login" ? LoginIllustration : SignupIllustration
            }
            boxSize={["100px", "250px"]}
          />
        </VStack>
      </Center>
      <Box
        borderBottom={["0", "50vh solid transparent"]}
        borderTop={[
          "30px solid  var(--chakra-colors-brand-500)",
          "50vh solid transparent",
        ]}
        borderLeft={[
          "50vw solid transparent",
          "150px solid var(--chakra-colors-brand-500)",
        ]}
        borderRight={["50vw solid transparent", "0"]}
        height={0}
        width={0}
      />
      <Link href="/">
        <a>
          <Stack
            align="center"
            direction={["column", "row"]}
            pos="absolute"
            top={["4", "10"]}
            left={["4", "10"]}
          >
            <Icon as={HomeIcon} fill="white" boxSize={[4, 8]} />
            <Text color="white" fontSize={["12px", "md"]}>
              Go Home
            </Text>
          </Stack>
        </a>
      </Link>
    </>
  );
};

export default SideSection;
