export type TTokenState = {
  name: string;
  amount: number | string;
};

export type TRankingState = {
  name: string;
  amount: number;
  amountTitle: string;
  rankingKey: string;
  rankingValue: string;
  data: {
    title: string;
    amount: number;
  }[];
};

export type TDelegator = {
  startDate: string;
  walletAddress: string;
  adaHandle: string;
  stakeStatus: string;
  policyId: string;
  ipRegion: string;
};

export type TInvoice = {
  id: string;
  amount: string;
  billingDate: string;
  plan: string;
  status: string;
};

export type TProjectPolicy = {
  name: string;
  id: string;
  image: string;
};

export type TProjectSubscription = {
  name: string;
  id: string;
  image: string;
  nextBillingTime: string;
  value: number;
};
