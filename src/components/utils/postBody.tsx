import { Box } from "@chakra-ui/layout";
import styles from "../../styles/markdown.module.css";

const PostBody = ({ htmlContent }) => (
  <Box
    px={[8, 20]}
    py={16}
    background="white"
    maxWidth="900px"
    mx="auto"
    shadow="2xl"
  >
    <Box
      className={styles.markdown}
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  </Box>
);

export default PostBody;
