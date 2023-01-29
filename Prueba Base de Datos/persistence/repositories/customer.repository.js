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
        var _a;
        this.database.push(entity);
        var customerIndex = this.database.findIndex(function (customer) { return customer.id === entity.id; });
        return (_a = this.database[customerIndex]) !== null && _a !== void 0 ? _a : entity;
    };
    CustomerRepository.prototype.update = function (id, entity) {
        var customerIndex = this.database.findIndex(function (customer) { return customer.id === id; });
        var data = this.database[customerIndex];
        this.database[customerIndex] = __assign(__assign(__assign({}, data), entity), { id: id });
        return this.database[customerIndex];
    };
    CustomerRepository.prototype["delete"] = function (id, soft) {
        var customer = this.findOneById(id);
        if (soft || soft === undefined) {
            this.softDelete(id);
        }
        else {
            this.hardDelete(id);
        }
    };
    CustomerRepository.prototype.findAll = function () {
        return this.database.filter(function (customer) {
            customer.deletedAt === undefined;
        });
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
    CustomerRepository.prototype.findEmailAndPassword = function (email, password) {
        var customer = this.database.filter(function (customer) { return customer.email === email && customer.password === password; });
        if (customer) {
            return true;
        }
        else {
            return false;
        }
    };
    CustomerRepository.prototype.findByFullName = function (name) {
        var arrayName = [];
        this.database.map(function (customer) {
            if (customer.fullName.includes(name)) {
                arrayName.push(customer);
            }
        });
        return arrayName;
    };
    CustomerRepository.prototype.hardDelete = function (id) {
        var customerIndex = this.database.findIndex(function (account) { return account.id === id; });
        this.database.splice(customerIndex, 1);
    };
    CustomerRepository.prototype.softDelete = function (id) {
        var customer = this.findOneById(id);
        customer.deletedAt = Date.now();
        this.update(id, customer);
    };
    CustomerRepository.prototype.findByPhone = function (phone) {
        var arrayPhone = [];
        this.database.map(function (customer) {
            if (customer.phone.includes(phone)) {
                arrayPhone.push(customer);
            }
        });
        return arrayPhone;
    };
    return CustomerRepository;
}(base_repository_1.BodyRepositoryAbstract));
exports.CustomerRepository = CustomerRepository;
