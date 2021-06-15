import { Center } from "@chakra-ui/layout";
import { Button, VStack } from "@chakra-ui/react";
import { InputField } from "../inputs";

const CommonInputs = ({ buttonName, children, ...rest }) => {
  return (
    <Center {...rest}>
      <VStack w="35%" spacing={6}>
        <InputField label="email" />
        <InputField label="password" />
        <Button w="100%" size="lg" fontSize="xl">
          {buttonName}
        </Button>
        {children}
      </VStack>
    </Center>
  );
};

export default CommonInputs;
