import { useAuth } from "./AuthProvider";
import { Center, Box } from "@chakra-ui/layout";
import AuthHeader from "../components/headers/AuthHeader";
import GenericHeader from "../components/headers/GenericHeader";
import Link from "next/link";

const UnAuthorizedContent = () => (
  <Center h="80vh" fontSize="2xl" color="brand.500" fontWeight="bold">
    <p>
      Please{" "}
      <Link href="/auth/login">
        <Box
          as="a"
          textDecoration="underline"
          textUnderlineOffset="5px"
          _hover={{ cursor: "pointer" }}
        >
          login
        </Box>
      </Link>{" "}
      to continue
    </p>
    {/* <Box textDecoration="underline" _hover={{ cursor: "pointer" }}>
      <Link href="/login">login</Link>
    </Box> */}
  </Center>
);

export const withHeader = (Component) => () => {
  const { currentUser } = useAuth();
  if (currentUser) {
    return <AuthHeader component={Component} />;
  } else {
    return <GenericHeader component={Component} />;
  }
};

export const withPrivateHeader = (Component) => () => {
  const { currentUser } = useAuth();
  if (currentUser) {
    return <AuthHeader component={Component} />;
  } else {
    return <GenericHeader component={UnAuthorizedContent} />;
  }
};
