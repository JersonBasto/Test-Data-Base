import { AccountTypeEntity } from "../entities";
import { BodyRepositoryAbstract } from "./base/base.repository";
import { AccountTypeRepositoryInterface } from "./interface/account-type/account-type-repository.interface";

export class AccountTypeRepository
  extends BodyRepositoryAbstract<AccountTypeEntity>
  implements AccountTypeRepositoryInterface
{
  register(entity: AccountTypeEntity): AccountTypeEntity {
    this.database.push(entity);
    const accountTypeIndex = this.database.findIndex(
      (customer) => customer.id === entity.id
    );
    return this.database[accountTypeIndex];
  }
  update(id: string, entity: AccountTypeEntity): AccountTypeEntity {
    const accountTypeIndex = this.database.findIndex(
      (customer) => customer.id === id
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
    const accountTypeIndex = this.database.findIndex(
      (customer) => customer.id === id
    );
    this.database.splice(accountTypeIndex, 1);
  }
  findAll(): AccountTypeEntity[] {
    return this.database;
  }
  findOneById(id: string): AccountTypeEntity {
    const accountTypeIndex = this.database.findIndex(
      (customer) => customer.id === id
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
}
