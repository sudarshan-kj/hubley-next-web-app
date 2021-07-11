import { Heading, Text, Box } from "@chakra-ui/react";

const EventHeading = ({ heading, description }) => (
  <Box borderLeftColor="brand.500" borderLeftWidth="10px" pl="3">
    <Heading>{heading}</Heading>
    <Text color="gray.400" fontWeight="600" mt={4}>
      {description}
    </Text>
  </Box>
);

export default EventHeading;
