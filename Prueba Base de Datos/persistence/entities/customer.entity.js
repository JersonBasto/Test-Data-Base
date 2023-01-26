"use strict";
exports.__esModule = true;
exports.CustomerEntity = void 0;
var CustomerEntity = /** @class */ (function () {
    function CustomerEntity() {
        this.id = (Math.random() * (100 - 1 + 1) + 1).toString();
        this.state = true;
    }
    return CustomerEntity;
}());
exports.CustomerEntity = CustomerEntity;
