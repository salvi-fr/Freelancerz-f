import axios from "axios";
const axiosInstance = axios.create({
  baseURL:process.env.NEXT_PUBLIC_BACKEND_URL || "https://healthedu-b.herokuapp.com",
});

axiosInstance.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("accessToken");

      if (token) {
        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${token}`,
        };
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response) => {
    console.log(response);
    return response;
  },
  (error) => {
    if (typeof window !== "undefined") {
      if (error?.response?.status === 401) {
        localStorage.removeItem("accessToken");
        window.location.href = "/refresh";
      }
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;