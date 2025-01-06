export interface IDigitalOceanApp {
  projectId?: string;
  doAppId?: string;
  doAppName?: string;
  githubRepo?: string;
  domain?: string;
  appType?: EDOAppType;
  deployStatus?: EDODeployStatus;
  _id?: string;
}

export enum EDOAppType {
  TOKEN = "TOKEN",
  NFT = "NFT"
}

export enum EDODeployStatus {
  NONE = "NONE",
  FAILED = "FAILED",
  CREATE_APP_DEPLOYING = "CREATE_APP_DEPLOYING",
  APP_SETTING_DEPLOYING = "APP_SETTING_DEPLOYING",
  ADD_APPDOMAIN_CONFIG = "ADD_APPDOMAIN_CONFIG",
  DEPLOYED = "DEPLOYED"
}
