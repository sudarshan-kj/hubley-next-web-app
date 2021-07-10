import { useState, forwardRef } from "react";
import DatePicker from "react-datepicker";
import { Button } from "@chakra-ui/button";
import "react-datepicker/dist/react-datepicker.css";

export default function DateTime({ id, date, onChange, slotNumber }) {
  const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
    <Button variant="outline" onClick={onClick} ref={ref}>
      {value}
    </Button>
  ));

  return (
    <DatePicker
      dateFormat="dd-MMM-yyyy , hh:mm a"
      selected={date}
      minDate={new Date()}
      showTime={{ user12hours: true }}
      onChange={(e) => onChange(e, id, slotNumber)}
      showTimeSelect
      customInput={<ExampleCustomInput />}
    />
  );
}
