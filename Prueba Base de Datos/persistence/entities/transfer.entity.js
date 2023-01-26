"use strict";
exports.__esModule = true;
exports.TransferEntity = void 0;
var TransferEntity = /** @class */ (function () {
    function TransferEntity() {
        this.id = (Math.random() * (100 - 1 + 1) + 1).toString();
        this.amount = 0;
    }
    return TransferEntity;
}());
exports.TransferEntity = TransferEntity;
