import { BACKEND_ENDPOINTS } from "src/constant/router";
import { axiosGet, axiosPut, axiosPost } from "src/utils/axios";
import {
  IProject,
  EDOAppType,
  TPageParams,
  IActiveProject,
  IProjectWithPayment,
  TCreateProjectPayload
} from "./project.type";
import { IDigitalOceanApp } from "./digital-ocean.type";

export const createProject: (
  data: TCreateProjectPayload
) => Promise<IProject> = async (data) => {
  try {
    const result = await axiosPost([BACKEND_ENDPOINTS.project.base, { data }]);
    return result;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const updateProject: (data: IProject) => Promise<IProject> = async (
  data
) => {
  try {
    const updateId = data._id || "";
    // @ts-ignore
    delete data.createdAt;
    // @ts-ignore
    delete data.updatedAt;
    // @ts-ignore
    delete data._id;
    const result = await axiosPut([
      `${BACKEND_ENDPOINTS.project.base}/${updateId}`,
      { data }
    ]);
    return result;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getActiveProjetByMe: (
  pageParam?: TPageParams
) => Promise<Array<IActiveProject>> = async (
  data = { offset: 0, limit: 100, text: "" }
) => {
  try {
    const result = await axiosPost([
      BACKEND_ENDPOINTS.project.activeByMe,
      { data }
    ]);
    return result;
  } catch (err) {
    console.error(err);
    return [];
  }
};

export const getProjetById: (id: string) => Promise<IProject> = async (id) => {
  try {
    const result = await axiosGet(`${BACKEND_ENDPOINTS.project.getById}/${id}`);
    return result.project;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getProjetByIdWithPayment: (
  id: string
) => Promise<IProjectWithPayment> = async (id) => {
  try {
    const result = await axiosGet(
      `${BACKEND_ENDPOINTS.project.getByIdWithPayment}/${id}`
    );
    return result.project;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const deployProject: (
  id: string,
  type: EDOAppType
) => Promise<IProject> = async (id, type) => {
  try {
    const result = await axiosPost([
      BACKEND_ENDPOINTS.project.deploy,
      { data: { id, type } }
    ]);
    return result;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getDeployedProjectStatus: (
  id: string
) => Promise<IDigitalOceanApp[]> = async (id) => {
  try {
    const result = await axiosGet(`${BACKEND_ENDPOINTS.project.deploy}/${id}`);
    return result;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const projecCheckName: (
  name: string
) => Promise<{ status: boolean }> = async (name) => {
  try {
    const result = await axiosPost([
      BACKEND_ENDPOINTS.project.checkName,
      {
        data: { name }
      }
    ]);
    return result;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
