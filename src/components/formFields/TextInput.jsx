import { useField } from "formik";
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Icon,
  Flex,
} from "@chakra-ui/react";

const TextInput = ({ label, icon: InputIcon, isRequired, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <FormControl isRequired={isRequired} isInvalid={meta.error && meta.touched}>
      <Flex alignItems="center">
        <FormLabel htmlFor={field.name}>{label}</FormLabel>
        <Icon as={InputIcon} mb={2} />
      </Flex>

      <Input {...field} {...props} />
      <FormErrorMessage>{meta.error}</FormErrorMessage>
    </FormControl>
  );
};

export default TextInput;
