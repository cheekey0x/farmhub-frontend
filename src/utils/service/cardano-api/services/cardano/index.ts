import { api, wrapResponse } from "cardano-api/lib";
import { AddressBalanceResponse } from "./types";

const prefix = "/cardano";

const addressBalance = async (address: string) => {
  const res = await wrapResponse(
    api.get<AddressBalanceResponse>(
      `${prefix}/address/balance?address=${address}`
    )
  );
  if (res.ok) {
    return res?.data.contents;
  } else {
    throw new Error(res.error);
  }
};

export { addressBalance };
