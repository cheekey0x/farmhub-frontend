import { BACKEND_ENDPOINTS } from "src/constant/router";
import { axiosGet, axiosPut } from "src/utils/axios";
import { IUser } from "./auth.type";

export const getUserInfo: () => Promise<IUser> = async () => {
  try {
    const result = await axiosGet(BACKEND_ENDPOINTS.user.me);
    return result.user;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const updateUserInfo: (data: Partial<IUser>) => Promise<IUser> = async (
  userData
) => {
  try {
    const result = await axiosPut([
      BACKEND_ENDPOINTS.user.me,
      { data: userData }
    ]);
    return result;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
