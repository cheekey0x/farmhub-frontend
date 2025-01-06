import { api, wrapResponse } from "cardano-api/lib";
import { GetResponse, PutResponse } from "./types";
import { ProjectBranding, WithoutBaseMongoDBDocument } from "cardano-api/types";
import { Err, Ok } from "ts-res";
import { WalletAuth } from "src/utils/cardano/wallet";

const prefix = "/project-branding";

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

const put = async (
  project: string,
  data: Partial<WithoutBaseMongoDBDocument<ProjectBranding>>,
  walletAuth: WalletAuth
) => {
  const res = await wrapResponse(
    api.put<PutResponse>(`${prefix}/?project=${project}`, {
      ...data,
      walletAuth
    })
  );
  if (!res.ok) return Err(res.error);
  return Ok(res.data.contents);
};

export { get, put };
