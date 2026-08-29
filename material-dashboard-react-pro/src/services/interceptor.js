import HttpService from "./http.service";
import Axios from "axios";

let interceptorsReady = false;

export const setupAxiosInterceptors = (onUnauthenticated) => {
  if (interceptorsReady) {
    return;
  }
  interceptorsReady = true;

  const attachToken = async (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  };
  const onRequestFail = (error) => Promise.reject(error);

  HttpService.addRequestInterceptor(attachToken, onRequestFail);
  Axios.interceptors.request.use(attachToken, onRequestFail);

  const onResponseSuccess = (response) => response;

  const onResponseFail = (error) => {
    const status = error.status || error.response?.status;
    if (status === 403 || status === 401) {
      onUnauthenticated();
    }

    return Promise.reject(error);
  };
  HttpService.addResponseInterceptor(onResponseSuccess, onResponseFail);
  Axios.interceptors.response.use(onResponseSuccess, onResponseFail);
};
