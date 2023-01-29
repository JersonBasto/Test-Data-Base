import { AccountTypeRepository } from "../persistence/repositories/account-type.repository";
import { AccountRepository } from "../persistence/repositories/account.repository";
import { AccountService } from "../services";
const account = new AccountService(
  new AccountRepository(),
  new AccountTypeRepository()
);
const result1 = account.getBalance("1")
console.log(result1);
