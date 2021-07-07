import { useField } from "formik";
import { FormControl, Select, Icon, FormErrorMessage } from "@chakra-ui/react";
import { MdArrowDropDown } from "react-icons/md";

const SelectInput = ({ label, children, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <FormControl isInvalid={meta.touched && meta.error}>
      <Select
        {...field}
        {...props}
        icon={<Icon as={MdArrowDropDown} />}
        color="brand.500"
        fontWeight="extrabold"
      >
        {children}
      </Select>
      <FormErrorMessage>{meta.error}</FormErrorMessage>
    </FormControl>
  );
};

export default SelectInput;
