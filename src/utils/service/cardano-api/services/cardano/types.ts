import { SuccessResponse } from "cardano-api/lib";

type AddressBalanceResponse = SuccessResponse<{
  balance: Record<string, string>;
}>;

export type { AddressBalanceResponse };
