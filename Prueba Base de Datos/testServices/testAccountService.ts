import { AccountTypeRepository } from "../persistence/repositories/account-type.repository";
import { AccountRepository } from "../persistence/repositories/account.repository";
import { AccountService } from "../services";
const account = new AccountService(
  new AccountRepository(),
  new AccountTypeRepository()
);
account.addBalance("1", 3000);
account.removeBalance("1", 500);
account.changeAccountType("1", "2");
const result1 = account.getBalance("1");
console.log(result1);
