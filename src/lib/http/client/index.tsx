import axios from "axios";
const axiosInstance = axios.create({
  baseURL:process.env.NEXT_PUBLIC_BACKEND_URL,
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
    console.log(error.error)
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response) => {
    console.log("response",response);
    return response.data;
  },
  (error) => {
    console.log("just some random errors",error);
    if (typeof window !== "undefined") {
      if (error?.response?.status === 401) {
        localStorage.removeItem("accessToken");
        window.location.href = "/login";
      }
      console.log("just some random errors",error);
      if (error?.response?.status === 403) {
        error:error.response.data.message="You are not authorized to perform this action"
      }
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;