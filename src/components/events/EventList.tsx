import React from "react";
import EventCard from "./EventCard";
import { Grid } from "@chakra-ui/layout";

const EventList = ({ events }) => {
  return (
    <Grid templateColumns="repeat(3, 1fr)" gap={6}>
      {events.map((event) => (
        <EventCard event={event} />
      ))}
    </Grid>
  );
};

export default EventList;
