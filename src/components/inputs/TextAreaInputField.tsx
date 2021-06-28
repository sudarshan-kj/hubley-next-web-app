import { Textarea, VStack, Text } from "@chakra-ui/react";
import { FC } from "react";

interface TextInputFieldProps {
  label: string;
  onChange: (event: any) => void;
  value: string;
  labelProps?: any;
  textAreaBoxProps?: any;
  error?: string;
  [x: string]: any;
}

const TextInputField: FC<TextInputFieldProps> = ({
  label,
  onChange,
  value,
  error,
  labelProps,
  textAreaBoxProps,
  ...rest
}) => {
  return (
    <VStack w="100%" spacing={2} align="flex-start" mt={24} {...rest}>
      <Text fontWeight="extrabold" {...labelProps}>
        {label}
      </Text>
      <Textarea
        value={value}
        onChange={onChange}
        placeholder="Here is a sample placeholder"
        size="lg"
        {...textAreaBoxProps}
      />
      <Text fontWeight="extrabold" color="red.500">
        {error}
      </Text>
    </VStack>
  );
};

export default TextInputField;
