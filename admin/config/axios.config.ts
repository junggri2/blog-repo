// import { cacheAdapterEnhancer } from "axios-extensions";
import axios from "axios";


const instance = axios.create({
   withCredentials: true,
   baseURL: process.env.NEXT_PUBLIC_FETCH_BASE_URL,
});

instance.defaults.headers.common["Content-Type"] = "application/json";

instance.interceptors.request.use(
   (config) => {
      return config;
   },
   (err) => {
      return Promise.reject(err);
   },
);

export default instance;
