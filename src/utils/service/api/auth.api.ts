import { BACKEND_ENDPOINTS } from "src/constant/router";
import { axiosPost, removeAllTokens } from "src/utils/axios";
import {
  TLoginResponse,
  TLoginEmailPayload,
  TSignUpEmailPayload
} from "./auth.type";

export const logInWithEmail: (
  data: TLoginEmailPayload
) => Promise<TLoginResponse> = async (data) => {
  try {
    const result = await axiosPost([BACKEND_ENDPOINTS.auth.login, { data }]);
    return result;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const logInWithWallet: (data: {
  wallet: string;
}) => Promise<TLoginResponse> = async (data) => {
  try {
    const result = await axiosPost([
      BACKEND_ENDPOINTS.auth.walletLogin,
      { data }
    ]);
    return result;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const signUpWithEmail: (
  data: TSignUpEmailPayload
) => Promise<TLoginResponse> = async (data) => {
  try {
    const result = await axiosPost([BACKEND_ENDPOINTS.auth.signUp, { data }]);
    return result;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const updateToken: (data: {
  refreshToken: string;
}) => Promise<TLoginResponse> = async (data) => {
  try {
    const result = await axiosPost([
      BACKEND_ENDPOINTS.auth.updateToken,
      { data }
    ]);
    return result;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

// export const logOut: () => Promise<{ message: string }> = async () => {
//   try {
//     removeAllTokens();
//     const result = await axiosPost(BACKEND_ENDPOINTS.auth.logout);
//     return result;
//   } catch (err) {
//     console.error(err);
//     throw err;
//   }
// };
export const logOut = async () => {
  try {
    removeAllTokens();
  } catch (err) {
    console.error(err);
    throw err;
  }
};
