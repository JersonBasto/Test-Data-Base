"use strict";
exports.__esModule = true;
var entities_1 = require("../persistence/entities");
var accountDataBase_1 = require("./accountDataBase");
for (var x = 0; x < 10; x++) {
    var json = new entities_1.AccountEntity();
    console.log(json);
    var id = x.toString();
    json.accountType.name = "asd" + id;
    json.accountType.state = true;
    json.balance = 0;
    json.customer.id = id;
    json.customer.document = "123" + id;
    json.customer.email = "asd" + id + "@gmail.com";
    json.customer.fullName = "asd" + id;
    json.customer.phone = "123456" + id;
    json.customer.password = "123123" + id;
    json.customer.state = true;
    json.customer.documentType.id = id;
    json.customer.documentType.name = "asd";
    json.customer.documentType.state = true;
    json.id = id;
    json.state = true;
    accountDataBase_1.accountDataBase.push(json);
}
