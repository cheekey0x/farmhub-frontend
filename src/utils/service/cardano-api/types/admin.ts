import { BaseMongoDBDocument } from "./common";

type Admin = Partial<
  BaseMongoDBDocument & {
    address: string;
  }
>;

export type { Admin };
