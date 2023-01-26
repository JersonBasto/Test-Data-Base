"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.TransferRespository = void 0;
var base_repository_1 = require("./base/base.repository");
var TransferRespository = /** @class */ (function (_super) {
    __extends(TransferRespository, _super);
    function TransferRespository() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TransferRespository.prototype.register = function (entity) {
        this.database.push(entity);
        var transferIndex = this.database.findIndex(function (transfer) { return transfer.id === entity.id; });
        return this.database[transferIndex];
    };
    TransferRespository.prototype.update = function (id, entity) {
        var transferIndex = this.database.findIndex(function (transfer) { return transfer.id === id; });
        var data = this.database[transferIndex];
        this.database[transferIndex] = __assign(__assign(__assign({}, data), entity), { id: id });
        return this.database[transferIndex];
    };
    TransferRespository.prototype["delete"] = function (id, soft) {
        var transfer = this.findOneById(id);
        if (soft || soft === undefined) {
            transfer.deletedAt = Date.now();
            this.update(id, transfer);
        }
        else {
            var transferIndex = this.database.findIndex(function (account) { return account.id === id; });
            this.database.splice(transferIndex, 1);
        }
    };
    TransferRespository.prototype.findAll = function () {
        return this.database.filter(function (transfer) { return transfer.deletedAt === undefined; });
    };
    TransferRespository.prototype.findOneById = function (id) {
        var transferIndex = this.database.findIndex(function (transfer) { return transfer.id === id; });
        return this.database[transferIndex];
    };
    TransferRespository.prototype.findByIncomeCustomerId = function (id) {
        var transferIndex = this.database.findIndex(function (transfer) { return transfer.income.customerId.id === id; });
        return this.database[transferIndex];
    };
    TransferRespository.prototype.findByIncomeId = function (id) {
        var transferIndex = this.database.findIndex(function (transfer) { return transfer.income.id === id; });
        return this.database[transferIndex];
    };
    TransferRespository.prototype.findByOutcomeId = function (id) {
        var transferIndex = this.database.findIndex(function (transfer) { return transfer.outcome.id === id; });
        return this.database[transferIndex];
    };
    TransferRespository.prototype.findByOutcomeCustomerId = function (id) {
        var transferIndex = this.database.findIndex(function (transfer) { return transfer.outcome.customerId.id === id; });
        return this.database[transferIndex];
    };
    TransferRespository.prototype.findByAmountGreaterThan = function (amount) {
        var arrayAmount = [];
        this.database.map(function (transfer) {
            if (transfer.amount > amount) {
                arrayAmount.push(transfer);
            }
        });
        return arrayAmount;
    };
    TransferRespository.prototype.findByAmountLessThan = function (amount) {
        var arrayAmount = [];
        this.database.map(function (transfer) {
            if (transfer.amount < amount) {
                arrayAmount.push(transfer);
            }
        });
        return arrayAmount;
    };
    TransferRespository.prototype.hardDelete = function (id) {
        var transferIndex = this.database.findIndex(function (account) { return account.id === id; });
        this.database.splice(transferIndex, 1);
    };
    TransferRespository.prototype.softDelete = function (id) {
        var transfer = this.findOneById(id);
        transfer.deletedAt = Date.now();
        this.update(id, transfer);
    };
    return TransferRespository;
}(base_repository_1.BodyRepositoryAbstract));
exports.TransferRespository = TransferRespository;
