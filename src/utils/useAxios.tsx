import axios from "axios";
import { baseURL } from "./baseURL";

export default function useAxios() {
  const axiosInstance = axios.create({
    baseURL: baseURL,
    headers: { "Content-Type": "application/json" },
  });

  axiosInstance.interceptors.request.use(
    (config) => {
      const accessToken = axiosInstance.get("token");
      if (accessToken) {
        config.headers.common = { Authorization: `Bearer ${accessToken}` };
      }
      return config;
    },
    (error) => {
      Promise.reject(error.response || error.message);
    }
  );

  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      let originalRequest = error.config;
      let refreshToken = axiosInstance.get("refreshToken");
      if (
        refreshToken &&
        error.response.status === 403 &&
        !originalRequest._retry
      ) {
        originalRequest._retry = true;
        return axios
          .post(`${baseURL}/auth/refresh`, {
            refreshToken: refreshToken,
          })
          .then((response) => {
            if (response.status === 200) {
              localStorage.setItem("token", response.data.accessToken);
              localStorage.setItem("refreshToken", response.data.refreshToken);

              originalRequest.headers[
                "Authorization"
              ] = `Bearer ${response.data.accessToken}`;

              return axios(originalRequest);
            }
          })
          .catch(() => {
            localStorage.clear();
            location.reload();
          });
      }
      return Promise.reject(error.response || error.message);
    }
  );

  return axiosInstance;
}
