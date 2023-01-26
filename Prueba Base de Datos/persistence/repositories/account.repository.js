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
exports.AccountRepository = void 0;
var base_repository_1 = require("./base/base.repository");
var AccountRepository = /** @class */ (function (_super) {
    __extends(AccountRepository, _super);
    function AccountRepository() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AccountRepository.prototype.register = function (entity) {
        this.database.push(entity);
        var accountIndex = this.database.findIndex(function (account) { return account.id === entity.id; });
        return this.database[accountIndex];
    };
    AccountRepository.prototype.update = function (id, entity) {
        var accountIndex = this.database.findIndex(function (account) { return account.id === id; });
        var data = this.database[accountIndex];
        this.database[accountIndex] = __assign(__assign(__assign({}, data), entity), { id: id });
        return this.database[accountIndex];
    };
    AccountRepository.prototype["delete"] = function (id, soft) {
        var accountIndex = this.database.findIndex(function (account) { return account.id === id; });
        this.database.splice(accountIndex, 1);
    };
    AccountRepository.prototype.findAll = function () {
        return this.database;
    };
    AccountRepository.prototype.findOneById = function (id) {
        var accountIndex = this.database.findIndex(function (account) { return account.id === id; });
        return this.database[accountIndex];
    };
    AccountRepository.prototype.findByState = function (state) {
        var arrayState = [];
        this.database.map(function (documentType) {
            if (documentType.state === state) {
                arrayState.push(documentType);
            }
        });
        return arrayState;
    };
    AccountRepository.prototype.findBalanceGreaterThan = function (balance) {
        var arrayState = [];
        this.database.map(function (documentType) {
            if (documentType.balance > balance) {
                arrayState.push(documentType);
            }
        });
        return arrayState;
    };
    AccountRepository.prototype.findBalanceLessThan = function (balance) {
        var arrayState = [];
        this.database.map(function (documentType) {
            if (documentType.balance < balance) {
                arrayState.push(documentType);
            }
        });
        return arrayState;
    };
    AccountRepository.prototype.findByCustomerId = function (id) {
        var accountIndex = this.database.findIndex(function (account) { return account.customerId.id === id; });
        return this.database[accountIndex];
    };
    AccountRepository.prototype.findByAccountTypeId = function (id) {
        var accountIndex = this.database.findIndex(function (account) { return account.accountType.id === id; });
        return this.database[accountIndex];
    };
    AccountRepository.prototype.findByDocumentTypeId = function (id) {
        var accountIndex = this.database.findIndex(function (account) { return account.customerId.documentType.id === id; });
        return this.database[accountIndex];
    };
    return AccountRepository;
}(base_repository_1.BodyRepositoryAbstract));
exports.AccountRepository = AccountRepository;
