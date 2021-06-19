import { Center, Flex, Box } from "@chakra-ui/react";
import { withHeader } from "../utils/withHeader";
import { Icon } from "@chakra-ui/icons";
import { MdError } from "react-icons/md";

const NotFound = () => {
  return (
    <Center
      flexDirection="column"
      h="80vh"
      color="red.500"
      fontWeight="bold"
      fontSize="2xl"
    >
      <Flex fontSize="3xl" align="center" mb={4}>
        <Icon as={MdError} fill="red.500" boxSize="42px" mx={3} />
        404
      </Flex>
      <Box color="gray.600">Uh oh! Page Not found</Box>
    </Center>
  );
};

export default withHeader(NotFound);
