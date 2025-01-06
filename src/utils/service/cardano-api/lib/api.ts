import axios, { AxiosError, AxiosResponse } from "axios";
import { loadConfig } from "src/config";
import { getBearerToken } from "src/helpers";
import { Err, Ok, Result } from "ts-res";
const config = loadConfig();

const api = axios.create({
  baseURL: config.app.apiBaseUrl,
  withCredentials: true // Ensure credentials are sent with requests
});

api.interceptors.request.use((config) => {
  const accessToken = getBearerToken();
  config.headers.Authorization = `Bearer ${accessToken}`;
  config.headers["Access-Control-Allow-Origin"] = "*";
  config.headers["X-TIMEZONE"] = -new Date().getTimezoneOffset() / 60;
  return config;
});

const wrapResponse = async <T>(
  call: Promise<AxiosResponse<T, unknown>>
): Promise<Result<T, string>> => {
  try {
    const result = await call;
    return Ok(result.data);
  } catch (err) {
    if (err instanceof AxiosError) {
      return Err(err.response?.data?.contents.errors?.[0]?.message || "Failed");
    }
    return Err("Failed");
  }
};

export { api, wrapResponse };
