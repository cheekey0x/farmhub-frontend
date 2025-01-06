import { loadConfig } from "src/config";
const config = loadConfig();

const getBearerToken = (): string => {
  if (window && window.localStorage) {
    const token = window.localStorage.getItem(config.auth.adminAuthTokenKey);
    return token || "";
  }
  return "";
};

const setBearerToken = (token: string) => {
  if (window && window.localStorage) {
    window.localStorage.setItem(config.auth.adminAuthTokenKey, token);
  }
};

export { getBearerToken, setBearerToken };
