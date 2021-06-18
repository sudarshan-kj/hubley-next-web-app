import { ChakraProvider } from "@chakra-ui/react";
import theme from "../theme";
import { AppProps } from "next/app";
import AuthProvider from "../utils/AuthProvider";

function MyApp({ Component, pageProps }: any) {
  const ComponentWLayout = Component.withLayout
    ? Component.withLayout
    : Component;

  return (
    <ChakraProvider resetCSS theme={theme}>
      <AuthProvider>
        <ComponentWLayout {...pageProps} />
      </AuthProvider>
    </ChakraProvider>
  );
}

export default MyApp;
