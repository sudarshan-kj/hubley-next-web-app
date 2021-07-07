import { Box, Stack, Flex, Text, Heading, color } from "@chakra-ui/react";
import EventForm from "components/events/EventForm";
import { withHeader } from "utils/withHeader";
import seedDataJSON from "seedData/createEvent.json";

const CreateEvent = () => {
  return (
    <Stack spacing={8} px={80} py={20} w="100%">
      <Flex justify="space-between">
        <Box>
          <Heading>Basic Info</Heading>
          <Text color="gray.700" mt={4}>
            Add details that highlight what makes it unique
          </Text>
        </Box>
        <Text>Step 1</Text>
      </Flex>
      <EventForm seedData={seedDataJSON} callback={""} buttonName="create" />
    </Stack>
  );
};

export default withHeader(CreateEvent);
