import { Heading, Center } from "@chakra-ui/layout";
import { withPrivateHeader } from "../../utils/withHeader";

const Events = () => {
  return (
    <Center h="120vh">
      <Heading>This is the Events Home Page</Heading>
    </Center>
  );
};

export default withPrivateHeader(Events);
