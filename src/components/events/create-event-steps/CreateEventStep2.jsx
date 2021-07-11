import { Heading, Box, Text } from "@chakra-ui/react";
import { withSlider } from "./utils";

const CreateEventStep2 = (props) => {
  return (
    <div>
      <Heading>Step 2</Heading>
      <Text>This is the heading that will come up now</Text>
      <Box p="40px" color="white" mt="4" bg="teal.500" rounded="md" shadow="md">
        Fade
      </Box>
    </div>
  );
};
export default withSlider(CreateEventStep2);
