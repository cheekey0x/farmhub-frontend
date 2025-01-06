import { SuccessResponse } from "cardano-api/lib";
import { Assets } from "lucid-cardano";

type CreateResponse = SuccessResponse<{
  wallet: {
    project: string;
    address: string;
  };
}>;

type BalanceResponse = SuccessResponse<{
  balance: Assets;
}>;

type GetResponse = CreateResponse;
type ResetResponse = CreateResponse;

export type { GetResponse, ResetResponse, CreateResponse, BalanceResponse };
