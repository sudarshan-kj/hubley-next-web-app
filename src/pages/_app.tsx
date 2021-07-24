import { ChakraProvider } from "@chakra-ui/react";
import theme from "../theme";
import Router from "next/router";
import AuthProvider from "../utils/AuthProvider";
import { Provider } from "react-redux";
import store from "./../store";

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
      <Provider store={store}>
        <AuthProvider>
          <ComponentWLayout {...pageProps} />
        </AuthProvider>
      </Provider>
    </ChakraProvider>
  );
}

export default MyApp;
