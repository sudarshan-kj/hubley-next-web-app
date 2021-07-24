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
import TextInputField from "components/inputs/TextInputField";
import PasswordInputField from "components/inputs/PasswordInputField";
import { useAuth } from "utils/AuthProvider";

interface InputField {
  value: string;
  error: string;
}

const CommonInputsSection = ({ buttonName, children, ...rest }) => {
  const inputFor = buttonName.toLowerCase();
  const { login, signup, resetPassword } = useAuth();
  const [email, setEmail] = useState<InputField>({ value: "", error: "" });
  const [password, setPassword] = useState<InputField>({
    value: "",
    error: "",
  });
  const [name, setName] = useState<InputField>({
    value: "",
    error: "",
  });
  const [buttonLoading, setButtonLoading] = useState(false);
  const toast = useToast();

  const handleOnChangePassword = (event) => {
    setPassword({ value: event.target.value, error: "" });
    setEmail({ ...email, error: "" });
  };
  const handleOnChangeEmail = (event) => {
    setEmail({ value: event.target.value, error: "" });
    setPassword({ ...password, error: "" });
  };

  const handleOnChangeName = (event) => {
    if (event.target.value.length > 30) {
      setName((prev) => {
        return { ...prev, error: "Name cannot exceed 30 characters" };
      });
    } else setName({ value: event.target.value, error: "" });
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
    if (buttonName === "Signup" && name.value.length === 0) {
      setName((prev) => {
        return { ...prev, error: "Please enter name" };
      });
      return;
    }
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
        await signup(name.value, email.value, password.value);
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
            {buttonName === "Signup" && (
              <TextInputField
                label="name"
                onChange={handleOnChangeName}
                value={name.value}
                error={name.error}
              />
            )}

            <TextInputField
              label="email"
              onChange={handleOnChangeEmail}
              value={email.value}
              error={email.error}
            />
            <PasswordInputField
              label="password"
              onChange={handleOnChangePassword}
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

export default CommonInputsSection;
