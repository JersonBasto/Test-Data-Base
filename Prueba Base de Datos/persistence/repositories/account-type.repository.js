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
exports.AccountTypeRepository = void 0;
var base_repository_1 = require("./base/base.repository");
var account_repository_1 = require("./account.repository");
var AccountTypeRepository = /** @class */ (function (_super) {
    __extends(AccountTypeRepository, _super);
    function AccountTypeRepository() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AccountTypeRepository.prototype.register = function (entity) {
        var _a;
        this.database.push(entity);
        return (_a = this.database.at(-1)) !== null && _a !== void 0 ? _a : entity;
    };
    AccountTypeRepository.prototype.update = function (id, entity) {
        var accountTypeIndex = this.database.findIndex(function (accountType) { return accountType.id === id; });
        var data = this.database[accountTypeIndex];
        this.database[accountTypeIndex] = __assign(__assign(__assign({}, data), entity), { id: id });
        return this.database[accountTypeIndex];
    };
    AccountTypeRepository.prototype["delete"] = function (id, soft) {
        var account = new account_repository_1.AccountRepository();
        var result = account.findByAccountTypeId(id);
        if (result) {
            console.log("No se puede eliminar, depende de otra entidad");
        }
        else {
            var accountTypeIndex = this.database.findIndex(function (accountType) { return accountType.id === id; });
            this.database.splice(accountTypeIndex, 1);
        }
    };
    AccountTypeRepository.prototype.findAll = function () {
        return this.database;
    };
    AccountTypeRepository.prototype.findOneById = function (id) {
        var accountTypeIndex = this.database.findIndex(function (accountType) { return accountType.id === id; });
        return this.database[accountTypeIndex];
    };
    AccountTypeRepository.prototype.findByState = function (state) {
        var arrayState = [];
        this.database.map(function (documentType) {
            if (documentType.state === state) {
                arrayState.push(documentType);
            }
        });
        return arrayState;
    };
    AccountTypeRepository.prototype.findByName = function (name) {
        var arrayName = [];
        this.database.map(function (accountType) {
            if (accountType.name.includes(name)) {
                arrayName.push(accountType);
            }
        });
        return arrayName;
    };
    AccountTypeRepository.prototype.findByStateId = function (id) {
        var accountType = this.findOneById(id);
        return accountType.state;
    };
    return AccountTypeRepository;
}(base_repository_1.BodyRepositoryAbstract));
exports.AccountTypeRepository = AccountTypeRepository;
