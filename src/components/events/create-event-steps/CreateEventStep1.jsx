import TextInput from "components/formFields/TextInput";
import RadioInput from "components/formFields/RadioInput";
import SelectInput from "components/formFields/SelectInput";
import SwitchInput from "components/formFields/SwitchInput";
import DateAndTimeInput from "components/formFields/DateAndTimeInput";
import { VStack, Flex, Button, Box, Spacer } from "@chakra-ui/react";
const TitleIcon = require("-!svg-react-loader!assets/titleIcon.svg");

const CreateEventStep1 = (props) => {
  return (
    <Box>
      <VStack spacing={12}>
        <Flex width="100%" justify="space-around">
          <Box flex={1}>
            <RadioInput name="eventType" type="radio" label="event type" />
          </Box>
          <Box flex={1}>
            <DateAndTimeInput
              label="date and time"
              type="date"
              name="dateTime"
            />
          </Box>
        </Flex>
        <TextInput
          name="eventTitle"
          type="text"
          label="event title"
          icon={TitleIcon}
        />
        <Flex width="100%" justify="space-between">
          <Box flex={2}>
            <SelectInput
              name="eventCategory"
              label="eventCategory"
              placeholder="select category"
              width="100%"
            >
              <option value="agriculture">Agriculture</option>
              <option value="it">IT</option>
              <option value="food">Food</option>
            </SelectInput>
          </Box>
          <Spacer flex={2} />
          <Box flex={2} alignSelf="center">
            <SwitchInput
              name="recordingAvailable"
              label="recording available?"
            />
          </Box>
        </Flex>
      </VStack>
    </Box>
  );
};

export default CreateEventStep1;
