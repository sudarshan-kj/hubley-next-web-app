import {
  Input,
  InputGroup,
  InputRightElement,
  Button,
  VStack,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";

export const InputField = ({ label }) => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  return (
    <VStack w="100%" spacing={2} align="flex-start">
      <Text fontWeight="extrabold">{label}</Text>
      {label === "password" ? (
        <InputGroup size="md">
          <Input
            size="lg"
            type={show ? "text" : "password"}
            placeholder="Enter password"
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="md" variant="ghost" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      ) : (
        <Input type={label} size="lg" />
      )}
    </VStack>
  );
};
