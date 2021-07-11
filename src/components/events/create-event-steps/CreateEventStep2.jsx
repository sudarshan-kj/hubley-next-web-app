import { Heading, Box, Text, VStack } from "@chakra-ui/react";
import FileUploadInput from "components/formFields/FileUploadInput";
import { withSlider } from "./utils";
import { FiType } from "react-icons/fi";
import EventHeading from "../EventHeading";

const CreateEventStep2 = (props) => {
  return (
    <Box>
      <EventHeading heading="Images" description="Upload images" />
      <VStack spacing={12} mt={6}>
        <FileUploadInput
          icon={FiType}
          isRequired
          label="upload images"
          name="eventImage"
        />
      </VStack>
    </Box>
  );
};
export default withSlider(CreateEventStep2);
