import { BACKEND_ENDPOINTS } from "src/constant/router";
import { axiosGet, axiosPost } from "src/utils/axios";
import {
  TTeamMember,
  IProjectUser,
  TInviteUserPayload,
  TProjectInvitationStatus
} from "./project-user.type";

export const getTeamByProject: (
  projectId: string
) => Promise<Array<TTeamMember>> = async (projectId) => {
  try {
    const result = await axiosGet(
      `${BACKEND_ENDPOINTS.projectUser.getByProject}/${projectId}`
    );
    return result;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const inviteUserToProject: (
  invitePayload: TInviteUserPayload
) => Promise<IProjectUser> = async (invitePayload) => {
  try {
    const result = await axiosPost([
      `${BACKEND_ENDPOINTS.projectUser.inviteUser}`,
      { data: invitePayload }
    ]);

    return result;
  } catch (err) {
    return err;
  }
};

export const inviteInfoById: (
  id: string
) => Promise<TProjectInvitationStatus> = async (id) => {
  try {
    const result = await axiosGet(
      `${BACKEND_ENDPOINTS.projectUser.inviteUser}/${id}`
    );

    return result;
  } catch (err) {
    return err;
  }
};

export const acceptInviteById: (
  id: string
) => Promise<TProjectInvitationStatus> = async (id) => {
  try {
    const result = await axiosPost([
      `${BACKEND_ENDPOINTS.projectUser.inviteUser}/${id}`,
      { data: { accept: true } }
    ]);

    return result;
  } catch (err) {
    return err;
  }
};

export const declineInviteById: (
  id: string
) => Promise<TProjectInvitationStatus> = async (id) => {
  try {
    const result = await axiosPost([
      `${BACKEND_ENDPOINTS.projectUser.inviteUser}/${id}`,
      { data: { accept: false } }
    ]);

    return result;
  } catch (err) {
    return err;
  }
};
