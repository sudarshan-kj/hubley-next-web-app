import { Stack, Flex, Text } from "@chakra-ui/react";
import EventForm from "components/events/EventForm";
import { withHeader } from "utils/withHeader";
import seedDataJSON from "seedData/createEvent.json";
import EventHeading from "components/events/EventHeading";
import dynamic from "next/dynamic";

const DynamicEventForm = dynamic(
  () => import("../../components/events/EventForm"),
  {
    ssr: false,
  }
);

const CreateEvent = () => {
  return (
    <Stack spacing={8} px={80} pt={2} pb={10} w="100%">
      <Flex justify="space-between">
        <EventHeading description="Enter details like what makes the event unique" />
      </Flex>
      <DynamicEventForm
        seedData={seedDataJSON}
        callback={""}
        buttonName="create"
      />
    </Stack>
  );
};

export default withHeader(CreateEvent);
