import { AccountEntity } from "../entities";
import { ErrorEntity } from "../entities/error.entity";
import { BodyRepositoryAbstract } from "./base/base.repository";
import { AccountRepositoryInterface } from "./interface/account/account-repository.interface";

export class AccountRepository
  extends BodyRepositoryAbstract<AccountEntity>
  implements AccountRepositoryInterface
{
  register(entity: AccountEntity): AccountEntity | ErrorEntity {
    this.database.push(entity);
    return this.database.at(-1) ?? entity;
  }
  update(id: string, entity: AccountEntity): AccountEntity | ErrorEntity {
    const errorRepository = new ErrorEntity();
    const accountIndex = this.database.findIndex(
      (account) => account.id === id
    );
    if (accountIndex >= 0) {
      const data = this.database[accountIndex];
      this.database[accountIndex] = {
        ...data,
        ...entity,
        id: id,
      };
      return this.database[accountIndex];
    } else {
      errorRepository.tittle = "Error";
      errorRepository.message = "No se puede actualizar";
      return errorRepository;
    }
  }
  delete(id: string, soft?: boolean | undefined): void | ErrorEntity {
    const account = this.findOneById(id);
    if (soft || soft === undefined) {
      this.softDelete(id);
    } else {
      this.hardDelete(id);
    }
  }
  findAll(): AccountEntity[] | ErrorEntity {
    return this.database.filter((account) => account.deletedAt === undefined);
  }
  findOneById(id: string): AccountEntity | ErrorEntity {
    const errorRepository = new ErrorEntity();
    const accountIndex = this.database.findIndex(
      (account) => account.id === id
    );
    if (accountIndex >= 0) {
      return this.database[accountIndex];
    } else {
      errorRepository.tittle = "Error";
      errorRepository.message = "No se puede encontrar";
      return errorRepository;
    }
  }
  findByState(state: boolean): AccountEntity[] | ErrorEntity {
    const errorRepository = new ErrorEntity();
    let arrayState: AccountEntity[] = [];
    this.database.map((documentType) => {
      if (documentType.state === state) {
        arrayState.push(documentType);
      }
    });
    if (arrayState.length > 0) {
      return arrayState;
    } else {
      errorRepository.tittle = "Error";
      errorRepository.message = "No se puede encontrar";
      return errorRepository;
    }
  }
  findBalanceGreaterThan(balance: number): AccountEntity[] | ErrorEntity {
    let arrayBalanceGreater: AccountEntity[] = [];
    this.database.map((documentType) => {
      if (documentType.balance > balance) {
        arrayBalanceGreater.push(documentType);
      }
    });
    if (arrayBalanceGreater.length > 0) {
      return arrayBalanceGreater;
    } else {
      throw new NotFoundException("No se encontro la informacion");
    }
  }
  findBalanceLessThan(balance: number): AccountEntity[] | ErrorEntity {
    let arrayBalanceLess: AccountEntity[] = [];
    this.database.map((documentType) => {
      if (documentType.balance < balance) {
        arrayBalanceLess.push(documentType);
      }
    });
    if (arrayBalanceLess.length > 0) {
      return arrayBalanceLess;
    } else {
      throw new NotFoundException("No se encontro la informacion");
    }
  }
  findByCustomerId(id: string): AccountEntity | ErrorEntity {
    const accountIndex = this.database.findIndex(
      (account) => account.customer.id === id
    );
    if (accountIndex >= 0) {
      return this.database[accountIndex];
    } else {
      throw new NotFoundException("No se encontro la informacion");
    }
  }
  findByAccountTypeId(id: string): AccountEntity | ErrorEntity {
    const accountIndex = this.database.findIndex(
      (account) => account.accountType.id === id
    );
    if (accountIndex >= 0) {
      return this.database[accountIndex];
    } else {
      throw new NotFoundException("No se encontro la informacion");
    }
  }
  findByDocumentTypeId(id: string): AccountEntity | ErrorEntity {
    const accountIndex = this.database.findIndex(
      (account) => account.customer.documentType.id === id
    );
    if (accountIndex >= 0) {
      return this.database[accountIndex];
    } else {
      throw new NotFoundException("No se encontro la informacion");
    }
  }
  hardDelete(id: string): void | ErrorEntity {
    const accountIndex = this.database.findIndex(
      (account) => account.id === id
    );
    if (accountIndex >= 0) {
      this.database.splice(accountIndex, 1);
    } else {
      throw new NotFoundException("No se encontro ningun elemento");
    }
  }
  softDelete(id: string): void | ErrorEntity {
    const account = this.findOneById(id);
    account.deletedAt = Date.now();
    this.update(id, account);
  }
  findByStateId(id: string): boolean {
    const accountIndex = this.database.findIndex(
      (account) => account.id === id
    );
    if (accountIndex >= 0) {
      return this.database[accountIndex].state;
    } else {
      throw new NotFoundException("No se encontro la informacion");
    }
  }
  changeStateId(id: string, state: boolean): void | ErrorEntity {
    const accountIndex = this.database.findIndex(
      (account) => account.id === id
    );
    if (accountIndex >= 0) {
      const account = this.database[accountIndex];
      account.state = state;
      this.update(id, account);
    } else {
      throw new NotFoundException("No se encontro la informacion");
    }
  }
}
