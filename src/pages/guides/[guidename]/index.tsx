import path from "path";
import { promises as fs } from "fs";
import { withHeader } from "../../../utils/withHeader";
import markdownToHtml from "../../../lib/markDownToHtml";
import PostBody from "../../../components/utils/postBody";
import { Box } from "@chakra-ui/layout";
import Link from "next/link";

const Guide = ({ htmlContent }) => (
  <Box>
    <Link href="/guides">Back to Guides</Link>
    <PostBody htmlContent={htmlContent} />
  </Box>
);

export async function getStaticPaths() {
  const guidesDirectory = path.join(process.cwd(), "static-content/guides");
  const filenames = await fs.readdir(guidesDirectory);
  const filePaths = filenames.map(async (filename) => {
    return { params: { guidename: filename.split(".")[0] } };
  });
  return {
    paths: await Promise.all(filePaths),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const guidesDirectory = path.join(process.cwd(), "static-content/guides");
  const filePath = path.join(guidesDirectory, `${params.guidename}.md`);
  const fileContents = await fs.readFile(filePath, "utf8");
  const htmlContent = await markdownToHtml(fileContents);
  return {
    props: {
      htmlContent,
    },
  };
}

export default withHeader(Guide);
