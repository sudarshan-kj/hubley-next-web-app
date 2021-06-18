import { Text, Center, Heading } from "@chakra-ui/layout";
import { Icon } from "@chakra-ui/icon";
import Logo from "-!svg-react-loader!../../assets/logo.svg";
import LoginIllustration from "-!svg-react-loader!../../assets/login-graphic.svg";
import SignupIllustration from "-!svg-react-loader!../../assets/signup-graphic.svg";
import { HStack, VStack } from "@chakra-ui/react";

const SideSection = ({ headingName, ...rest }) => {
  return (
    <Center {...rest} bgColor="brand.500" color="white">
      <VStack spacing={[4, 10]}>
        <HStack>
          <Icon as={Logo} boxSize={["60px", "100px"]} />
          <Heading size="2xl">{headingName}</Heading>
        </HStack>
        <Icon
          as={headingName === "Login" ? LoginIllustration : SignupIllustration}
          boxSize={["100px", "250px"]}
        />
      </VStack>
    </Center>
  );
};

export default SideSection;
