import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const authAxios = axios.create({
  baseURL: BASE_URL,
  headers: {
    "content-type": "application/json",
  },
});

const APIAxios = axios.create({
  baseURL: BASE_URL,
});

APIAxios.interceptors.request.use((config) => {
  let token = localStorage.getItem("token")
    ? localStorage.getItem("token")
    : "Token";
  config.headers["content-type"] = "application/json";
  config.headers["Access-Token"] = token;

  return config;
});

const FormAxios = axios.create({
  baseURL: BASE_URL,
});
FormAxios.interceptors.request.use((config) => {
  let token = localStorage.getItem("token")
    ? `Bearer ${localStorage.getItem("token")}`
    : "Token";
  config.headers["content-type"] = "multipart/form-data";
  config.headers["Authorization"] = token;

  return config;
});

export { APIAxios, authAxios, FormAxios, BASE_URL };
