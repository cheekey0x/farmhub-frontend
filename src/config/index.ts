import { loadAppConfig } from "./app";
import { loadAuthConfig } from "./auth";

const loadConfig = () => {
  const app = loadAppConfig();
  const auth = loadAuthConfig();

  return {
    app,
    auth
  };
};

export { loadConfig };
