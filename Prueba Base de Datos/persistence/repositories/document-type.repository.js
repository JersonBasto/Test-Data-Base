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
exports.DocumentTypeRepository = void 0;
var base_repository_1 = require("./base/base.repository");
var DocumentTypeRepository = /** @class */ (function (_super) {
    __extends(DocumentTypeRepository, _super);
    function DocumentTypeRepository() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DocumentTypeRepository.prototype.register = function (entity) {
        this.database.push(entity);
        var documentTypeIndex = this.database.findIndex(function (documentType) { return documentType.id === entity.id; });
        return this.database[documentTypeIndex];
    };
    DocumentTypeRepository.prototype.update = function (id, entity) {
        var documentTypeIndex = this.database.findIndex(function (documentType) { return documentType.id === id; });
        var data = this.database[documentTypeIndex];
        this.database[documentTypeIndex] = __assign(__assign(__assign({}, data), entity), { id: id });
        return this.database[documentTypeIndex];
    };
    DocumentTypeRepository.prototype["delete"] = function (id, soft) {
        var documentTypeIndex = this.database.findIndex(function (account) { return account.id === id; });
        this.database.splice(documentTypeIndex, 1);
    };
    DocumentTypeRepository.prototype.findAll = function () {
        return this.database;
    };
    DocumentTypeRepository.prototype.findOneById = function (id) {
        var documentTypeIndex = this.database.findIndex(function (customer) { return customer.id === id; });
        return this.database[documentTypeIndex];
    };
    DocumentTypeRepository.prototype.findByState = function (state) {
        var arrayState = [];
        this.database.map(function (documentType) {
            if (documentType.state === state) {
                arrayState.push(documentType);
            }
        });
        return arrayState;
    };
    return DocumentTypeRepository;
}(base_repository_1.BodyRepositoryAbstract));
exports.DocumentTypeRepository = DocumentTypeRepository;
