import { Heading, Box, Text } from "@chakra-ui/react";
import FileUploadInput from "components/formFields/FileUploadInput";
import { withSlider } from "./utils";
import { FiType } from "react-icons/fi";

const CreateEventStep2 = (props) => {
  return (
    <Box>
      <Heading>Step 2</Heading>
      <Text>This is the heading that will come up now</Text>
      <FileUploadInput
        icon={FiType}
        isRequired
        label="upload images"
        name="eventImage"
      />
    </Box>
  );
};
export default withSlider(CreateEventStep2);
