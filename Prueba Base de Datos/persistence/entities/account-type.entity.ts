import { AccountTypeModel } from "../../models";

export class AccountTypeEntity implements AccountTypeModel {
  id = (Math.random() * (100 - 1 + 1) + 1).toString();
  name: string;
  state = true;
}
