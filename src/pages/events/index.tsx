import { Heading, Center } from "@chakra-ui/layout";
import { withHeader } from "../../utils/withHeader";
import Link from "next/link";
import ContentLayout from "components/layout/contentLayout";

const Events = () => {
  return (
    <ContentLayout display="flex" alignItems="center">
      <Heading>This is the Events Home Page</Heading>
      <Link href="/events/create">
        <a>Create Event</a>
      </Link>
    </ContentLayout>
  );
};

export default withHeader(Events);
