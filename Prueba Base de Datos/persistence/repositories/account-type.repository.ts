import { AccountTypeEntity } from "../entities";
import { BodyRepositoryAbstract } from "./base/base.repository";
import { AccountTypeRepositoryInterface } from "./interface/account-type/account-type-repository.interface";
import { AccountRepository } from "./account.repository";

export class AccountTypeRepository
  extends BodyRepositoryAbstract<AccountTypeEntity>
  implements AccountTypeRepositoryInterface
{
  register(entity: AccountTypeEntity): AccountTypeEntity {
    this.database.push(entity);
    return this.database.at(-1) ?? entity;
  }
  update(id: string, entity: AccountTypeEntity): AccountTypeEntity {
    const accountTypeIndex = this.database.findIndex(
      (accountType) => accountType.id === id
    );
    const data = this.database[accountTypeIndex];
    this.database[accountTypeIndex] = {
      ...data,
      ...entity,
      id: id,
    };
    return this.database[accountTypeIndex];
  }
  delete(id: string, soft?: boolean | undefined): void {
    const account = new AccountRepository();
    const result = account.findByAccountTypeId(id);
    if (result) {
      console.log("No se puede eliminar, depende de otra entidad");
    } else {
      const accountTypeIndex = this.database.findIndex(
        (accountType) => accountType.id === id
      );
      this.database.splice(accountTypeIndex, 1);
    }
  }
  findAll(): AccountTypeEntity[] {
    return this.database;
  }
  findOneById(id: string): AccountTypeEntity {
    const accountTypeIndex = this.database.findIndex(
      (accountType) => accountType.id === id
    );
    return this.database[accountTypeIndex];
  }
  findByState(state: boolean): AccountTypeEntity[] {
    let arrayState: AccountTypeEntity[] = [];
    this.database.map((documentType) => {
      if (documentType.state === state) {
        arrayState.push(documentType);
      }
    });
    return arrayState;
  }
  findByName(name: string): AccountTypeEntity[] {
    let arrayName: AccountTypeEntity[] = [];
    this.database.map((accountType) => {
      if (accountType.name.includes(name)) {
        arrayName.push(accountType);
      }
    });
    return arrayName;
  }
  findByStateId(id: string): boolean {
    const accountType = this.findOneById(id);
    return accountType.state;
  }
}
