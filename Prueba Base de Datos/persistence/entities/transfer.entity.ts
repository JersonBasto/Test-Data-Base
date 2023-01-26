import { TransferModel } from "../../models";
import { AccountEntity } from "./";

export class TransferEntity implements TransferModel {
  id = (Math.random() * (100 - 1 + 1) + 1).toString();
  outcome: AccountEntity;
  income: AccountEntity;
  amount = 0;
  reason: string;
  dateTime: number | Date;
  deletedAt?: number | Date | undefined;
}
