"use strict";
exports.__esModule = true;
exports.CustomerService = void 0;
var error_entity_1 = require("../../persistence/entities/error.entity");
var CustomerService = /** @class */ (function () {
    function CustomerService(customerRepository) {
        this.customerRepository = customerRepository;
    }
    /**
     * Obtener información de un cliente
     *
     * @param {string} customerId
     * @return {*}  {CustomerEntity}
     * @memberof CustomerService
     */
    CustomerService.prototype.getCustomerInfo = function (customerId) {
        return this.customerRepository.findOneById(customerId);
    };
    /**
     * Actualizar información de un cliente
     *
     * @param {string} id
     * @param {CustomerModel} customer
     * @return {*}  {CustomerEntity}
     * @memberof CustomerService
     */
    CustomerService.prototype.updatedCustomer = function (id, customer) {
        return this.updatedCustomer(id, customer);
    };
    /**
     * Dar de baja a un cliente en el sistema
     *
     * @param {string} id
     * @return {*}  {boolean}
     * @memberof CustomerService
     */
    CustomerService.prototype.unsubscribe = function (id) {
        var errorCustomer = new error_entity_1.ErrorEntity();
        errorCustomer.tittle = "Error";
        errorCustomer.message = "No se ha eliminado el JWT";
        return errorCustomer;
    };
    return CustomerService;
}());
exports.CustomerService = CustomerService;
