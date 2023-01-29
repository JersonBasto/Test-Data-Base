import { TransferModel } from "../../models";
import { DataRangeModel } from "../../models/data-range.model";
import { PaginationModel } from "../../models/pagination.model";
import { TransferEntity } from "../../persistence/entities";
import { ErrorEntity } from "../../persistence/entities/error.entity";
import { TransferRespository } from "../../persistence/repositories/transfer.repository";
import { AccountService } from "../account";

export class TransferService {
  constructor(
    private readonly transferRepository: TransferRespository,
    private readonly accountService: AccountService
  ) {}
  /**
   * Crear una transferencia entre cuentas del banco
   *
   * @param {TransferModel} transfer
   * @return {*}  {TransferEntity}
   * @memberof TransferService
   */
  createTransfer(transfer: TransferModel): TransferEntity | ErrorEntity {
    const errorTransfer = new ErrorEntity();
    errorTransfer.tittle = "Error";
    const incomeAccount = this.accountService.getState(transfer.income.id);
    const outcomeAccount = this.accountService.getState(transfer.outcome.id);
    if (incomeAccount && outcomeAccount) {
      if (
        this.accountService.getBalance(transfer.outcome.id) >= transfer.amount
      ) {
        return this.transferRepository.register(transfer);
      } else {
        errorTransfer.message =
          "No se puede realizar la transferencia=> No tiene saldo suficiente";
        return errorTransfer;
      }
    } else {
      errorTransfer.message =
        "No se puede realizar la transferencia=> La cuenta esta inactiva";
      return errorTransfer;
    }
  }

  /**
   * Obtener historial de transacciones de salida de una cuenta
   *
   * @param {string} accountId
   * @param {PaginationModel} pagination
   * @param {DataRangeModel} [dataRange]
   * @return {*}  {TransferEntity[]}
   * @memberof TransferService
   */
  getHistoryOut(
    accountId: string,
    pagination: PaginationModel,
    dataRange?: DataRangeModel
  ): TransferEntity[] {
    const arrayTransfer = this.transferRepository.findByOutcomeId(accountId);
    const arrayTransferReturn: TransferEntity[] = [];
    let range = 0;
    pagination.size = arrayTransfer.length;
    if (dataRange?.range === undefined) {
      range = 10;
    } else {
      range = dataRange.range;
    }
    pagination.numberPages = Math.round(pagination.size / range);
    for (
      let x = 1 + range * (pagination.actualPage - 1);
      x < range + range * (pagination.actualPage - 1);
      x++
    ) {
      arrayTransferReturn.push(arrayTransfer[x - 1]);
    }
    return arrayTransferReturn;
  }

  /**
   * Obtener historial de transacciones de entrada en una cuenta
   *
   * @param {string} accountId
   * @param {PaginationModel} pagination
   * @param {DataRangeModel} [dataRange]
   * @return {*}  {TransferEntity[]}
   * @memberof TransferService
   */
  getHistoryIn(
    accountId: string,
    pagination: PaginationModel,
    dataRange?: DataRangeModel
  ): TransferEntity[] {
    const arrayTransfer = this.transferRepository.findByIncomeId(accountId);
    const arrayTransferReturn: TransferEntity[] = [];
    let range = 0;
    pagination.size = arrayTransfer.length;
    if (dataRange?.range === undefined) {
      range = 10;
    } else {
      range = dataRange.range;
    }
    pagination.numberPages = Math.round(pagination.size / range);
    for (
      let x = 1 + range * (pagination.actualPage - 1);
      x < range + range * (pagination.actualPage - 1);
      x++
    ) {
      arrayTransferReturn.push(arrayTransfer[x - 1]);
    }
    return arrayTransferReturn;
  }

  /**
   * Obtener historial de transacciones de una cuenta
   *
   * @param {string} accountId
   * @param {PaginationModel} pagination
   * @param {DataRangeModel} [dataRange]
   * @return {*}  {TransferEntity[]}
   * @memberof TransferService
   */
  getHistory(
    accountId: string,
    pagination: PaginationModel,
    dataRange?: DataRangeModel
  ): TransferEntity[] {
    const arrayTransfer = this.transferRepository.findByDateRange(
      accountId,
      0,
      Date.now()
    );
    const arrayTransferReturn: TransferEntity[] = [];
    let range = 0;
    pagination.size = arrayTransfer.length;
    if (dataRange?.range === undefined) {
      range = 10;
    } else {
      range = dataRange.range;
    }
    pagination.numberPages = Math.round(pagination.size / range);
    for (
      let x = 1 + range * (pagination.actualPage - 1);
      x < range + range * (pagination.actualPage - 1);
      x++
    ) {
      arrayTransferReturn.push(arrayTransfer[x - 1]);
    }
    return arrayTransferReturn;
  }

  /**
   * Borrar una transacción
   *
   * @param {string} transferId
   * @memberof TransferService
   */
  deleteTransfer(transferId: string): void {
    const transfer = this.transferRepository.findOneById(transferId);
    if (transfer.deletedAt === undefined) {
      this.transferRepository.delete(transferId, true);
    } else {
      this.transferRepository.delete(transferId, false);
    }
  }
}
