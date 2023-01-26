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
exports.CustomerRepository = void 0;
var base_repository_1 = require("./base/base.repository");
var CustomerRepository = /** @class */ (function (_super) {
    __extends(CustomerRepository, _super);
    function CustomerRepository() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CustomerRepository.prototype.register = function (entity) {
        this.database.push(entity);
        var customerIndex = this.database.findIndex(function (customer) { return customer.id === entity.id; });
        return this.database[customerIndex];
    };
    CustomerRepository.prototype.update = function (id, entity) {
        var customerIndex = this.database.findIndex(function (customer) { return customer.id === id; });
        var data = this.database[customerIndex];
        this.database[customerIndex] = __assign(__assign(__assign({}, data), entity), { id: id });
        return this.database[customerIndex];
    };
    CustomerRepository.prototype["delete"] = function (id, soft) {
        var customerIndex = this.database.findIndex(function (customer) { return customer.id === id; });
        this.database.splice(customerIndex, 1);
    };
    CustomerRepository.prototype.findAll = function () {
        return this.database;
    };
    CustomerRepository.prototype.findOneById = function (id) {
        var customerIndex = this.database.findIndex(function (customer) { return customer.id === id; });
        return this.database[customerIndex];
    };
    CustomerRepository.prototype.findByDocumentTypeId = function (documentTypeId) {
        var customerIndex = this.database.findIndex(function (customer) { return customer.documentType.id === documentTypeId; });
        return this.database[customerIndex];
    };
    CustomerRepository.prototype.findByEmail = function (email) {
        var customerIndex = this.database.findIndex(function (customer) { return customer.email === email; });
        return this.database[customerIndex];
    };
    CustomerRepository.prototype.findByState = function (state) {
        var arrayState = [];
        this.database.map(function (customer) {
            if (customer.state === state) {
                arrayState.push(customer);
            }
        });
        return arrayState;
    };
    return CustomerRepository;
}(base_repository_1.BodyRepositoryAbstract));
exports.CustomerRepository = CustomerRepository;
