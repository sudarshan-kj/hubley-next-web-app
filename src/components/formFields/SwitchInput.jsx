import { useField } from "formik";
import { FormControl, FormLabel, Switch, Text } from "@chakra-ui/react";

const SwitchInput = ({ label, ...props }) => {
  const [field] = useField({ ...props, type: "checkbox" });
  function getValue() {
    if (field.checked) return "Yes";
    return "No";
  }
  return (
    <FormControl alignItems="center">
      <FormLabel htmlFor="tenantResiding" mb="0">
        {label}{" "}
        <Text color="gray.500" display="inline">
          {getValue()}
        </Text>
      </FormLabel>
      <Switch {...field} mt={4} {...props} isChecked={field.checked} />
    </FormControl>
  );
};

export default SwitchInput;
