import { IBasicModel } from "src/types/model";

export interface ISubscribeUser extends IBasicModel {
  firstName?: string;
  secondName?: string;
  userEmail?: string;
  phoneNumber?: string;
  message?: string;
}
