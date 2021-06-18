import { useState } from "react";
import { Center } from "@chakra-ui/layout";
import { Button, VStack } from "@chakra-ui/react";
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
          isLoading={true}
          onClick={() =>
            buttonName === "Login"
              ? login(email, password)
              : signup(email, password)
          }
        >
          {buttonName}
        </Button>
        {children}
      </VStack>
    </Center>
  );
};

export default CommonInputs;
