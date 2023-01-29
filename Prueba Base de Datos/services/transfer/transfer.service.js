"use strict";
exports.__esModule = true;
exports.TransferService = void 0;
var error_entity_1 = require("../../persistence/entities/error.entity");
var TransferService = /** @class */ (function () {
    function TransferService(transferRepository, accountService) {
        this.transferRepository = transferRepository;
        this.accountService = accountService;
    }
    /**
     * Crear una transferencia entre cuentas del banco
     *
     * @param {TransferModel} transfer
     * @return {*}  {TransferEntity}
     * @memberof TransferService
     */
    TransferService.prototype.createTransfer = function (transfer) {
        var errorTransfer = new error_entity_1.ErrorEntity();
        errorTransfer.tittle = "Error";
        var incomeAccount = this.accountService.getState(transfer.income.id);
        var outcomeAccount = this.accountService.getState(transfer.outcome.id);
        if (incomeAccount && outcomeAccount) {
            if (this.accountService.getBalance(transfer.outcome.id) >= transfer.amount) {
                return this.transferRepository.register(transfer);
            }
            else {
                errorTransfer.message =
                    "No se puede realizar la transferencia=> No tiene saldo suficiente";
                return errorTransfer;
            }
        }
        else {
            errorTransfer.message =
                "No se puede realizar la transferencia=> La cuenta esta inactiva";
            return errorTransfer;
        }
    };
    /**
     * Obtener historial de transacciones de salida de una cuenta
     *
     * @param {string} accountId
     * @param {PaginationModel} pagination
     * @param {DataRangeModel} [dataRange]
     * @return {*}  {TransferEntity[]}
     * @memberof TransferService
     */
    TransferService.prototype.getHistoryOut = function (accountId, pagination, dataRange) {
        var arrayTransfer = this.transferRepository.findByOutcomeId(accountId);
        var arrayTransferReturn = [];
        var range = 0;
        pagination.size = arrayTransfer.length;
        if ((dataRange === null || dataRange === void 0 ? void 0 : dataRange.range) === undefined) {
            range = 10;
        }
        else {
            range = dataRange.range;
        }
        pagination.numberPages = Math.round(pagination.size / range);
        for (var x = 1 + range * (pagination.actualPage - 1); x < range + range * (pagination.actualPage - 1); x++) {
            arrayTransferReturn.push(arrayTransfer[x - 1]);
        }
        return arrayTransferReturn;
    };
    /**
     * Obtener historial de transacciones de entrada en una cuenta
     *
     * @param {string} accountId
     * @param {PaginationModel} pagination
     * @param {DataRangeModel} [dataRange]
     * @return {*}  {TransferEntity[]}
     * @memberof TransferService
     */
    TransferService.prototype.getHistoryIn = function (accountId, pagination, dataRange) {
        var arrayTransfer = this.transferRepository.findByIncomeId(accountId);
        var arrayTransferReturn = [];
        var range = 0;
        pagination.size = arrayTransfer.length;
        if ((dataRange === null || dataRange === void 0 ? void 0 : dataRange.range) === undefined) {
            range = 10;
        }
        else {
            range = dataRange.range;
        }
        pagination.numberPages = Math.round(pagination.size / range);
        for (var x = 1 + range * (pagination.actualPage - 1); x < range + range * (pagination.actualPage - 1); x++) {
            arrayTransferReturn.push(arrayTransfer[x - 1]);
        }
        return arrayTransferReturn;
    };
    /**
     * Obtener historial de transacciones de una cuenta
     *
     * @param {string} accountId
     * @param {PaginationModel} pagination
     * @param {DataRangeModel} [dataRange]
     * @return {*}  {TransferEntity[]}
     * @memberof TransferService
     */
    TransferService.prototype.getHistory = function (accountId, pagination, dataRange) {
        var arrayTransfer = this.transferRepository.findByDateRange(accountId, 0, Date.now());
        var arrayTransferReturn = [];
        var range = 0;
        pagination.size = arrayTransfer.length;
        if ((dataRange === null || dataRange === void 0 ? void 0 : dataRange.range) === undefined) {
            range = 10;
        }
        else {
            range = dataRange.range;
        }
        pagination.numberPages = Math.round(pagination.size / range);
        for (var x = 1 + range * (pagination.actualPage - 1); x < range + range * (pagination.actualPage - 1); x++) {
            arrayTransferReturn.push(arrayTransfer[x - 1]);
        }
        return arrayTransferReturn;
    };
    /**
     * Borrar una transacción
     *
     * @param {string} transferId
     * @memberof TransferService
     */
    TransferService.prototype.deleteTransfer = function (transferId) {
        var transfer = this.transferRepository.findOneById(transferId);
        if (transfer.deletedAt === undefined) {
            this.transferRepository["delete"](transferId, true);
        }
        else {
            this.transferRepository["delete"](transferId, false);
        }
    };
    return TransferService;
}());
exports.TransferService = TransferService;
