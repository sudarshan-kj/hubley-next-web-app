const IsClient = typeof window !== "undefined";

import config from "../config";
import Axios, { AxiosRequestConfig } from "axios";
import { auth } from "./initFirebase";

async function authRequestInterceptor(config: AxiosRequestConfig) {
  try {
    if (auth.currentUser) {
      const token = await auth.currentUser.getIdToken(true);
      if (token) config.headers.authorization = `Bearer ${token}`;
      config.headers.Accept = "application/json";
    }
    return config;
  } catch (e) {
    console.error("Somehting went wrong file fetching firebase token", e);
  }
}

export const axios = Axios.create({
  baseURL: config.HUBLEY_API_ENDPOINT,
});

export const authAxios = Axios.create({
  baseURL: config.HUBLEY_API_ENDPOINT,
  // headers: {
  //   Authorization: IsClient ? `Bearer ${localStorage.getItem("token")}` : "",
  // },
});

authAxios.interceptors.request.use(authRequestInterceptor);
