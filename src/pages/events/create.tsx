import { Stack, Flex, Text } from "@chakra-ui/react";
import EventForm from "components/events/EventForm";
import { withHeader } from "utils/withHeader";
import seedDataJSON from "seedData/createEvent.json";
import EventHeading from "components/events/EventHeading";

const CreateEvent = () => {
  return (
    <Stack spacing={8} px={80} py={20} w="100%">
      <Flex justify="space-between">
        <EventHeading description="Enter details like what makes the event unique" />
        <Text>Step 1</Text>
      </Flex>
      <EventForm seedData={seedDataJSON} callback={""} buttonName="create" />
    </Stack>
  );
};

export default withHeader(CreateEvent);
