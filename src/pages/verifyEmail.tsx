import { Center } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/react";
import { useAuth } from "../utils/AuthProvider";

const VerifyEmail = () => {
  const { sendEmailVerification } = useAuth();
  return (
    <Center h="80vh">
      <Button onClick={() => sendEmailVerification()}>
        Click here to verify your email
      </Button>
    </Center>
  );
};

export default VerifyEmail;
