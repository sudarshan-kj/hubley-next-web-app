import { Center, Heading } from "@chakra-ui/layout";
import Link from "next/link";
const GuideItem = ({ guide, guideNumber }) => (
  <Link href="/guides/[guidename]" as={`/guides/${guide.guidePath}`}>
    <a>
      <Center
        border="1px"
        borderColor="brand.400"
        borderRadius="lg"
        p={[6, 8]}
        bg="brand.50"
      >
        <Heading fontSize={["md", "lg"]}>
          {guideNumber + 1}. {guide.guideHeading}
        </Heading>
      </Center>
    </a>
  </Link>
);

export default GuideItem;
