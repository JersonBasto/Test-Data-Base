import { AccountModel, DepositModel } from "../../models";
import { AccountEntity } from "./";

export class DepositEntity implements DepositModel {
    id = (Math.random() * (100 - 1 + 1) + 1).toString();
    account: AccountEntity;
    amount = 0;
    dateTime: number | Date;
    deletedAt?: number | Date | undefined;
}