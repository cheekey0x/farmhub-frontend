import { BACKEND_ENDPOINTS } from "src/constant/router";
import { axiosPost } from "src/utils/axios";
import { IPaymentModel, TSubscribePayload } from "./payment.type";

export const createSubscribeByProject: (
  data: TSubscribePayload
) => Promise<IPaymentModel> = async (subscribeData) => {
  try {
    const result = await axiosPost([
      BACKEND_ENDPOINTS.payment.stripe.createSubscribeByProject,
      { data: subscribeData }
    ]);
    return result;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
