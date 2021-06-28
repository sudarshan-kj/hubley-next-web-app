import { Box, Heading } from "@chakra-ui/layout";
import Link from "next/link";
const GuideItem = ({ guide, guideNumber }) => (
  <Link href="/guides/[guidename]" as={`/guides/${guide.guidePath}`}>
    <a>
      <Box
        border="1px"
        borderColor="brand.400"
        borderRadius="sm"
        p={12}
        bg="brand.50"
      >
        <Heading>
          {guideNumber + 1}. {guide.guideHeading}
        </Heading>
      </Box>
    </a>
  </Link>
);

export default GuideItem;
