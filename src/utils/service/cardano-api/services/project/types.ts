import { SuccessResponse } from "cardano-api/lib";
import { Project, ProjectBranding, ProjectWallet } from "cardano-api/types";

type CreateResponse = SuccessResponse<{
  project: Project;
}>;

type PutResponse = CreateResponse;

type InitResponse = SuccessResponse<{
  project: Project;
  branding: ProjectBranding;
  wallet: ProjectWallet;
}>;

type GetResponse = CreateResponse;

export type { GetResponse, CreateResponse, PutResponse, InitResponse };
