import { create } from "zustand";
import { combine } from "zustand/middleware";
import { IDigitalOceanApp } from "src/utils/service/api/digital-ocean.type";
import YieldlabSocket from "src/utils/socket-service";
import { EDoAppSocketEvent } from "src/types/socket";

interface State {
  projectStatus: IDigitalOceanApp[];
  projectSocketReady: boolean;
}

const initialState: State = {
  projectStatus: [],
  projectSocketReady: false
};

const updateProjectStatus = (
  getState: () => State,
  setState: (state: Partial<State>) => void,
  projectStatus: IDigitalOceanApp
) => {
  const existingStatusIndex = getState().projectStatus.findIndex(
    (ps) => ps?._id === projectStatus?._id
  );
  const updatedProjectStatus = [...getState().projectStatus];
  if (existingStatusIndex !== -1) {
    updatedProjectStatus[existingStatusIndex] = projectStatus;
  } else {
    updatedProjectStatus.push(projectStatus);
  }
  setState({ projectStatus: updatedProjectStatus });
};

const mutations = (
  setState: (state: Partial<State>) => void,
  getState: () => State
) => {
  const socket = YieldlabSocket.getInstance().doApp;

  socket.on("connect", () => {
    setState({ projectSocketReady: true });
  });

  socket.on("disconnect", () => {
    setState({ projectSocketReady: false });
  });

  socket.on(EDoAppSocketEvent.DOAPP_STATUS, (doAppStatus: IDigitalOceanApp) => {
    updateProjectStatus(getState, setState, doAppStatus);
  });

  return {
    actions: {
      joinProjectId(id: string) {
        socket.emit(EDoAppSocketEvent.JOIN_PROJECT, id);
      },
      leaveProjectId(id: string) {
        socket.emit(EDoAppSocketEvent.LEAVE_PROJECT, id);
      },
      setProjectStatus(projectStatus: IDigitalOceanApp) {
        updateProjectStatus(getState, setState, projectStatus);
      }
    }
  };
};

export const useSocketStore = create(combine(initialState, mutations));
