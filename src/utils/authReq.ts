import config from "../config";
import axios from "axios";

export const authAxios = axios.create({
  baseURL: config.HUBLEY_API_ENDPOINT,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});
