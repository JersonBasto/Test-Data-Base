"use strict";
exports.__esModule = true;
exports.BodyRepositoryAbstract = void 0;
var BodyRepositoryAbstract = /** @class */ (function () {
    function BodyRepositoryAbstract() {
        this.database = new Array();
    }
    BodyRepositoryAbstract.prototype.register = function (entity) {
        throw new Error("Method not implemented.");
    };
    BodyRepositoryAbstract.prototype.update = function (id, entity) {
        throw new Error("Method not implemented.");
    };
    BodyRepositoryAbstract.prototype["delete"] = function (id, soft) {
        throw new Error("Method not implemented.");
    };
    BodyRepositoryAbstract.prototype.findAll = function () {
        throw new Error("Method not implemented.");
    };
    BodyRepositoryAbstract.prototype.findOneById = function (id) {
        throw new Error("Method not implemented.");
    };
    return BodyRepositoryAbstract;
}());
exports.BodyRepositoryAbstract = BodyRepositoryAbstract;
