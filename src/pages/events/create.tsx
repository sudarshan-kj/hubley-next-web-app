import { Stack } from "@chakra-ui/react";
import { withHeader } from "utils/withHeader";
import seedDataJSON from "seedData/createEvent.json";
import EventHeading from "components/events/EventHeading";
import dynamic from "next/dynamic";
import ContentLayout from "components/layout/contentLayout";

const DynamicEventForm = dynamic(
  () => import("../../components/events/EventForm"),
  {
    ssr: false,
  }
);

const CreateEvent = () => {
  return (
    <ContentLayout>
      <DynamicEventForm
        seedData={seedDataJSON}
        callback={""}
        buttonName="create"
      />
    </ContentLayout>
  );
};

export default withHeader(CreateEvent);
