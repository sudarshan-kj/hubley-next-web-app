import { useAuth } from "./AuthProvider";
import { Center, Box } from "@chakra-ui/layout";
import AuthHeader from "components/headers/AuthHeader";
import GenericHeader from "components/headers/GenericHeader";
import Link from "next/link";
import router from "next/router";

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

export const withHeader = (Component) => (props) => {
  const { currentUser } = useAuth();
  if (currentUser) {
    return <AuthHeader component={Component} {...props} />;
  } else {
    return <GenericHeader component={Component} {...props} />;
  }
};

export const withPrivateHeader = (Component) => (props) => {
  const { currentUser } = useAuth();
  if (currentUser) {
    return <AuthHeader component={Component} {...props} />;
  } else {
    return <GenericHeader component={UnAuthorizedContent} />;
  }
};
