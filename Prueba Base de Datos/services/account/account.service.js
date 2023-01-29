"use strict";
exports.__esModule = true;
exports.AccountService = void 0;
var entities_1 = require("../../persistence/entities");
var AccountService = /** @class */ (function () {
    function AccountService(accountRepository, accountTypeRepository) {
        this.accountRepository = accountRepository;
        this.accountTypeRepository = accountTypeRepository;
    }
    /**
     * Crear una cuenta
     *
     * @param {AccountModel} account
     * @return {*}  {AccountEntity}
     * @memberof AccountService
     */
    AccountService.prototype.createAccount = function (account) {
        var newAccount = new entities_1.AccountEntity();
        newAccount.customer = account.customer;
        newAccount.accountType = account.accountType;
        return this.accountRepository.register(newAccount);
    };
    /**
     * Obtener el balance de una cuenta
     *
     * @param {string} accountId
     * @return {*}  {number}
     * @memberof AccountService
     */
    AccountService.prototype.getBalance = function (accountId) {
        var _a;
        var account = this.accountRepository.findOneById(accountId);
        return (_a = account.balance) !== null && _a !== void 0 ? _a : undefined;
    };
    /**
     * Agregar balance a una cuenta
     *
     * @param {string} accountId
     * @param {number} amount
     * @memberof AccountService
     */
    AccountService.prototype.addBalance = function (accountId, amount) {
        var balance = this.getBalance(accountId);
        if (balance) {
            var account = this.accountRepository.findOneById(accountId);
            account.balance = account.balance + amount;
            this.accountRepository.update(accountId, account);
        }
    };
    /**
     * Remover balance de una cuenta
     *
     * @param {string} accountId
     * @param {number} amount
     * @memberof AccountService
     */
    AccountService.prototype.removeBalance = function (accountId, amount) {
        var balance = this.getBalance(accountId);
        if (balance) {
            var account = this.accountRepository.findOneById(accountId);
            if (account.balance >= amount) {
                account.balance = account.balance - amount;
                this.accountRepository.update(accountId, account);
            }
        }
    };
    /**
     * Verificar la disponibilidad de un monto a retirar en una cuenta
     *
     * @param {string} accountId
     * @param {number} amount
     * @return {*}  {boolean}
     * @memberof AccountService
     */
    AccountService.prototype.verifyAmountIntoBalance = function (accountId, amount) {
        var balance = this.getBalance(accountId);
        if (balance && balance >= amount) {
            return true;
        }
        else {
            return false;
        }
    };
    /**
     * Obtener el estado de una cuenta
     *
     * @param {string} accountId
     * @return {*}  {boolean}
     * @memberof AccountService
     */
    AccountService.prototype.getState = function (accountId) {
        var accountState = this.accountRepository.findByStateId(accountId);
        return accountState;
    };
    /**
     * Cambiar el estado de una cuenta
     *
     * @param {string} accountId
     * @param {boolean} state
     * @memberof AccountService
     */
    AccountService.prototype.changeState = function (accountId, state) {
        var account = this.accountRepository.findOneById(accountId);
        if (account) {
            var accountTypeState = this.accountTypeRepository.findByStateId(account.accountType.id);
            if (accountTypeState) {
                account.state = state;
            }
        }
    };
    /**
     * Obtener el tipo de cuenta de una cuenta
     *
     * @param {string} accountId
     * @return {*}  {AccountTypeEntity}
     * @memberof AccountService
     */
    AccountService.prototype.getAccountType = function (accountId) {
        var account = this.accountRepository.findOneById(accountId);
        return account.accountType;
    };
    /**
     * Cambiar el tipo de cuenta a una cuenta
     *
     * @param {string} accountId
     * @param {string} accountTypeId
     * @return {*}  {AccountTypeEntity}
     * @memberof AccountService
     */
    AccountService.prototype.changeAccountType = function (accountId, accountTypeId) {
        var account = this.accountRepository.findOneById(accountId);
        account.accountType.id = accountTypeId;
        return this.accountTypeRepository.findOneById(accountTypeId);
    };
    /**
     * Borrar una cuenta
     *
     * @param {string} accountId
     * @memberof AccountService
     */
    AccountService.prototype.deleteAccount = function (accountId) {
        var balance = this.getBalance(accountId);
        if (balance > 0) {
            console.log("No se puede eliminar");
        }
        else {
            var state = this.getState(accountId);
            if (state) {
                console.log("No se puede eliminar");
            }
            else {
                this.accountRepository["delete"](accountId);
            }
        }
    };
    return AccountService;
}());
exports.AccountService = AccountService;
