import { accountDataBase } from "../../database/accountDataBase";
import { AccountEntity } from "../entities";
import { BodyRepositoryAbstract } from "./base/base.repository";
import { AccountRepositoryInterface } from "./interface/account/account-repository.interface";

export class AccountRepository
  extends BodyRepositoryAbstract<AccountEntity>
  implements AccountRepositoryInterface
{
  constructor() {
    super();
    this.database = accountDataBase;
  }
  register(entity: AccountEntity): AccountEntity {
    this.database.push(entity);
    return this.database.at(-1) ?? entity;
  }
  update(id: string, entity: AccountEntity): AccountEntity {
    const accountIndex = this.database.findIndex(
      (account) => account.id === id
    );
    const data = this.database[accountIndex];
    this.database[accountIndex] = {
      ...data,
      ...entity,
      id: id,
    };
    return this.database[accountIndex];
  }
  delete(id: string, soft?: boolean | undefined): void {
    const account = this.findOneById(id);
    if (soft || soft === undefined) {
      this.softDelete(id);
    } else {
      this.hardDelete(id);
    }
  }
  findAll(): AccountEntity[] {
    return this.database.filter((account) => account.deletedAt === undefined);
  }
  findOneById(id: string): AccountEntity {
    const accountIndex = this.database.findIndex(
      (account) => account.id === id
    );
    return this.database[accountIndex];
  }
  findByState(state: boolean): AccountEntity[] {
    let arrayState: AccountEntity[] = [];
    this.database.map((documentType) => {
      if (documentType.state === state) {
        arrayState.push(documentType);
      }
    });
    return arrayState;
  }
  findBalanceGreaterThan(balance: number): AccountEntity[] {
    let arrayBalanceGreater: AccountEntity[] = [];
    this.database.map((documentType) => {
      if (documentType.balance > balance) {
        arrayBalanceGreater.push(documentType);
      }
    });
    return arrayBalanceGreater;
  }
  findBalanceLessThan(balance: number): AccountEntity[] {
    let arrayBalanceLess: AccountEntity[] = [];
    this.database.map((documentType) => {
      if (documentType.balance < balance) {
        arrayBalanceLess.push(documentType);
      }
    });
    return arrayBalanceLess;
  }
  findByCustomerId(id: string): AccountEntity {
    const accountIndex = this.database.findIndex(
      (account) => account.customer.id === id
    );
    return this.database[accountIndex];
  }
  findByAccountTypeId(id: string): AccountEntity {
    const accountIndex = this.database.findIndex(
      (account) => account.accountType.id === id
    );
    return this.database[accountIndex];
  }
  findByDocumentTypeId(id: string): AccountEntity {
    const accountIndex = this.database.findIndex(
      (account) => account.customer.documentType.id === id
    );
    return this.database[accountIndex];
  }
  hardDelete(id: string): void {
    const accountIndex = this.database.findIndex(
      (account) => account.id === id
    );
    this.database.splice(accountIndex, 1);
  }
  softDelete(id: string): void {
    const account = this.findOneById(id);
    account.deletedAt = Date.now();
    this.update(id, account);
  }
  findByStateId(id: string): boolean {
    const accountIndex = this.database.findIndex(
      (account) => account.id === id
    );
    return this.database[accountIndex].state;
  }
  changeStateId(id: string, state: boolean): void {
    const accountIndex = this.database.findIndex(
      (account) => account.id === id
    );
    const account = this.database[accountIndex];
    account.state = state;
    this.update(id, account);
  }
}
