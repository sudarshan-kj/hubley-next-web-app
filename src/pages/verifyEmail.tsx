import { Center } from "@chakra-ui/layout";
import {
  Button,
  Heading,
  useToast,
  VStack,
  Text,
  useStyleConfig,
} from "@chakra-ui/react";
import router from "next/router";
import { CheckIcon } from "@chakra-ui/icons";
import { withHeader } from "utils/withHeader";

import { useAuth } from "../utils/AuthProvider";
import { useState, useEffect } from "react";

const VerifyEmail = () => {
  const { currentUser, sendEmailVerification } = useAuth();
  const [verified, setVerified] = useState(false);
  const toast = useToast();

  useEffect(() => {
    const interval = setInterval(() => {
      console.log("Running interval now...");
      setVerified(currentUser.emailVerified);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  function handleSendVerificationClick() {
    sendEmailVerification({ url: "http://localhost:3000" });
    toast({
      title: "Verification email sent",
      description: "Please check your account",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  }

  function handleHaveVerifiedClick() {
    window.location.reload();
  }

  return (
    <Center h="80vh">
      <VStack spacing={12}>
        <Heading>Verify your email to proceed</Heading>
        <Text>Didn't receive a verification email?</Text>
        <Button onClick={handleSendVerificationClick}>
          Send Verification again
        </Button>
        <Button
          leftIcon={<CheckIcon />}
          colorScheme="green"
          onClick={handleHaveVerifiedClick}
        >
          {verified ? "Proceed" : "Verify"}
        </Button>
      </VStack>
    </Center>
  );
};

export default withHeader(VerifyEmail);
