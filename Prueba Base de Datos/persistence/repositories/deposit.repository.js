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
exports.DepositRepository = void 0;
var depositDataBase_1 = require("../../database/depositDataBase");
var error_entity_1 = require("../entities/error.entity");
var base_repository_1 = require("./base/base.repository");
var DepositRepository = /** @class */ (function (_super) {
    __extends(DepositRepository, _super);
    function DepositRepository() {
        var _this = _super.call(this) || this;
        _this.database = depositDataBase_1.depositDataBase;
        return _this;
    }
    DepositRepository.prototype.register = function (entity) {
        var _a;
        this.database.push(entity);
        return (_a = this.database.at(-1)) !== null && _a !== void 0 ? _a : entity;
    };
    DepositRepository.prototype.update = function (id, entity) {
        var errorDeposit = new error_entity_1.ErrorEntity();
        var depositIndex = this.database.findIndex(function (deposit) { return deposit.id === id; });
        var data = this.database[depositIndex];
        this.database[depositIndex] = __assign(__assign(__assign({}, data), entity), { id: id });
        return this.database[depositIndex];
    };
    DepositRepository.prototype["delete"] = function (id, soft) {
        var deposit = this.findOneById(id);
        if (soft || soft === undefined) {
            this.softDelete(id);
        }
        else {
            this.hardDelete(id);
        }
    };
    DepositRepository.prototype.findAll = function () {
        return this.database.filter(function (deposit) { return deposit.deletedAt == undefined; });
    };
    DepositRepository.prototype.findOneById = function (id) {
        var depositIndex = this.database.findIndex(function (deposit) { return deposit.id === id; });
        return this.database[depositIndex];
    };
    DepositRepository.prototype.findByAccountId = function (accountId) {
        var depositIndex = this.database.findIndex(function (deposit) { return deposit.account.id === accountId; });
        return this.database[depositIndex];
    };
    DepositRepository.prototype.findByAccountTypeId = function (accountTypeId) {
        var depositIndex = this.database.findIndex(function (deposit) { return deposit.account.accountType.id === accountTypeId; });
        return this.database[depositIndex];
    };
    DepositRepository.prototype.findByCustomerId = function (customerId) {
        var depositIndex = this.database.findIndex(function (deposit) { return deposit.account.customer.id === customerId; });
        return this.database[depositIndex];
    };
    DepositRepository.prototype.findByEmail = function (email) {
        var depositIndex = this.database.findIndex(function (deposit) { return deposit.account.customer.email === email; });
        return this.database[depositIndex];
    };
    DepositRepository.prototype.findByDocumentTypeId = function (documentTypeId) {
        var depositIndex = this.database.findIndex(function (deposit) { return deposit.account.customer.documentType.id === documentTypeId; });
        return this.database[depositIndex];
    };
    DepositRepository.prototype.findAmountGreaterThan = function (amount) {
        var arrayAmount = [];
        this.database.map(function (deposit) {
            if (deposit.amount > amount) {
                arrayAmount.push(deposit);
            }
        });
        return arrayAmount;
    };
    DepositRepository.prototype.findAmountLessThan = function (amount) {
        var arrayAmount = [];
        this.database.map(function (deposit) {
            if (deposit.amount < amount) {
                arrayAmount.push(deposit);
            }
        });
        return arrayAmount;
    };
    DepositRepository.prototype.hardDelete = function (id) {
        var depositIndex = this.database.findIndex(function (account) { return account.id === id; });
        this.database.splice(depositIndex, 1);
    };
    DepositRepository.prototype.softDelete = function (id) {
        var deposit = this.findOneById(id);
        deposit.deletedAt = Date.now();
        this.update(id, deposit);
    };
    DepositRepository.prototype.findByDateRange = function (id, DateMin, DateMax) {
        var arrayDeposites = this.findAll();
        return arrayDeposites.filter(function (deposit) {
            return deposit.account.id === id &&
                deposit.dateTime >= DateMin &&
                deposit.dateTime <= DateMax;
        });
    };
    return DepositRepository;
}(base_repository_1.BodyRepositoryAbstract));
exports.DepositRepository = DepositRepository;
