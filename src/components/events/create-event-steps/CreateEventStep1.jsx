import TextInput from "components/formFields/TextInput";
import RadioInput from "components/formFields/RadioInput";
import SelectInput from "components/formFields/SelectInput";
import SwitchInput from "components/formFields/SwitchInput";
import DateAndTimeInput from "components/formFields/DateAndTimeInput";
import { VStack, Flex, Box, ScaleFade, SlideFade } from "@chakra-ui/react";
import { CalendarIcon } from "@chakra-ui/icons";
import { FiType } from "react-icons/fi";
import { AiOutlineGroup } from "react-icons/ai";
import EventHeading from "../EventHeading";
import { withSlider } from "./utils";

const CreateEventStep1 = () => {
  return (
    <Box>
      <EventHeading description="Enter details like what makes the event unique" />
      <VStack spacing={12} mt={6}>
        <TextInput
          name="eventTitle"
          type="text"
          label="event title"
          fontWeight="bolder"
          fontSize="larger"
          icon={FiType}
        />
        <Flex direction={["column", "row"]} width="100%" justify="space-around">
          <VStack flex={1} spacing={12}>
            <RadioInput
              icon={AiOutlineGroup}
              name="eventType"
              type="radio"
              label="event type"
            />
            <SelectInput
              name="eventCategory"
              label="eventCategory"
              placeholder="select category "
              width="75%"
            >
              <option value="agriculture">Agriculture</option>
              <option value="it">IT</option>
              <option value="food">Food</option>
            </SelectInput>
            <SwitchInput
              name="recordingAvailable"
              label="recording available?"
              size="lg"
            />
          </VStack>
          <VStack flex={1} spacing={12} mt={[8, 0]}>
            <DateAndTimeInput
              icon={CalendarIcon}
              label="date and time"
              type="date"
              name="dateTime"
            />
          </VStack>
        </Flex>
      </VStack>
    </Box>
  );
};

export default withSlider(CreateEventStep1);
