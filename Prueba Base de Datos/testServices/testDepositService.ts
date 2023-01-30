import { DataRangeEntity } from "../persistence/entities/data-range.entity";
import { PaginationEntity } from "../persistence/entities/pagination.entity";
import { AccountTypeRepository } from "../persistence/repositories/account-type.repository";
import { AccountRepository } from "../persistence/repositories/account.repository";
import { DepositRepository } from "../persistence/repositories/deposit.repository";
import { AccountService, DepositService } from "../services";

const deposit = new DepositService(
  new DepositRepository(),
  new AccountService(new AccountRepository(), new AccountTypeRepository())
);
const pagination = new PaginationEntity();
pagination.actualPage = 5;
const dataRange = new DataRangeEntity();
dataRange.range = 2;
const result = deposit.getHistory("1", pagination, dataRange);
console.log(result)
