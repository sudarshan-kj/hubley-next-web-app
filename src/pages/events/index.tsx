import { Box, Heading, Center } from "@chakra-ui/layout";
import withAuthHeader from "../../utils/withAuthHeader";

const Events = () => {
  return (
    <Center h="120vh">
      <Heading>This is the Events Home Page</Heading>
    </Center>
  );
};

export default withAuthHeader(Events);
