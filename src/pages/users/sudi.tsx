import React from "react";
import { Center, Text, Button } from "@chakra-ui/react";
import { useAuth } from "utils/AuthProvider";
import { withPrivateHeader } from "utils/withHeader";
import { axios } from "utils/authReq";
import { useEffect } from "react";
import config from "config";

const Sudi = () => {
  const { updatePassword } = useAuth();

  useEffect(() => {
    axios
      .get("/ping")
      .then((response) => console.log(response))
      .catch((e) => console.error("Errorrsrfsdfsf is", e));
  });

  return (
    <Center h="80vh">
      <Button onClick={() => updatePassword("trynewsudi")}></Button>
      <Text>There is something going on</Text>
    </Center>
  );
};

export default withPrivateHeader(Sudi);
