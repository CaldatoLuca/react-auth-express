import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  timeout: 3000,
});

instance.interceptors.request.use(function (config) {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

instance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response.status === 401) {
      localStorage.clear();
      window.location = "/access/login";
    }
    return Promise.reject(error);
  }
);

export default instance;
