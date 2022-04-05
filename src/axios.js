import axios from "axios";
import appConfig from "./appConfig";

export const ax = axios.create({
  baseURL: appConfig.apiBase + "/api/v1/",
  headers: {
    Authorization: `Basic ${localStorage.getItem("token")}`,
  },
});

ax.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Basic ${token}`;
  return config;
}, Promise.reject);

export default ax;
