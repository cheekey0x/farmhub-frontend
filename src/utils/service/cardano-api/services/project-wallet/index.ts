import { api, wrapResponse } from "cardano-api/lib";
import {
  GetResponse,
  ResetResponse,
  CreateResponse,
  BalanceResponse
} from "./types";

const prefix = "/project-wallet";

const create = async (
  project: string,
  payload: string,
  signedMessage: { key: string; signature: string }
) => {
  const res = await wrapResponse(
    api.post<CreateResponse>(`${prefix}/?project=${project}`, {
      payload,
      signedMessage
    })
  );
  if (res.ok) {
    return res?.data.contents;
  } else {
    throw new Error(res.error);
  }
};

const get = async (project: string) => {
  const res = await wrapResponse(
    api.get<GetResponse>(`${prefix}/?project=${project}`)
  );
  if (res.ok) {
    return res?.data.contents;
  } else {
    throw new Error(res.error);
  }
};

const getBalance = async (project: string) => {
  const res = await wrapResponse(
    api.get<BalanceResponse>(`${prefix}/balance?project=${project}`)
  );
  if (res.ok) {
    return res?.data.contents;
  } else {
    throw new Error(res.error);
  }
};

const reset = async (project: string) => {
  const res = await wrapResponse(
    api.put<ResetResponse>(`${prefix}/?project=${project}`)
  );
  if (res.ok) {
    return res?.data.contents;
  } else {
    throw new Error(res.error);
  }
};

export { get, reset, create, getBalance };
