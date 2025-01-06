import { SuccessResponse } from "cardano-api/lib";
import { Admin } from "cardano-api/types";

type SignUpResponse = SuccessResponse<{ admin: Admin }>;
type SignInResponse = SuccessResponse<{ admin: Admin; accessToken: string }>;
type GetMeResponse = SuccessResponse<{
  type: string;
  id: string;
  address?: string;
}>;

export type { GetMeResponse, SignUpResponse, SignInResponse };
