import { IDigitalOceanApp } from "src/utils/service/api/digital-ocean.type";

export enum EDoAppSocketEvent {
  JOIN_PROJECT = "joinProject",
  LEAVE_PROJECT = "leaveProject",
  DOAPP_STATUS = "doAppStatus",
  DISCONNECT = "disconnect"
}

export interface IDoAppClientToServerEvents {
  [EDoAppSocketEvent.JOIN_PROJECT]: (projectId: string) => void;
  [EDoAppSocketEvent.LEAVE_PROJECT]: (projectId: string) => void;
}

export interface IDoAppServerToClientEvents {
  [EDoAppSocketEvent.DOAPP_STATUS]: (doAppStatus: IDigitalOceanApp) => void;
}
