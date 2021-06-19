import SideSection from "../../components/entry/SideSection";
import CommonInputsSection from "../../components/entry/CommonInputsSection";
import { Flex } from "@chakra-ui/layout";
import { Text, Button, Box } from "@chakra-ui/react";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { useAuth } from "../../utils/AuthProvider";
import { Reducer, useReducer } from "react";

type ActionTypes = {
  type: string;
};

const initState = {
  google: { loading: false, error: "" },
  facebook: { loading: false, error: "" },
};

const socialLoginReducer: Reducer<any, ActionTypes> = (
  state: any,
  action: ActionTypes
) => {
  switch (action.type) {
    case "GOOGLE_LOADING":
      return {
        ...state,
        google: { loading: true, error: false },
      };
    case "GOOGLE_ERROR":
      return {
        ...state,
        google: {
          loading: false,
          error: "Something went wrong while logging into your Google account",
        },
      };

    case "FACEBOOK_LOADING":
      return {
        ...state,
        facebook: { loading: true, error: "" },
      };
    case "FACEBOOK_ERROR":
      return {
        ...state,
        facebook: {
          loading: false,
          error:
            "Something went wrong while logging into your Facebook account",
        },
      };
    case "RESET_ALL":
      return initState;
    default:
      throw new Error("Unknown Type: " + action.type);
  }
};

const Login = () => {
  const leftSectionWidthAndHeight = 35;
  const [socialLogin, dispatchSocialLogin] = useReducer(
    socialLoginReducer,
    initState
  );
  console.log("Social Login is", socialLogin);
  const { signInWithGoogle, signInWithFacebook } = useAuth();

  async function handleSocialLogin(callFunction, provider) {
    try {
      dispatchSocialLogin({ type: `${provider}_LOADING` });
      await callFunction();
      dispatchSocialLogin({ type: `RESET_ALL` });
    } catch (e) {
      console.error(`${provider} login error:`, e);
      dispatchSocialLogin({ type: `${provider}_ERROR` });
    }
  }

  function getDifference(input: number): number {
    return 100 - input;
  }

  return (
    <Flex direction={["column", "row"]} minH="80vh" h="100vh">
      <SideSection
        headingName="Login"
        w={["100%", `${leftSectionWidthAndHeight}%`]}
        h={["35%", "100%"]}
      />

      <CommonInputsSection
        buttonName="Login"
        w={["100%", `${getDifference(leftSectionWidthAndHeight)}%`]}
        h={["65%", "100%"]}
      >
        <Button
          leftIcon={<FcGoogle />}
          w="100%"
          size="lg"
          fontSize="calc(0.4vw + 0.9rem )"
          variant="outline"
          onClick={() => handleSocialLogin(signInWithGoogle, "GOOGLE")}
          isLoading={socialLogin.google.loading}
          disabled={socialLogin.google.loading || socialLogin.facebook.loading}
        >
          Login with Google
        </Button>
        {socialLogin.google.error}
        <Button
          leftIcon={<FaFacebook />}
          w="100%"
          size="lg"
          fontSize="calc(0.4vw + 0.9rem )"
          variant="outline"
          onClick={() => handleSocialLogin(signInWithFacebook, "FACEBOOK")}
          isLoading={socialLogin.facebook.loading}
          disabled={socialLogin.google.loading || socialLogin.facebook.loading}
        >
          Login with Facebook
        </Button>
        <Text>{socialLogin.facebook.error}</Text>
        <Text fontSize="lg" fontWeight="bold" color="gray.500">
          Already have an account?{" "}
          <Link href="/auth/signup">
            <a>
              <Box as="span" color="brand.500">
                Signup
              </Box>
            </a>
          </Link>
        </Text>
      </CommonInputsSection>
    </Flex>
  );
};

export default Login;
