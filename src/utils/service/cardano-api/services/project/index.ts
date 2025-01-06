import { api, wrapResponse } from "cardano-api/lib";
import {
  GetResponse,
  CreateResponse,
  InitResponse,
  PutResponse
} from "./types";
import { WalletAuth } from "src/utils/cardano/wallet";
import { Err, Ok } from "ts-res";

const prefix = "/project";

const create = async () => {
  const res = await wrapResponse(api.post<CreateResponse>(`${prefix}`));
  if (res.ok) {
    return res?.data.contents;
  } else {
    throw new Error(res.error);
  }
};

const put = async (id: string, name: string, walletAuth: WalletAuth) => {
  const res = await wrapResponse(
    api.put<PutResponse>(`${prefix}?id=${id}`, { name, walletAuth })
  );
  if (!res.ok) return Err(res.error);
  return Ok(res.data.contents);
};

const init = async (name: string, walletAuth: WalletAuth) => {
  const res = await wrapResponse(
    api.post<InitResponse>(`${prefix}/init`, { name, walletAuth })
  );
  if (!res.ok) return Err(res.error);
  return Ok(res.data.contents);
};

const get = async (id: string) => {
  const res = await wrapResponse(api.get<GetResponse>(`${prefix}/?id=${id}`));
  if (res.ok) {
    return res?.data.contents;
  } else {
    throw new Error(res.error);
  }
};

export { get, create, put, init };
