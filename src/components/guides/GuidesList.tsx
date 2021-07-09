import { Box, SimpleGrid } from "@chakra-ui/react";
import GuideItem from "./GuideItem";

const GuidesList = ({ guides }) => (
  <Box>
    <SimpleGrid columns={[1, 2]} spacing={[5, 10]}>
      {guides.map((guide, id) => (
        <GuideItem key={id} guide={guide} guideNumber={id} />
      ))}
    </SimpleGrid>
  </Box>
);

export default GuidesList;
