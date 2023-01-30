import { DepositModel } from "../../models";
import { DataRangeModel } from "../../models/data-range.model";
import { PaginationModel } from "../../models/pagination.model";
import { DepositEntity } from "../../persistence/entities";
import { ErrorEntity } from "../../persistence/entities/error.entity";
import { DepositRepository } from "../../persistence/repositories/deposit.repository";
import { AccountService } from "../account";

export class DepositService {
  constructor(
    private readonly depositRepository: DepositRepository,
    private readonly accountService: AccountService
  ) {}
  /**
   * Crear un deposito
   *
   * @param {DepositModel} deposit
   * @return {*}  {DepositEntity}
   * @memberof DepositService
   */
  createDeposit(deposit: DepositModel): DepositEntity | ErrorEntity {
    const errorDeposit = new ErrorEntity();
    if (this.accountService.getState(deposit.account.id)) {
      deposit.dateTime = Date.now();
      return this.depositRepository.register(deposit);
    } else {
      errorDeposit.tittle = "Error";
      errorDeposit.message = "Tiene un estado Inactivo";
      return errorDeposit;
    }
  }

  /**
   * Borrar un deposito
   *
   * @param {string} depositId
   * @memberof DepositService
   */
  deleteDeposit(depositId: string): void {
    const deposit = this.depositRepository.findOneById(depositId);
    if (deposit.deletedAt === undefined) {
      this.depositRepository.delete(depositId, true);
    } else {
      this.depositRepository.delete(depositId, false);
    }
  }

  /**
   * Obtener el historial de los depósitos en una cuenta
   *
   * @param {string} accountId
   * @param {PaginationModel} pagination
   * @param {DataRangeModel} [dataRange]
   * @return {*}  {DepositEntity[]}
   * @memberof DepositService
   */
  getHistory(
    accountId: string,
    pagination: PaginationModel,
    dataRange?: DataRangeModel
  ): DepositEntity[] {
    const arrayTransfer = this.depositRepository.findByDateRange(
      accountId,
      0,
      9999999999
    );
    const arrayTransferReturn: DepositEntity[] = [];
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
      x < 1 + range + range * (pagination.actualPage - 1);
      x++
    ) {
      arrayTransferReturn.push(arrayTransfer[x - 1]);
    }
    return arrayTransferReturn;
  }
}
