import { Heading, Center } from "@chakra-ui/layout";
import { withHeader } from "../../utils/withHeader";
import Link from "next/link";

const Events = () => {
  return (
    <Center h="120vh">
      <Heading>This is the Events Home Page</Heading>
      <Link href="/events/create">
        <a>Create Event</a>
      </Link>
    </Center>
  );
};

export default withHeader(Events);
