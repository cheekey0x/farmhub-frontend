import { api, wrapResponse } from "cardano-api/lib";
import { IProject } from "src/utils/service/api/project.type";
import { CPtCadence, CRewardType } from "src/constant/project";
import { CreateResponse, TCreatePayload } from "./staking-vest.type";
import Decimal from "decimal.js";

const prefix = "/staking-vest";

const create = async (
  project: Partial<IProject>,
  balance: Decimal,
  payload: string,
  signedMessage: {
    key: string;
    signature: string;
  }
) => {
  const createPayload = mappingProjectToPayload(
    project,
    balance,
    payload,
    signedMessage
  );
  const res = await wrapResponse(
    api.post<CreateResponse>(`${prefix}`, createPayload)
  );
  if (res.ok) {
    return res?.data.contents;
  } else {
    throw new Error(res.error);
  }
};

const update = async (
  project: Partial<IProject>,
  balance: Decimal,
  payload: string,
  signedMessage: {
    key: string;
    signature: string;
  }
) => {
  const updatePayload = mappingProjectToPayload(
    project,
    balance,
    payload,
    signedMessage
  );
  // @ts-ignore
  delete updatePayload.project;
  const res = await wrapResponse(
    api.put<CreateResponse>(
      `${prefix}/?id=${project.cardanoSetting?.tokenStaking?.custodialVest?._id}`,
      updatePayload
    )
  );
  if (res.ok) {
    return res?.data.contents;
  } else {
    throw new Error(res.error);
  }
};

const mappingProjectToPayload = (
  project: Partial<IProject>,
  balance: Decimal,
  payload: string,
  signedMessage: {
    key: string;
    signature: string;
  }
): TCreatePayload => {
  const ctConfig = project?.token?.custodial?.ctConfig;
  const ptPercent =
    Number(project?.token?.custodial?.ctConfig?.ptPercent).valueOf() / 100 ??
    0.8;
  const basePayload = {
    payload,
    signedMessage,
    project: project.cardanoSetting?.projectId ?? "",
    vestingTokenId: project.token?.policyId,
    rewardTokenId: project.token?.rewardTokenId,
    partnerSetting:
      project?.token?.collections?.map((item) => ({
        tokenId: item.policyId,
        percentage: Number(item.percent).valueOf()
      })) ?? [],
    rewardSetting: {
      type: ctConfig?.rewardType ?? "",
      dailyReward: balance.mul(ptPercent).dividedBy(30).ceil().toString(),
      airdrop: {
        interval: ctConfig?.airdropInterval?.value ?? 0
      }
    }
  };

  if (ctConfig?.rewardType !== CRewardType[2]) {
    // @ts-ignore
    delete basePayload.rewardSetting.airdrop;
  }
  if (ctConfig?.ptCadence === CPtCadence[0]) {
    const periodStart = new Date(ctConfig.periodStart || Date.now()).getTime();
    const periodEnd = Math.max(
      new Date(ctConfig.periodEnd || Date.now()).getTime(),
      periodStart + 24 * 60 * 60 * 1000
    );
    const days = Math.max((periodEnd - periodStart) / (1000 * 60 * 60 * 24), 1);
    const dailyReward = balance.mul(ptPercent).dividedBy(days).ceil();
    basePayload.rewardSetting.dailyReward = dailyReward.toString();
    return {
      ...basePayload,
      stakingSetting: {
        type: "Custom",
        custom: {
          range: {
            start: !periodStart ? new Date().getTime() : periodStart,
            end: !periodEnd ? new Date().getTime() : periodEnd
          }
        }
      }
    };
  }
  const durations = ctConfig?.period?.map((item) => item.value) ?? [
    24 * 60 * 60 * 1000,
    30 * 24 * 60 * 60 * 1000
  ];
  const dailyReward = balance.mul(ptPercent).dividedBy(30).ceil().toString();
  basePayload.rewardSetting.dailyReward = dailyReward;
  return {
    ...basePayload,
    stakingSetting: {
      type: "Anniversary",
      anniversary: {
        durations
      }
    }
  };
};

export { create, update };
