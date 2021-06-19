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
import { FC } from "react";

interface InputFieldProps {
  label: string;
  onChange: (event: any) => void;
  value: string;
  error?: string;
  showForgotPassword?: boolean;
  handleForgotPassword?: (event: React.MouseEvent<HTMLElement>) => void;
}

const InputFieldWithLabel: FC<InputFieldProps> = ({
  label,
  onChange,
  value,
  error,
  showForgotPassword,
  handleForgotPassword,
}) => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  return (
    <VStack w="100%" spacing={2} align="flex-start" mt={24}>
      {label === "password" ? (
        <>
          <Flex align="center" justify="space-between" w="100%">
            <Text fontWeight="extrabold">{label}</Text>
            {showForgotPassword && (
              <Button
                variant="ghost"
                tabIndex={-1}
                onClick={handleForgotPassword}
              >
                forgot?
              </Button>
            )}
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
          <Text fontWeight="extrabold" color="red.500">
            {error}
          </Text>
        </>
      ) : (
        <>
          <Text fontWeight="extrabold">{label}</Text>
          <Input type={label} size="lg" value={value} onChange={onChange} />
          <Text fontWeight="extrabold" color="red.500">
            {error}
          </Text>
        </>
      )}
    </VStack>
  );
};

export default InputFieldWithLabel;
