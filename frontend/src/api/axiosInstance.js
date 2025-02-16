import axios from "axios";
import { store } from "../redux/store";

const API = axios.create({
  baseURL: "http://localhost:3000/api/",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true
});

API.interceptors.request.use(
  (config) => {
    const token = store.getState().users.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default API;
