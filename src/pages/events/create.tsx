import { withHeader } from "utils/withHeader";
import seedDataJSON from "seedData/createEvent.json";
import dynamic from "next/dynamic";
import { ContentLayoutWBg } from "components/layout/contentLayout";

const DynamicEventForm = dynamic(
  () => import("../../components/events/EventForm"),
  {
    ssr: false,
  }
);

const CreateEvent = () => {
  return (
    <ContentLayoutWBg
      borderTop="12px"
      borderColor="brand.300"
      borderStyle="ridge"
      bg="white"
      boxShadow="md"
    >
      <DynamicEventForm
        seedData={seedDataJSON}
        callback={""}
        buttonName="create"
      />
    </ContentLayoutWBg>
  );
};

export default withHeader(CreateEvent);
