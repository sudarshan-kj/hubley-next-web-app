import { useField } from "formik";
import { FormControl, FormLabel, Switch } from "@chakra-ui/react";

const SwitchInput = ({ label, ...props }) => {
  const [field] = useField(props);
  return (
    <FormControl display="flex" alignItems="center">
      <FormLabel htmlFor="tenantResiding" mb="0">
        {label}
      </FormLabel>
      <Switch {...field} {...props} />
    </FormControl>
  );
};

export default SwitchInput;
