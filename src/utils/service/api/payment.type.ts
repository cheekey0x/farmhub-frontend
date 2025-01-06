import {
  EPaymentType,
  ESubscriptionPlan,
  ESubscriptionPayPeriod
} from "src/constant/project";
import { IBasicModel } from "src/types/model";
import { TStripeCard } from "./auth.type";

export interface IPaymentModel extends IBasicModel {
  subscribeId?: string;
  userId?: string;
  projectId?: string;
  subscribeType?: ESubscriptionPlan;
  period?: ESubscriptionPayPeriod;
  paymentType?: EPaymentType;
  discountCode?: string;
  pmId?: string;
  stripeCard?: TStripeCard;
  wallet?: string;
}

export type TSubscribePayload = {
  subscribeType?: ESubscriptionPlan;
  period?: ESubscriptionPayPeriod;
  paymentType?: EPaymentType;
  pmId?: string;
  discountCode?: string;
  projectId?: string;
};

export interface ISubscribeProject extends IBasicModel {
  userId?: string;
  projectId?: string;
  subscribeType?: ESubscriptionPlan;
  period?: ESubscriptionPayPeriod;
  paymentType?: EPaymentType;
  discountCode?: string;
  pmId?: string;
  stripeCard?: TStripeCard;
  wallet?: string;
  stripeSubscribeId?: string;
  walletTxHash?: string;
  subscribePlan?: {
    startDay?: string;
    endDay?: string;
    status?: string;
  };
}
