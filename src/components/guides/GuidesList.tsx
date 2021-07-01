import { Box, SimpleGrid } from "@chakra-ui/react";
import GuideItem from "./GuideItem";

const GuidesList = ({ guides }) => (
  <Box p={16}>
    <SimpleGrid columns={2} spacing={10}>
      {guides.map((guide, id) => (
        <GuideItem key={id} guide={guide} guideNumber={id} />
      ))}
    </SimpleGrid>
  </Box>
);

export default GuidesList;
