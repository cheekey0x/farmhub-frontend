import { api, wrapResponse } from "cardano-api/lib";
import { SignedMessage } from "lucid-cardano";
import { GetMeResponse, SignInResponse, SignUpResponse } from "./types";
import { Err, Ok } from "ts-res";
import { setBearerToken } from "src/helpers";

const prefix = "/admin";

const signUp = async (
  address: string,
  payload: string,
  signedMessage: SignedMessage
) => {
  const res = await wrapResponse(
    api.post<SignUpResponse>(`${prefix}`, {
      address,
      payload,
      signedMessage
    })
  );
  if (!res.ok) return Err(res.error);
  return Ok(res.data.contents);
};

const signIn = async (address: string) => {
  const res = await wrapResponse(
    api.post<SignInResponse>(`${prefix}/auth`, {
      address
    })
  );
  if (!res.ok) return Err(res.error);

  setBearerToken(res.data.contents.accessToken);
  return Ok(res.data.contents);
};

const getMe = async () => {
  const res = await wrapResponse(api.get<GetMeResponse>(`${prefix}`));
  if (!res.ok) return Err(res.error);
  return Ok(res.data.contents);
};

export { getMe, signIn, signUp };
