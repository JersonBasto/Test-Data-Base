import { TransferEntity } from "../entities";
import { BodyRepositoryAbstract } from "./base/base.repository";
import { TransferRepositoryInterface } from "./interface/transfer/transfer-repository.interface";

export class TransferRespository
  extends BodyRepositoryAbstract<TransferEntity>
  implements TransferRepositoryInterface
{
  register(entity: TransferEntity): TransferEntity {
    this.database.push(entity);
    return this.database.at(-1) ?? entity;
  }
  update(id: string, entity: TransferEntity): TransferEntity {
    const transferIndex = this.database.findIndex(
      (transfer) => transfer.id === id
    );
    const data = this.database[transferIndex];
    this.database[transferIndex] = {
      ...data,
      ...entity,
      id: id,
    };
    return this.database[transferIndex];
  }
  delete(id: string, soft?: boolean | undefined): void {
    const transfer = this.findOneById(id);
    if (soft || soft === undefined) {
      this.softDelete(id);
    } else {
      this.hardDelete(id);
    }
  }
  findAll(): TransferEntity[] {
    return this.database.filter((transfer) => transfer.deletedAt === undefined);
  }
  findOneById(id: string): TransferEntity {
    const transferIndex = this.database.findIndex(
      (transfer) => transfer.id === id
    );
    return this.database[transferIndex];
  }
  findByIncomeCustomerId(id: string): TransferEntity {
    const transferIndex = this.database.findIndex(
      (transfer) => transfer.income.customer.id === id
    );
    return this.database[transferIndex];
  }
  findByIncomeId(id: string): TransferEntity[] {
    const transferArray = this.database.filter(
      (transfer) => transfer.income.id === id
    );
    return transferArray;
  }
  findByOutcomeId(id: string): TransferEntity[] {
    const transferArray = this.database.filter(
      (transfer) => transfer.outcome.id === id
    );
    return transferArray;
  }
  findByOutcomeCustomerId(id: string): TransferEntity {
    const transferIndex = this.database.findIndex(
      (transfer) => transfer.outcome.customer.id === id
    );
    return this.database[transferIndex];
  }
  findByAmountGreaterThan(amount: number): TransferEntity[] {
    let arrayAmount: TransferEntity[] = [];
    this.database.map((transfer) => {
      if (transfer.amount > amount) {
        arrayAmount.push(transfer);
      }
    });
    return arrayAmount;
  }
  findByAmountLessThan(amount: number): TransferEntity[] {
    let arrayAmount: TransferEntity[] = [];
    this.database.map((transfer) => {
      if (transfer.amount < amount) {
        arrayAmount.push(transfer);
      }
    });
    return arrayAmount;
  }
  hardDelete(id: string): void {
    const transferIndex = this.database.findIndex(
      (transfer) => transfer.id === id
    );
    this.database.splice(transferIndex, 1);
  }
  softDelete(id: string): void {
    const transfer = this.findOneById(id);
    transfer.deletedAt = Date.now();
    this.update(id, transfer);
  }
  sortByDate(date: number | Date): TransferEntity[] {
    let arrayDate: TransferEntity[] = [];
    arrayDate = this.database.sort();
    return arrayDate;
  }
  findByDateRange(
    id: string,
    DateMin: number | Date,
    DateMax: Number | Date
  ): TransferEntity[] {
    const arrayTransfers = this.findAll();
    return arrayTransfers.filter(
      (transfer) =>
        transfer.id === id &&
        transfer.dateTime >= DateMin &&
        transfer.dateTime <= DateMax
    );
  }
}
