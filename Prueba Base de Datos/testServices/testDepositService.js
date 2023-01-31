"use strict";
exports.__esModule = true;
var data_range_entity_1 = require("../persistence/entities/data-range.entity");
var pagination_entity_1 = require("../persistence/entities/pagination.entity");
var account_type_repository_1 = require("../persistence/repositories/account-type.repository");
var account_repository_1 = require("../persistence/repositories/account.repository");
var deposit_repository_1 = require("../persistence/repositories/deposit.repository");
var services_1 = require("../services");
var deposit = new services_1.DepositService(new deposit_repository_1.DepositRepository(), new services_1.AccountService(new account_repository_1.AccountRepository(), new account_type_repository_1.AccountTypeRepository()));
var pagination = new pagination_entity_1.PaginationEntity();
pagination.actualPage = 1;
var dataRange = new data_range_entity_1.DataRangeEntity();
dataRange.range = 5;
var result = deposit.getHistory("1", pagination, dataRange);
console.log(result);
