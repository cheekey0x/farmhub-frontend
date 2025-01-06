import { IBasicModel } from "src/types/model";

export enum INVITATION_STATUS {
  PENDING = "PENDING",
  ACCEPTED = "ACCEPTED",
  REJECTED = "REJECTED"
}

export enum INVITATION_METHOD {
  WALLET = "WALLET",
  EMAIL = "EMAIL"
}

export enum PROJECT_ROLE {
  OWNER = "OWNER",
  ADMIN = "ADMIN",
  MEMBER = "MEMBER"
}

export interface IProjectUser extends IBasicModel {
  projectId: string;
  userId?: string;
  role: PROJECT_ROLE;
  invitation?: {
    method: INVITATION_METHOD;
    status: INVITATION_STATUS;
    value: string;
  };
}

export type TTeamMember = {
  avatar?: string;
  name?: string;
  email?: string;
  wallet?: string[];
  inviteMethod: INVITATION_METHOD;
  inviteStatus: INVITATION_STATUS;
  projectRole: PROJECT_ROLE;
};

export type TInviteUserPayload = {
  receiver: string;
  role: PROJECT_ROLE;
  projectId: string;
};

export type TProjectInvitationStatus = {
  inviteId?: string;
  projectName?: string;
  totalDelegators?: number;
  senderName?: string;
  projectRole?: PROJECT_ROLE;
  inviteMethod?: INVITATION_METHOD;
  inviteStatus?: INVITATION_STATUS;
};
