"use strict";
exports.__esModule = true;
exports.DepositEntity = void 0;
var DepositEntity = /** @class */ (function () {
    function DepositEntity() {
        this.id = (Math.random() * (100 - 1 + 1) + 1).toString();
        this.amount = 0;
    }
    return DepositEntity;
}());
exports.DepositEntity = DepositEntity;
