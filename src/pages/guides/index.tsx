import { Box, Heading, SimpleGrid } from "@chakra-ui/react";
import Meta from "../../components/Meta";
import GuidesList from "../../components/guides/GuidesList";
import path from "path";
import { promises as fs } from "fs";
import { withHeader } from "../../utils/withHeader";
import readline from "readline";

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

export async function getStaticProps() {
  const guidesDirectory = path.join(process.cwd(), "static-content/guides");
  const guideFiles = await fs.readdir(guidesDirectory);
  const guideNames = guideFiles.map(async (filename) => {
    const filePath = path.join(guidesDirectory, filename);
    const fileContents = await fs.readFile(filePath, "utf8");
    const guidePath = filename.split(".")[0];
    console.log("File contents", fileContents);
    const guideHeading = guidePath
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.substr(1))
      .join(" ");
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
