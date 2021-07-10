import { useField } from "formik";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  IconButton,
  HStack,
  VStack,
  Text,
  InputLeftElement,
} from "@chakra-ui/react";
import DateTime from "components/date/datetime";
import { useState } from "react";
import { DeleteIcon, AddIcon } from "@chakra-ui/icons";
import { useEffect } from "react";

const DateAndTimeInput = ({ label, ...props }) => {
  const [field, meta, helpers] = useField(props);
  const { setValue } = helpers;
  const [dateList, setDateList] = useState({
    data: [{ id: 1, type: DateTime, value: new Date() }],
  });

  useEffect(() => {
    setValue(dateList);
  }, [dateList]);

  function onDateChange(e, id, slotNumber) {
    const found = dateList.data.find((item) => item.id === id);
    found.value = e;
    setDateList((prev) => {
      const newDateList = { ...prev };
      newDateList.data[slotNumber] = found;
      return newDateList;
    });
  }

  const withSlotNumberAndDelete = (Component, index, id) => (props) =>
    (
      <HStack align="center">
        <Text fontWeight="bold" color="gray.500">
          Slot {index + 1}
        </Text>
        <Component {...props} />
        {index > 0 && (
          <IconButton
            colorScheme="red"
            mx={2}
            borderRadius="full"
            onClick={() =>
              setDateList((prev) => {
                const filtered = prev.data.filter((item) => item.id !== id);
                const newList = { data: filtered };
                return newList;
              })
            }
            size="sm"
            icon={<DeleteIcon />}
          />
        )}
      </HStack>
    );

  return (
    <FormControl isInvalid={meta.touched && meta.error}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      <VStack align="flex-start">
        {dateList.data.map((Item, index) => {
          const ItemWithDelete = withSlotNumberAndDelete(
            Item.type,
            index,
            Item.id
          );
          return (
            <ItemWithDelete
              key={Item.id}
              id={Item.id}
              date={Item.value}
              onChange={onDateChange}
              slotNumber={index}
            />
          );
        })}
        <IconButton
          borderRadius="full"
          isDisabled={dateList.data.length >= 3}
          onClick={() =>
            setDateList((prev) => {
              let newDateList = { ...prev };
              const date = new Date();
              date.setDate(date.getDate() + prev.data.length);
              newDateList.data.push({
                id: Math.floor(Math.random() * 10000),
                type: DateTime,
                value: date,
              });
              console.log("New data list is", newDateList);
              return newDateList;
            })
          }
          size="md"
          icon={<AddIcon />}
        />
      </VStack>

      <FormErrorMessage>{meta.error}</FormErrorMessage>
    </FormControl>
  );
};

export default DateAndTimeInput;
