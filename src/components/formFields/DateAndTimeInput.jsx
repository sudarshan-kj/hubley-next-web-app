import { useField } from "formik";
import {
  FormControl,
  FormLabel,
  IconButton,
  HStack,
  VStack,
  Text,
  Flex,
  Icon,
} from "@chakra-ui/react";
import DateTime from "components/date/datetime";
import { useState } from "react";
import { DeleteIcon, AddIcon } from "@chakra-ui/icons";
import { useEffect } from "react";
import SliderInput from "./SliderInput";
import moment from "moment";

const DateAndTimeInput = ({ label, icon: InputIcon, ...props }) => {
  const [field, meta, helpers] = useField(props);
  const { setValue } = helpers;
  const tomorrow = moment().add(1, "days");
  const [dateList, setDateList] = useState({
    data: [{ id: 1, type: DateTime, value: new Date(tomorrow) }],
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
    <>
      <FormControl isInvalid={meta.touched && meta.error}>
        <Flex alignItems="center">
          <FormLabel htmlFor={field.name}>{label}</FormLabel>
          <Icon as={InputIcon} mb={2} />
        </Flex>

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
                const futureDate = new Date(
                  moment().add(prev.data.length + 1, "days")
                );
                newDateList.data.push({
                  id: Math.floor(Math.random() * 10000),
                  type: DateTime,
                  value: futureDate,
                });
                return newDateList;
              })
            }
            size="md"
            icon={<AddIcon />}
          />
        </VStack>
        <SliderInput label="duration" mt={16} />
      </FormControl>
    </>
  );
};

export default DateAndTimeInput;
