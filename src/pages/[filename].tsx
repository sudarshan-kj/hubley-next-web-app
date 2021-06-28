import { promises as fs } from "fs";
import { withHeader } from "../utils/withHeader";
import path from "path";
import markdownToHtml from "../lib/markDownToHtml";
import PostBody from "../components/utils/postBody";

const StaticPages = ({ htmlContent }) => <PostBody htmlContent={htmlContent} />;

export async function getStaticPaths() {
  const termsAndConditionDirectory = path.join(process.cwd(), "static-content");
  const filenames = await fs.readdir(termsAndConditionDirectory);
  const filePaths = filenames.map(async (filename) => {
    return { params: { filename: filename.split(".")[0] } };
  });
  return {
    paths: await Promise.all(filePaths),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const termsAndConditionDirectory = path.join(process.cwd(), "static-content");
  const filePath = path.join(
    termsAndConditionDirectory,
    `${params.filename}.md`
  );
  const fileContents = await fs.readFile(filePath, "utf8");
  const htmlContent = await markdownToHtml(fileContents);
  return {
    props: {
      htmlContent,
    },
  };
}

export default withHeader(StaticPages);
