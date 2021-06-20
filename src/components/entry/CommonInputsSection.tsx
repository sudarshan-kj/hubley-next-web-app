import { useState } from "react";
import {
  Center,
  Box,
  Button,
  VStack,
  Divider,
  Text,
  useToast,
} from "@chakra-ui/react";
import InputFieldWithLabel from "../inputs/InputFieldWithLabel";
import { useAuth } from "../../utils/AuthProvider";
import { useRouter } from "next/router";

interface InputField {
  value: string;
  error: string;
}

const CommonInputs = ({ buttonName, children, ...rest }) => {
  const inputFor = buttonName.toLowerCase();
  const { login, signup, resetPassword } = useAuth();
  const [email, setEmail] = useState<InputField>({ value: "", error: "" });
  const [password, setPassword] = useState<InputField>({
    value: "",
    error: "",
  });
  const [buttonLoading, setButtonLoading] = useState(false);
  const toast = useToast();
  const router = useRouter();

  const hanleOnChangePassword = (event) => {
    setPassword({ value: event.target.value, error: "" });
    setEmail({ ...email, error: "" });
  };
  const hanleOnChangeEmail = (event) => {
    setEmail({ value: event.target.value, error: "" });
    setPassword({ ...password, error: "" });
  };

  const handleForgotPassword = async () => {
    try {
      await resetPassword(email.value);
      toast({
        title: "Password Reset email sent",
        description:
          "You will recieve an email if an account has been registered with us.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (e) {
      switch (e.code) {
        //we send the same response as success to the user so that a user's presence is not exposed
        case "auth/user-not-found":
        case "auth/invalid-email":
          toast({
            title: "Password Reset email sent",
            description:
              "You will recieve an email if an account has been registered with us.",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
          break;
      }
    }
  };

  const handleSubmitButton = async (e) => {
    e.preventDefault();
    setPassword({ ...password, error: "" });
    setEmail({ ...email, error: "" });
    if (inputFor === "login") {
      try {
        setButtonLoading(true);
        await login(email.value, password.value);
      } catch (e) {
        switch (e.code) {
          case "auth/wrong-password":
          case "auth/user-not-found":
          case "auth/invalid-email":
            setPassword({
              ...password,
              error: "Invalid email/password combination",
            });
            break;
          case "auth/user-disabled":
            setEmail({ ...email, error: e.message });
            break;
        }
      } finally {
        setButtonLoading(false);
      }
    } else if (inputFor === "signup") {
      try {
        setButtonLoading(true);
        await signup(email.value, password.value);
      } catch (e) {
        switch (e.code) {
          case "auth/weak-password":
            setPassword({ ...password, error: e.message });
            break;
          case "auth/email-already-in-use":
          case "auth/invalid-email":
          case "auth/operation-not-allowed":
            setEmail({ ...email, error: e.message });
            break;
        }
      } finally {
        setButtonLoading(false);
      }
    } else {
      console.error("Error: UNKNOWN ACTION");
    }
  };

  return (
    <Center {...rest}>
      <VStack w={["90%", "330px"]} mx={10} py={10} spacing={6}>
        <form style={{ width: "100%" }} onSubmit={handleSubmitButton}>
          <VStack spacing={6}>
            <InputFieldWithLabel
              label="email"
              onChange={hanleOnChangeEmail}
              value={email.value}
              error={email.error}
            />
            <InputFieldWithLabel
              label="password"
              onChange={hanleOnChangePassword}
              value={password.value}
              error={password.error}
              showForgotPassword={inputFor === "login"}
              handleForgotPassword={handleForgotPassword}
            />
            <Button
              w="100%"
              type="submit"
              size="lg"
              fontSize="xl"
              isLoading={buttonLoading}
            >
              {buttonName}
            </Button>
          </VStack>
        </form>
        <Box py={3} w="100%" position="relative">
          <Divider />
          <Text
            display="inline"
            pos="absolute"
            bottom="0px"
            background="white"
            px={8}
            transform="translateX(-50%)"
            left="50%"
          >
            or
          </Text>
        </Box>
        {children}
      </VStack>
    </Center>
  );
};

export default CommonInputs;
