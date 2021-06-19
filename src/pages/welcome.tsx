import { Center } from "@chakra-ui/react";
import { withPrivateHeader } from "../utils/withHeader";

const Welcome = () => {
  return <Center h="100vh">Welcome after signing up!</Center>;
};

export default withPrivateHeader(Welcome);
