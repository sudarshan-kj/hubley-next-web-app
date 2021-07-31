import { Heading, Center } from "@chakra-ui/layout";
import { withHeader } from "utils/withHeader";
import Link from "next/link";
import ContentLayout from "components/layout/contentLayout";
import EventList from "components/events/EventList";
import EventTypeFilter from "components/events/EventTypeFilter";

const Events = () => {
  const events = [
    {
      eventName: "Photography",
      eventType: "onDemand",
      eventDate: "12.09.1994",
    },
    {
      eventName: "Typography",
      eventType: "live",
      eventDate: "12.09.1994",
    },
    {
      eventName: "Basics of Programming",
      eventType: "onDemand",
      eventDate: "01.12.1995",
    },
    {
      eventName: "Photography",
      eventType: "onDemand",
      eventDate: "12.09.1994",
    },
    {
      eventName: "Typography",
      eventType: "live",
      eventDate: "12.09.1994",
    },
    {
      eventName:
        "Basics of Programming and other fundamental applications that we want to design",
      eventType: "onDemand",
      eventDate: "01.12.1995",
    },
  ];

  return (
    <ContentLayout display="flex" alignItems="center">
      <Heading>This is the Events Home Page</Heading>
      <Link href="/events/create">
        <a>Create Event</a>
      </Link>
      <EventTypeFilter />
      <EventList events={events} />
    </ContentLayout>
  );
};

export default withHeader(Events);
