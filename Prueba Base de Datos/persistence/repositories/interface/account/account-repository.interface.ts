import { AccountEntity } from "../../../entities";
import { ErrorEntity } from "../../../entities/error.entity";
import { BodyRepositoryInterface } from "../model-repository.interface";

export interface AccountRepositoryInterface
  extends BodyRepositoryInterface<AccountEntity> {
  findByState(state: boolean): AccountEntity[] | ErrorEntity;
  findBalanceGreaterThan(balance: number): AccountEntity[] | ErrorEntity;
  findBalanceLessThan(balance: number): AccountEntity[] | ErrorEntity;
  findByCustomerId(id: string): AccountEntity | ErrorEntity;
  findByDocumentTypeId(id: string): AccountEntity | ErrorEntity;
  findByAccountTypeId(id: string): AccountEntity | ErrorEntity;
  hardDelete(id: string): void | ErrorEntity;
  softDelete(id: string): void;
  findByStateId(id: string): boolean | ErrorEntity;
  changeStateId(id: string, state: boolean): void | ErrorEntity;
}
