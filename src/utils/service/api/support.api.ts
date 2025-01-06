import { BACKEND_ENDPOINTS } from "src/constant/router";
import { axiosPost } from "src/utils/axios";
import { ISubscribeUser } from "./support.type";

export const subscribeServer: (
  data: Partial<ISubscribeUser>
) => Promise<ISubscribeUser> = async (subscribeData) => {
  try {
    const result = await axiosPost([
      BACKEND_ENDPOINTS.support.subscribe,
      { data: subscribeData }
    ]);
    return result;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
