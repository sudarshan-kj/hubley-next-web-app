import { ChakraProvider } from "@chakra-ui/react";
import theme from "../theme";
import Router from "next/router";
import AuthProvider from "../utils/AuthProvider";
import Head from "next/head";
import NProgress from "nprogress";
import "../styles/nprogress.css";

Router.events.on("routeChangeStart", (url) => {
  console.log(`Loading: ${url}`);
  NProgress.start();
});
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

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
