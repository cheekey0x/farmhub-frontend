import { TDelegator } from "src/types/mock";
import { faker } from "@faker-js/faker";

const FakeDelegators = (): TDelegator => {
  const date = faker.date.anytime();
  const status = faker.number.int(2);
  let stakeStatus;
  switch (status) {
    case 0:
      stakeStatus = "Not Active";
      break;
    case 1:
      stakeStatus = "Pending";
      break;
    default:
      stakeStatus = "Active";
  }
  return {
    startDate: `${date.getMonth()}/${date.getDay()}/${date.getFullYear()}`,
    walletAddress: `addr${faker.string.alphanumeric(40)}`,
    adaHandle: `$${faker.string.alpha(6)}`,
    stakeStatus,
    policyId: faker.string.alphanumeric(20),
    ipRegion: faker.location.country()
  };
};

const range = (len: number) => {
  const arr: number[] = [];
  for (let i = 0; i < len; i += 1) {
    arr.push(i);
  }
  return arr;
};

export function makeData(...lens: number[]) {
  const makeDataLevel = (depth = 0): TDelegator[] => {
    const len = lens[depth]!;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return range(len).map(
      (d): TDelegator => ({
        ...FakeDelegators()
      })
    );
  };

  return makeDataLevel();
}
