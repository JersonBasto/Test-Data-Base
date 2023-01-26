"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
exports.__esModule = true;
exports.CustomerRepository = exports.AccountRepository = exports.AccountTypeRepository = exports.DocumentTypeRepository = exports.TransferRespository = exports.DepositRepository = void 0;
var deposit_repository_1 = require("./deposit.repository");
__createBinding(exports, deposit_repository_1, "DepositRepository");
var transfer_repository_1 = require("./transfer.repository");
__createBinding(exports, transfer_repository_1, "TransferRespository");
var document_type_repository_1 = require("./document-type.repository");
__createBinding(exports, document_type_repository_1, "DocumentTypeRepository");
var account_type_repository_1 = require("./account-type.repository");
__createBinding(exports, account_type_repository_1, "AccountTypeRepository");
var account_repository_1 = require("./account.repository");
__createBinding(exports, account_repository_1, "AccountRepository");
var customer_repository_1 = require("./customer.repository");
__createBinding(exports, customer_repository_1, "CustomerRepository");
