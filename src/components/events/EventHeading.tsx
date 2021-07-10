import { Heading, Text, Box } from "@chakra-ui/react";

const EventHeading = ({ heading, description }) => (
  <Box>
    <Heading>Basic Info</Heading>
    <Text color="gray.700" mt={4}>
      {description}
    </Text>
  </Box>
);

export default EventHeading;
