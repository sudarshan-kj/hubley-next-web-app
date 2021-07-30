import { ChakraProvider } from "@chakra-ui/react";
import theme from "../theme";
import Router, { useRouter } from "next/router";
import AuthProvider from "../utils/AuthProvider";
import { Provider } from "react-redux";
import { useAuth } from "utils/AuthProvider";
import store from "./../store";

import NProgress from "nprogress";
import "../styles/nprogress.css";
import { useEffect } from "react";
import CustomRouter from "utils/router";

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
          <CustomRouter>
            <ComponentWLayout {...pageProps} />
          </CustomRouter>
        </AuthProvider>
      </Provider>
    </ChakraProvider>
  );
}

export default MyApp;
