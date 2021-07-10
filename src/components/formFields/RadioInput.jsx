import { useField } from "formik";
import {
  FormControl,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  Flex,
  Icon,
} from "@chakra-ui/react";

const RadioInput = ({ label, icon: InputIcon, ...props }) => {
  const [field, meta, helpers] = useField(props);
  const { setValue } = helpers;

  return (
    <FormControl>
      <Flex alignItems="center">
        <FormLabel htmlFor={field.name}>{label}</FormLabel>
        <Icon as={InputIcon} mb={2} />
      </Flex>
      <RadioGroup {...field} value={meta.value} onChange={(e) => setValue(e)}>
        <Stack spacing={8} direction="row">
          <Radio value="live">Live</Radio>
          <Radio value="onDemand">On Demand</Radio>
        </Stack>
      </RadioGroup>
    </FormControl>
  );
};

export default RadioInput;
