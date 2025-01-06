import { SuccessResponse } from "cardano-api/lib";
import { ProjectBranding } from "cardano-api/types";

type PutResponse = SuccessResponse<{
  branding: ProjectBranding;
}>;

type GetResponse = PutResponse;

export type { GetResponse, PutResponse };
