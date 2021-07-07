import { useField } from "formik";
import {
  FormControl,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
} from "@chakra-ui/react";

const RadioInput = ({ label, ...props }) => {
  const [field, meta, helpers] = useField(props);
  const { setValue } = helpers;

  return (
    <FormControl>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
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
