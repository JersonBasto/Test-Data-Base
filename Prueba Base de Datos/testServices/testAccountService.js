"use strict";
exports.__esModule = true;
var account_type_repository_1 = require("../persistence/repositories/account-type.repository");
var account_repository_1 = require("../persistence/repositories/account.repository");
var services_1 = require("../services");
var account = new services_1.AccountService(new account_repository_1.AccountRepository(), new account_type_repository_1.AccountTypeRepository());
var result1 = account.getBalance("1");
console.log(result1);
