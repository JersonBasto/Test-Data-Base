"use strict";
exports.__esModule = true;
exports.DepositService = void 0;
var error_entity_1 = require("../../persistence/entities/error.entity");
var DepositService = /** @class */ (function () {
    function DepositService(depositRepository, accountService) {
        this.depositRepository = depositRepository;
        this.accountService = accountService;
    }
    /**
     * Crear un deposito
     *
     * @param {DepositModel} deposit
     * @return {*}  {DepositEntity}
     * @memberof DepositService
     */
    DepositService.prototype.createDeposit = function (deposit) {
        var errorDeposit = new error_entity_1.ErrorEntity();
        if (this.accountService.getState(deposit.account.id)) {
            deposit.dateTime = Date.now();
            return this.depositRepository.register(deposit);
        }
        else {
            errorDeposit.tittle = "Error";
            errorDeposit.message = "Tiene un estado Inactivo";
            return errorDeposit;
        }
    };
    /**
     * Borrar un deposito
     *
     * @param {string} depositId
     * @memberof DepositService
     */
    DepositService.prototype.deleteDeposit = function (depositId) {
        var deposit = this.depositRepository.findOneById(depositId);
        if (deposit.deletedAt === undefined) {
            this.depositRepository["delete"](depositId, true);
        }
        else {
            this.depositRepository["delete"](depositId, false);
        }
    };
    /**
     * Obtener el historial de los depósitos en una cuenta
     *
     * @param {string} accountId
     * @param {PaginationModel} pagination
     * @param {DataRangeModel} [dataRange]
     * @return {*}  {DepositEntity[]}
     * @memberof DepositService
     */
    DepositService.prototype.getHistory = function (accountId, pagination, dataRange) {
        var arrayTransfer = this.depositRepository.findByDateRange(accountId, 0, 9999999999);
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
        for (var x = 1 + range * (pagination.actualPage - 1); x < 1 + range + range * (pagination.actualPage - 1); x++) {
            arrayTransferReturn.push(arrayTransfer[x - 1]);
        }
        return arrayTransferReturn;
    };
    return DepositService;
}());
exports.DepositService = DepositService;
