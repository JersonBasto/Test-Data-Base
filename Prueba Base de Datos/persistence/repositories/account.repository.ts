import { AccountEntity } from "../entities";
import { BodyRepositoryAbstract } from "./base/base.repository";
import { AccountRepositoryInterface } from "./interface/account/account-repository.interface";

export class AccountRepository
  extends BodyRepositoryAbstract<AccountEntity>
  implements AccountRepositoryInterface {
  register(entity: AccountEntity): AccountEntity {
    this.database.push(entity);
    const accountIndex = this.database.findIndex(
      (account) => account.id === entity.id
    );
    return this.database[accountIndex];
  }
  update(id: string, entity: AccountEntity): AccountEntity {
    const accountIndex = this.database.findIndex(
      (account) => account.id === id && (account.deletedAt ?? true) === true
    );
    if (accountIndex >= 0) {
      const data = this.database[accountIndex];
      this.database[accountIndex] = {
        ...data,
        ...entity,
        id: id,
      };
    }
    else {
      throw new Error("No se encontro el dato buscado")
    }

    return this.database[accountIndex];
  }
  delete(id: string, soft?: boolean | undefined): void {
    const account = this.findOneById(id)
    if (soft || soft === undefined) {
      account.deletedAt = Date.now()
      this.update(id, account)
    }
    else {
      const accountIndex = this.database.findIndex(
        (account) => account.id === id
      );
      this.database.splice(accountIndex, 1);
    }
  }
  findAll(): AccountEntity[] {
    return this.database.filter(account => account.deletedAt === undefined);
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
    let arrayState: AccountEntity[] = [];
    this.database.map((documentType) => {
      if (documentType.balance > balance) {
        arrayState.push(documentType);
      }
    });
    return arrayState;
  }
  findBalanceLessThan(balance: number): AccountEntity[] {
    let arrayState: AccountEntity[] = [];
    this.database.map((documentType) => {
      if (documentType.balance < balance) {
        arrayState.push(documentType);
      }
    });
    return arrayState;
  }
  findByCustomerId(id: string): AccountEntity {
    const accountIndex = this.database.findIndex(
      (account) => account.customerId.id === id
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
      (account) => account.customerId.documentType.id === id
    );
    return this.database[accountIndex];
  }
}
