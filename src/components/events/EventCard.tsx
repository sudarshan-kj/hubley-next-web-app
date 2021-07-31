import React from "react";
import { Box, Image, Flex, Badge, Text } from "@chakra-ui/react";
import { MdStar } from "react-icons/md";

const EventCard = ({ event }) => (
  <Box shadow="base" maxW="320px">
    <Image borderTopRadius="md" src="https://bit.ly/2k1H1t6" />
    <Box py={6} px={4}>
      <Flex align="baseline">
        <Badge colorScheme="pink">{event.eventType}</Badge>
        <Text
          ml={2}
          textTransform="uppercase"
          fontSize="sm"
          fontWeight="bold"
          color="pink.800"
        >
          Verified &bull; Cape Town
        </Text>
      </Flex>
      <Text
        mt={2}
        fontSize="xl"
        width="250px"
        fontWeight="semibold"
        lineHeight="short"
      >
        {event.eventName}
      </Text>
      <Text mt={2}>{event.eventDate}</Text>
      <Flex mt={2} align="center">
        <Box as={MdStar} color="orange.400" />
        <Text ml={1} fontSize="sm">
          <b>4.84</b> (190)
        </Text>
      </Flex>
    </Box>
  </Box>
);

export default EventCard;
