import { Center, Box, Heading, Text, Stack } from "@chakra-ui/layout";
import { Icon } from "@chakra-ui/icon";
import { AiFillHome as HomeIcon } from "react-icons/ai";
import Logo from "-!svg-react-loader!../../assets/logo.svg";
import LoginIllustration from "-!svg-react-loader!../../assets/login-graphic.svg";
import SignupIllustration from "-!svg-react-loader!../../assets/signup-graphic.svg";
import { HStack, VStack } from "@chakra-ui/react";
import Link from "next/link";

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
        borderBottom="50vh solid transparent"
        borderTop="50vh solid transparent"
        borderLeft="150px solid var(--chakra-colors-brand-500)"
        height={0}
        transform={["rotate(90deg)", "rotate(0deg)"]}
      />
      <Link href="/">
        <a>
          <Stack
            align="center"
            direction="row"
            pos="absolute"
            top="10"
            left="10"
          >
            <Icon as={HomeIcon} fill="white" boxSize={8} />
            <Text color="white">Go Home</Text>
          </Stack>
        </a>
      </Link>
    </>
  );
};

export default SideSection;
