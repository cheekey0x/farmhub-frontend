import { IBasicModel } from "src/types/model";

export type TLoginEmailPayload = {
  userEmail: string;
  password: string;
};

export type TSignUpEmailPayload = {
  name: string;
  userEmail: string;
  password: string;
};

export type TAuthParams = {
  accessToken: string;
  refreshToken: string;
  expiresIn: string | number;
};

export type TStripeCard = {
  brand?: string;
  exp_month?: string;
  exp_year?: string;
  last4?: string;
  pmId?: string;
  holder?: string;
};

export enum ROLE {
  MEMBER = "MEMBER",
  ADMIN = "ADMIN"
}

export enum STATUS {
  BLOCKED = "BLOCKED",
  NOT_VERIFIED = "NOT_VERIFIED",
  VERIFIED = "VERIFIED",
  WITHOUT_PAYMENT = "WITHOUT_PAYMENT",
  WITHOUT_SUBSCRIBE = "WITHOUT_SUBSCRIBE",
  WITH_PAYMENT = "WITH_PAYMENT"
}

export interface IUser extends IBasicModel {
  avatar?: string;
  userEmail?: string;
  name?: string;
  phoneNumber?: string;
  password?: string;
  wallet?: Array<string>;
  socialLinks?: Array<{
    type: string;
    link: string;
  }>;
  role: Array<ROLE>;
  status: STATUS;
  stripeCard?: TStripeCard;
}

export type TLoginResponse = {
  auth: TAuthParams;
  user: IUser;
};
