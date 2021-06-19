import { Heading } from "@chakra-ui/layout";
import { withHeader } from "../utils/withHeader";

const Home = () => <Heading>Hello!</Heading>;

export default withHeader(Home);
