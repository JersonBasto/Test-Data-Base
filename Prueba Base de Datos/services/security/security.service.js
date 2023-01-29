"use strict";
exports.__esModule = true;
exports.SecurityService = void 0;
var entities_1 = require("../../persistence/entities");
var error_entity_1 = require("../../persistence/entities/error.entity");
var SecurityService = /** @class */ (function () {
    function SecurityService(customerRepository, accountService) {
        this.customerRepository = customerRepository;
        this.accountService = accountService;
    }
    /**
     * Identificarse en el sistema
     *
     * @param {CustomerModel} user
     * @return {*}  {string}
     * @memberof SecurityService
     */
    SecurityService.prototype.signIn = function (user) {
        var errorSecurity = new error_entity_1.ErrorEntity();
        var answer = this.customerRepository.findEmailAndPassword(user.email, user.password);
        if (answer)
            return "Falta retornar un JWT";
        else {
            errorSecurity.tittle = "Error";
            errorSecurity.message = "Datos de identificación inválidos";
            return errorSecurity;
        }
    };
    /**
     * Crear usuario en el sistema
     *
     * @param {CustomerModel} user
     * @return {*}  {string}
     * @memberof SecurityService
     */
    SecurityService.prototype.signUp = function (user) {
        var newCustomer = new entities_1.CustomerEntity();
        newCustomer.documentType = user.documentType;
        newCustomer.document = user.document;
        newCustomer.fullName = user.fullName;
        newCustomer.email = user.email;
        newCustomer.phone = user.phone;
        newCustomer.password = user.password;
        var customer = this.customerRepository.register(newCustomer);
        var errorSecurity = new error_entity_1.ErrorEntity();
        errorSecurity.tittle = "Error";
        if (customer) {
            var accountType = new entities_1.AccountTypeEntity();
            accountType.id = "Falta el ID por defecto del tipo de cuenta";
            var newAccount = new entities_1.AccountEntity();
            newAccount.customer = customer;
            newAccount.accountType = accountType;
            var account = this.accountService.createAccount(newAccount);
            if (account)
                return "Falta retornar un JWT";
            else {
                errorSecurity.message = "No se ha podido iniciar sesion";
                return errorSecurity;
            }
        }
        else {
            errorSecurity.message = "No se ha podido crear la cuentas";
            return errorSecurity;
        }
    };
    /**
     * Salir del sistema
     *
     * @param {string} JWToken
     * @memberof SecurityService
     */
    SecurityService.prototype.signOut = function (JWToken) {
        throw new Error("Method not implemented.");
    };
    return SecurityService;
}());
exports.SecurityService = SecurityService;
