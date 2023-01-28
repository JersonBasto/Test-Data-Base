import { TransferEntity } from "../../../entities";
import { ErrorEntity } from "../../../entities/error.entity";
import { BodyRepositoryInterface } from "../model-repository.interface";

export interface TransferRepositoryInterface
  extends BodyRepositoryInterface<TransferEntity> {
  findByIncomeId(id: string): TransferEntity | ErrorEntity;
  findByOutcomeId(id: string): TransferEntity | ErrorEntity;
  findByIncomeCustomerId(id: string): TransferEntity | ErrorEntity;
  findByOutcomeCustomerId(id: string): TransferEntity | ErrorEntity;
  findByAmountGreaterThan(amount: number): TransferEntity[] | ErrorEntity;
  findByAmountLessThan(amount: number): TransferEntity[] | ErrorEntity;
  hardDelete(id: string): void | ErrorEntity;
  softDelete(id: string): void | ErrorEntity;
}
