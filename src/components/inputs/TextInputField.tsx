import { Input, VStack, Text } from "@chakra-ui/react";
import { FC } from "react";

interface TextInputFieldProps {
  label: string;
  onChange: (event: any) => void;
  value: string;
  error?: string;
}

const TextInputField: FC<TextInputFieldProps> = ({
  label,
  onChange,
  value,
  error,
}) => {
  return (
    <VStack w="100%" spacing={2} align="flex-start" mt={24}>
      <Text fontWeight="extrabold">{label}</Text>
      <Input type={label} size="lg" value={value} onChange={onChange} />
      <Text fontWeight="extrabold" color="red.500">
        {error}
      </Text>
    </VStack>
  );
};

export default TextInputField;
