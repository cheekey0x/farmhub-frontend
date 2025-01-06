import axios, { AxiosRequestConfig } from "axios";
import { getDeviceID, getDevicePlatform } from "./device-info";

// ----------------------------------------------------------------------
const accessKey = process.env.NEXT_PUBLIC_MEMBER_ACCESS_TOKENKEY!;
const adminCryptoAccessKey =
  process.env.NEXT_PUBLIC_MEMBER_ADMIN_CRYPTO_TOKENKEY!;
const refreshKey = process.env.NEXT_PUBLIC_MEMBER_REFRESH_TOKENKEY!;

const axiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BASE_API_URL}/v1`,
  withCredentials: true
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = getAccessToken();
    config.headers.Authorization = `Bearer ${accessToken}`;
    config.headers["Access-Control-Allow-Origin"] = "*";
    config.headers["X-TIMEZONE"] = -new Date().getTimezoneOffset() / 60;
    config.headers.deviceId = getDeviceID();
    config.headers.platform = getDevicePlatform();
    return config;
  },
  (err) => {
    throw new Error(err);
  }
);

axiosInstance.interceptors.response.use(
  (res) => res,
  (error) =>
    Promise.reject(
      (error.response && error.response.data) || "Something went wrong"
    )
);

export default axiosInstance;

// ----------------------------------------------------------------------
export const axiosGet = async (args: string | [string, AxiosRequestConfig]) => {
  const [url, config] = Array.isArray(args) ? args : [args];

  const res = await axiosInstance.get(url, { ...config });

  return res.data;
};

export const axiosPost = async (
  args: string | [string, AxiosRequestConfig]
) => {
  const [url, config] = Array.isArray(args) ? args : [args];

  const res = await axiosInstance.post(url, config?.data, config);

  return res.data;
};

export const axiosPut = async (args: string | [string, AxiosRequestConfig]) => {
  const [url, config] = Array.isArray(args) ? args : [args];

  const res = await axiosInstance.put(url, config?.data, config);

  return res.data;
};

export const axiosDelete = async (
  args: string | [string, AxiosRequestConfig]
) => {
  const [url, config] = Array.isArray(args) ? args : [args];

  const res = await axiosInstance.delete(url, { ...config });

  return res.data;
};

// ----------------------------------------------------------------------

export const getAccessToken = (): string => {
  if (window) {
    const token = localStorage.getItem(accessKey);
    return token || "";
  }
  return "";
};

export const setAccessToken = (token: string): void => {
  if (window && token !== "") {
    localStorage.setItem(accessKey, token);
  }
};

export const getAdminCryptoToken = (): string => {
  if (window) {
    const token = localStorage.getItem(adminCryptoAccessKey);
    return token || "";
  }
  return "";
};

export const setAdminCryptoToken = (token: string): void => {
  if (window && token !== "") {
    localStorage.setItem(adminCryptoAccessKey, token);
  }
};

export const getRefreshToken = (): string => {
  if (window) {
    const token = localStorage.getItem(refreshKey);
    return token || "";
  }
  return "";
};

export const setRefreshToken = (token: string): void => {
  if (window && token !== "") {
    localStorage.setItem(refreshKey, token);
  }
};

export const removeAllTokens = (): void => {
  if (window) {
    localStorage.removeItem(accessKey);
    localStorage.removeItem(refreshKey);
  }
};
