import React from "react";
import { Center, Text, Button } from "@chakra-ui/react";
import { useAuth } from "../../utils/AuthProvider";
import { withPrivateHeader } from "../../utils/withHeader";

const Sudi = () => {
  const { updatePassword } = useAuth();
  return (
    <Center h="80vh">
      <Button onClick={() => updatePassword("trynewsudi")}></Button>
      <Text>There is something going on</Text>
    </Center>
  );
};

export default withPrivateHeader(Sudi);
