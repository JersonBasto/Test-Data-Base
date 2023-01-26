"use strict";
exports.__esModule = true;
exports.AccountEntity = void 0;
var AccountEntity = /** @class */ (function () {
    function AccountEntity() {
        this.id = (Math.random() * (100 - 1 + 1) + 1).toString();
        this.balance = 0;
        this.state = true;
    }
    return AccountEntity;
}());
exports.AccountEntity = AccountEntity;
