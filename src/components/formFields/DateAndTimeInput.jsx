import { useState, forwardRef } from "react";
import { useField } from "formik";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Button,
} from "@chakra-ui/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DateAndTimeInput = ({ label, ...props }) => {
  const [field, meta, helpers] = useField(props);
  const { setValue } = helpers;
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);

  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
    <Button variant="outline" onClick={onClick} ref={ref}>
      {value}
    </Button>
  ));
  return (
    <FormControl isInvalid={meta.touched && meta.error}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      <DatePicker
        minDate={new Date()}
        selected={startDate}
        onChange={onChange}
        startDate={startDate}
        endDate={endDate}
        selectsRange
        customInput={<ExampleCustomInput />}
        withPortal
      />
      <FormErrorMessage>{meta.error}</FormErrorMessage>
    </FormControl>
  );
};

export default DateAndTimeInput;
