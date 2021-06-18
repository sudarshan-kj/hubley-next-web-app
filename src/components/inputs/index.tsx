import {
  Input,
  InputGroup,
  InputRightElement,
  Button,
  VStack,
  Text,
  Flex,
  Box,
} from "@chakra-ui/react";
import { useState } from "react";
import {
  BsEyeFill as ShowPwdIcon,
  BsEyeSlashFill as HidePwdIcon,
} from "react-icons/bs";
import { Icon } from "@chakra-ui/icon";

export const InputFieldWithLabel = ({ label, onChange, value }) => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  return (
    <VStack w="100%" spacing={2} align="flex-start" mt={24}>
      {label === "password" ? (
        <>
          <Flex align="center" justify="space-between" w="100%">
            <Text fontWeight="extrabold">{label}</Text>
            <Button variant="ghost" tabIndex={-1}>
              forgot?
            </Button>
          </Flex>

          <InputGroup size="md">
            <Input
              size="lg"
              type={show ? "text" : "password"}
              value={value}
              onChange={onChange}
            />
            <InputRightElement width="4.5rem" mt="0.2rem">
              <Box onClick={handleClick} _hover={{ cursor: "pointer" }}>
                {show ? (
                  <Icon as={ShowPwdIcon} boxSize="16px" />
                ) : (
                  <Icon as={HidePwdIcon} boxSize="16px" />
                )}
              </Box>
            </InputRightElement>
          </InputGroup>
        </>
      ) : (
        <>
          <Text fontWeight="extrabold">{label}</Text>
          <Input type={label} size="lg" value={value} onChange={onChange} />
        </>
      )}
    </VStack>
  );
};
