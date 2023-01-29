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
        var _a;
        this.database.push(entity);
        return (_a = this.database.at(-1)) !== null && _a !== void 0 ? _a : entity;
    };
    AccountRepository.prototype.update = function (id, entity) {
        var accountIndex = this.database.findIndex(function (account) { return account.id === id; });
        var data = this.database[accountIndex];
        this.database[accountIndex] = __assign(__assign(__assign({}, data), entity), { id: id });
        return this.database[accountIndex];
    };
    AccountRepository.prototype["delete"] = function (id, soft) {
        var account = this.findOneById(id);
        if (soft || soft === undefined) {
            this.softDelete(id);
        }
        else {
            this.hardDelete(id);
        }
    };
    AccountRepository.prototype.findAll = function () {
        return this.database.filter(function (account) { return account.deletedAt === undefined; });
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
        var arrayBalanceGreater = [];
        this.database.map(function (documentType) {
            if (documentType.balance > balance) {
                arrayBalanceGreater.push(documentType);
            }
        });
        return arrayBalanceGreater;
    };
    AccountRepository.prototype.findBalanceLessThan = function (balance) {
        var arrayBalanceLess = [];
        this.database.map(function (documentType) {
            if (documentType.balance < balance) {
                arrayBalanceLess.push(documentType);
            }
        });
        return arrayBalanceLess;
    };
    AccountRepository.prototype.findByCustomerId = function (id) {
        var accountIndex = this.database.findIndex(function (account) { return account.customer.id === id; });
        return this.database[accountIndex];
    };
    AccountRepository.prototype.findByAccountTypeId = function (id) {
        var accountIndex = this.database.findIndex(function (account) { return account.accountType.id === id; });
        return this.database[accountIndex];
    };
    AccountRepository.prototype.findByDocumentTypeId = function (id) {
        var accountIndex = this.database.findIndex(function (account) { return account.customer.documentType.id === id; });
        return this.database[accountIndex];
    };
    AccountRepository.prototype.hardDelete = function (id) {
        var accountIndex = this.database.findIndex(function (account) { return account.id === id; });
        this.database.splice(accountIndex, 1);
    };
    AccountRepository.prototype.softDelete = function (id) {
        var account = this.findOneById(id);
        account.deletedAt = Date.now();
        this.update(id, account);
    };
    AccountRepository.prototype.findByStateId = function (id) {
        var accountIndex = this.database.findIndex(function (account) { return account.id === id; });
        return this.database[accountIndex].state;
    };
    AccountRepository.prototype.changeStateId = function (id, state) {
        var accountIndex = this.database.findIndex(function (account) { return account.id === id; });
        var account = this.database[accountIndex];
        account.state = state;
        this.update(id, account);
    };
    return AccountRepository;
}(base_repository_1.BodyRepositoryAbstract));
exports.AccountRepository = AccountRepository;
