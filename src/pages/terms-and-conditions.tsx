import { promises as fs } from "fs";
import { Heading } from "@chakra-ui/layout";
import { withHeader } from "../utils/withHeader";
import path from "path";

const TAndC = ({ filenames }) => {
  console.log("File names are", filenames);
  return <Heading>Terms and Conditions content to go here! </Heading>;
};

export default withHeader(TAndC);

export async function getStaticProps() {
  const termsAndConditionDirectory = path.join(process.cwd(), "meta");
  const filenames = await fs.readdir(termsAndConditionDirectory);
  console.log("**** File names are***", filenames[0]);
  return {
    props: {
      filenames,
    },
  };
}
