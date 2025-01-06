import { TInvoice } from "src/types/mock";
import { faker } from "@faker-js/faker";

const FakeDelegators = (): TInvoice => {
  const date = faker.date.anytime();
  const status = faker.number.int(2);
  const plan = faker.number.int(2);
  const amount = faker.number.float(100);
  let billingPlan;
  let billingStatus;
  switch (status) {
    case 0:
      billingStatus = "Failed";
      break;
    case 1:
      billingStatus = "Paid";
      break;
    default:
      billingStatus = "Pending";
  }
  switch (plan) {
    case 0:
      billingPlan = "Hobbyist";
      break;
    case 1:
      billingPlan = "Business";
      break;
    default:
      billingPlan = "Enterprise";
  }
  return {
    id: `${faker.string.alphanumeric(12)}`,
    billingDate: `${date.getMonth()}/${date.getDay()}/${date.getFullYear()}`,
    amount: amount.toString(),
    plan: billingPlan,
    status: billingStatus
  };
};

const range = (len: number) => {
  const arr: number[] = [];
  for (let i = 0; i < len; i += 1) {
    arr.push(i);
  }
  return arr;
};

export function makeInvoiceFakeData(...lens: number[]) {
  const makeDataLevel = (depth = 0): TInvoice[] => {
    const len = lens[depth]!;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return range(len).map(
      (d): TInvoice => ({
        ...FakeDelegators()
      })
    );
  };

  return makeDataLevel();
}
