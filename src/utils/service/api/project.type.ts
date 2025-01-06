import { IBasicModel } from "src/types/model";
import { ISubscribeProject } from "./payment.type";

export type TCreateProjectPayload = Partial<IProject>;

export type TPageParams = {
  offset: number;
  limit: number;
  text: string;
};

export enum STATUS {
  NONE = "NONE",
  ENABLED = "ENABLED",
  DISABLED = "DISABLED"
}

export type TTrait = {
  category: string;
  name: string;
  percent: string;
};

export type TCtConfig = {
  veType?: { name: string; description: string };
  ptCadence?: string;
  rewardType?: string;
  airdropInterval?: { title: string; value: number };
  ptPercent?: string;
  periodStart?: string;
  periodEnd?: string;
  period?: { title: string; value: number }[];
};

export type TNFTWallet = {
  enable: boolean;
  ctConfig: TCtConfig;
  traits: TTrait[];
};

export type TTokenWallet = {
  enable: boolean;
  ctConfig: TCtConfig;
};

export type TPartnerCollection = {
  type: string;
  policyId: string;
  percent: string;
  tokenGate: {
    enable: boolean;
    type: string;
    feature: string;
  };
};

export enum EDOAppType {
  TOKEN = "TOKEN",
  NFT = "NFT"
}

export interface IProject extends IBasicModel {
  name: string;
  projectWallet: {
    address: string;
    balance: number;
  };
  title: string;
  description: string;
  logoUrl: string;
  bgImgUrl: string;
  bgColor: string;
  tbColor: string;
  headerBgColor: string;
  hlColor: string;
  btColor: string;
  fontType: string;
  bsFontColor: string;
  titleFontColor: string;
  btFontColor: string;
  tableFontColor: string;
  dexHunter: {
    name?: string;
    code?: string;
  };
  deployUrl?: string;
  socialLinks?: {
    type: string;
    link: string;
  }[];
  status?: STATUS;
  token?: {
    enable: boolean;
    name?: string;
    policyId: string;
    rewardTokenId: string;
    policyGate: {
      enable: boolean;
      type: string;
      feature: string;
    };
    custodial: TTokenWallet;
    nonCustodial: TTokenWallet;
    collections: TPartnerCollection[];
  };
  nft?: {
    enable: boolean;
    name?: string;
    policyId: string;
    rewardTokenId: string;
    policyGate: {
      enable: boolean;
      type: string;
      feature: string;
    };
    custodial: TNFTWallet;
    nonCustodial: TNFTWallet;
    collections: TPartnerCollection[];
  };
  cardanoSetting: {
    projectId?: string;
    projectWalletAddress?: string;
    tokenStaking?: {
      custodialLock: TStakingLock;
      custodialVest: TStakingVest;
      custodialStaking?: string;
    };
  };
}

export type TStakingVest = {
  createdAt: string;
  updatedAt: string;
  partnerSetting: [
    {
      tokenId: string;
      percentage: number;
    }
  ];
  project: string;
  vestingTokenId: string;
  rewardTokenId: string;
  nonce?: string;
  stakeCredHash?: string;
  contractAddress: string;
  stakingSetting: {
    type: string;
    custom: {
      range: {
        start: number;
        end: number;
      };
    };
    durations?: number[];
  };
  rewardSetting: {
    type: string;
    dailyReward: number;
    airdrop: {
      interval: number;
    };
  };
  enabled: boolean;
  _id: string;
};

export type TStakingLock = {
  createdAt: string;
  updatedAt: string;
  partnerSetting: [
    {
      tokenId: string;
      percentage: number;
    }
  ];
  project: string;
  lockingTokenId: string;
  rewardTokenId: string;
  nonce?: string;
  stakeCredHash?: string;
  contractAddress: string;
  stakingSetting: {
    type: string;
    custom?: {
      range: {
        start: number;
        end: number;
      };
    };
    durations?: number[];
  };
  rewardSetting: {
    type: string;
    dailyReward: number;
    airdrop: {
      interval: number;
    };
  };
  enabled: boolean;
  _id: string;
};

export interface IProjectWithPayment extends IProject {
  subscribe?: ISubscribeProject;
}

export enum EINVITATION_STATUS {
  PENDING = "PENDING",
  ACCEPTED = "ACCEPTED",
  REJECTED = "REJECTED"
}

export enum EINVITATION_METHOD {
  WALLET = "WALLET",
  EMAIL = "EMAIL"
}

export interface IInvitation {
  method?: EINVITATION_METHOD;
  receiver?: string;
  sender?: string;
  status?: EINVITATION_STATUS;
}

export interface IActiveProject {
  _id: string;
  projectId: string;
  projectName: string;
  projectUrl: string;
  role: string;
  subscribe?: ISubscribeProject;
  invitation?: IInvitation;
}
