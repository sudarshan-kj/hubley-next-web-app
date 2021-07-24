import { Center } from "@chakra-ui/layout";
import { Button, Heading, VStack } from "@chakra-ui/react";
import { useAuth } from "../utils/AuthProvider";

const VerifyEmail = () => {
  const { sendEmailVerification } = useAuth();
  return (
    <Center h="80vh">
      <VStack spacing={12}>
        <Heading>Verify your email to proceed</Heading>
        <Button onClick={() => sendEmailVerification()}>
          Click here to send verification email again
        </Button>
      </VStack>
    </Center>
  );
};

export default VerifyEmail;
