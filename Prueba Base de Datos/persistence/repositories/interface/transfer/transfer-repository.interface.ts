import { TransferEntity } from "../../../entities";
import { ErrorEntity } from "../../../entities/error.entity";
import { BodyRepositoryInterface } from "../model-repository.interface";

export interface TransferRepositoryInterface
  extends BodyRepositoryInterface<TransferEntity> {
  findByIncomeId(id: string): TransferEntity[];
  findByOutcomeId(id: string): TransferEntity[];
  findByIncomeCustomerId(id: string): TransferEntity;
  findByOutcomeCustomerId(id: string): TransferEntity;
  findByAmountGreaterThan(amount: number): TransferEntity[];
  findByAmountLessThan(amount: number): TransferEntity[];
  hardDelete(id: string): void;
  softDelete(id: string): void;
  sortByDate(date: number | Date): TransferEntity[]
  findByDateRange(id: string, DateMin: Date | number, DateMax: Date | Number): TransferEntity[]
}
