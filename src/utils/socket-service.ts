import { io, Socket } from "socket.io-client";
import { EventsMap } from "@socket.io/component-emitter";
import {
  IDoAppServerToClientEvents,
  IDoAppClientToServerEvents
} from "src/types/socket";

const SERVER_URL =
  process.env.NEXT_PUBLIC_BASE_API_URL?.replace("/api", "") || "";

const createSocket = <
  ServerEvents extends EventsMap,
  ClientEvents extends EventsMap
>(
  namespace: string
): Socket<ServerEvents, ClientEvents> => io(`${SERVER_URL}/${namespace}`);

class YieldlabSocket {
  private static instance: YieldlabSocket;

  public doApp: Socket<IDoAppServerToClientEvents, IDoAppClientToServerEvents>;

  private constructor() {
    this.doApp = createSocket<
      IDoAppServerToClientEvents,
      IDoAppClientToServerEvents
    >("doApp");
  }

  public static getInstance(): YieldlabSocket {
    if (!YieldlabSocket.instance) {
      YieldlabSocket.instance = new YieldlabSocket();
    }
    return YieldlabSocket.instance;
  }
}

export default YieldlabSocket;
