import { AccountModel } from "../../models";
import { AccountTypeEntity, CustomerEntity } from ".";

export class AccountEntity implements AccountModel {
  id = (Math.random() * (100 - 1 + 1) + 1).toString();
  customerId: CustomerEntity;
  accountType: AccountTypeEntity;
  balance = 0;
  state = true;
  deletedAt?: number | Date;
}
