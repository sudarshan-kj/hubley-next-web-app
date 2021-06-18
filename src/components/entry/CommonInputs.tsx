import { useState } from "react";
import { Center, Box, Button, VStack, Divider, Text } from "@chakra-ui/react";
import { InputFieldWithLabel } from "../inputs";
import { useAuth } from "../../utils/AuthProvider";

const CommonInputs = ({ buttonName, children, ...rest }) => {
  const { login, signup } = useAuth();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const hanleOnChangePassword = (event) => {
    setPassword(event.target.value);
  };
  const hanleOnChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  return (
    <Center {...rest}>
      <VStack w={["90%", "35%"]} mx={10} py={10} spacing={6}>
        <InputFieldWithLabel
          label="email"
          onChange={hanleOnChangeEmail}
          value={email}
        />
        <InputFieldWithLabel
          label="password"
          onChange={hanleOnChangePassword}
          value={password}
        />
        <Button
          w="100%"
          size="lg"
          fontSize="xl"
          isLoading={false}
          onClick={() =>
            buttonName === "Login"
              ? login(email, password)
              : signup(email, password)
          }
        >
          {buttonName}
        </Button>
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
