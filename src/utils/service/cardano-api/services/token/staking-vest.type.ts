import { SuccessResponse } from "cardano-api/lib";

type CreateResponse = SuccessResponse<{
  stakingVest: {
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
    nonce: string;
    stakeCredHash: string;
    contractAddress: string;
    stakingSetting: {
      type: string;
      custom: {
        range: {
          start: number;
          end: number;
        };
      };
    };
    rewardSetting: {
      type: string;
      dailyReward: string;
      airdrop: {
        interval: number;
      };
    };
    enabled: boolean;
    _id: string;
  };
}>;

type TCreatePayload = {
  payload: string;
  signedMessage: {
    key: string;
    signature: string;
  };
  project: string;
  vestingTokenId?: string;
  rewardTokenId?: string;
  stakingSetting?: {
    type: string;
    custom?: {
      range: {
        start: number;
        end: number;
      };
    };
    anniversary?: {
      durations: number[];
    };
  };
  rewardSetting?: {
    type: string;
    dailyReward: string;
    airdrop?: {
      interval: number;
    };
  };
  partnerSetting?: {
    tokenId?: string;
    percentage?: number;
  }[];
};

type GetResponse = CreateResponse;

export type { GetResponse, CreateResponse, TCreatePayload };
