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
var base_repository_1 = require("./base/base.repository");
var DepositRepository = /** @class */ (function (_super) {
    __extends(DepositRepository, _super);
    function DepositRepository() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DepositRepository.prototype.register = function (entity) {
        this.database.push(entity);
        var depositIndex = this.database.findIndex(function (deposit) { return deposit.id === entity.id; });
        return this.database[depositIndex];
    };
    DepositRepository.prototype.update = function (id, entity) {
        var depositIndex = this.database.findIndex(function (deposit) { return deposit.id === id; });
        var data = this.database[depositIndex];
        this.database[depositIndex] = __assign(__assign(__assign({}, data), entity), { id: id });
        return this.database[depositIndex];
    };
    DepositRepository.prototype["delete"] = function (id, soft) {
        var deposit = this.findOneById(id);
        if (soft || soft === undefined) {
            deposit.deletedAt = Date.now();
            this.update(id, deposit);
        }
        else {
            var depositIndex = this.database.findIndex(function (deposit) { return deposit.id === id; });
            this.database.splice(depositIndex, 1);
        }
    };
    DepositRepository.prototype.findAll = function () {
        return this.database.filter(function (deposit) { return deposit.deletedAt === undefined; });
    };
    DepositRepository.prototype.findOneById = function (id) {
        var depositIndex = this.database.findIndex(function (deposit) { return deposit.id === id; });
        return this.database[depositIndex];
    };
    DepositRepository.prototype.findByAccountId = function (accountId) {
        var depositIndex = this.database.findIndex(function (deposit) { return deposit.accountId.id === accountId; });
        return this.database[depositIndex];
    };
    DepositRepository.prototype.findByAccountTypeId = function (accountTypeId) {
        var depositIndex = this.database.findIndex(function (deposit) { return deposit.accountId.accountType.id === accountTypeId; });
        return this.database[depositIndex];
    };
    DepositRepository.prototype.findByCustomerId = function (customerId) {
        var depositIndex = this.database.findIndex(function (deposit) { return deposit.accountId.customerId.id === customerId; });
        return this.database[depositIndex];
    };
    DepositRepository.prototype.findByEmail = function (email) {
        var depositIndex = this.database.findIndex(function (deposit) { return deposit.accountId.customerId.email === email; });
        return this.database[depositIndex];
    };
    DepositRepository.prototype.findByDocumentTypeId = function (documentTypeId) {
        var depositIndex = this.database.findIndex(function (deposit) {
            return deposit.accountId.customerId.documentType.id === documentTypeId;
        });
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
    return DepositRepository;
}(base_repository_1.BodyRepositoryAbstract));
exports.DepositRepository = DepositRepository;
