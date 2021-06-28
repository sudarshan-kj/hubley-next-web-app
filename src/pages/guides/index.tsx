import { Box, Heading, SimpleGrid } from "@chakra-ui/react";
import Meta from "../../components/Meta";
import GuidesList from "../../components/guides/GuidesList";
import path from "path";
import { promises as fs } from "fs";
import { withHeader } from "../../utils/withHeader";

const GuidesPage = ({ guides }) => (
  <Box p={16}>
    <Meta
      title="Hubley Guides"
      description="Find out how to use hubley"
      keywords="hubley guides, online events guides"
    />
    <Heading>Hubley Guides</Heading>
    <GuidesList guides={guides} />
  </Box>
);

const shouldQuestionMarkBeAppended = (str) => {
  return (
    str.startsWith("Why") || str.startsWith("What") || str.startsWith("How")
  );
};

export async function getStaticProps() {
  const guidesDirectory = path.join(process.cwd(), "static-content/guides");
  const guideFiles = await fs.readdir(guidesDirectory);
  const guideNames = guideFiles.map(async (filename) => {
    const guidePath = filename.split(".")[0];
    let guideHeading = guidePath
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.substr(1))
      .join(" ");

    if (shouldQuestionMarkBeAppended(guideHeading)) {
      guideHeading = guideHeading.concat("?");
    }
    return {
      guidePath,
      guideHeading,
    };
  });

  return {
    props: {
      guides: await Promise.all(guideNames),
    },
  };
}

export default withHeader(GuidesPage);
