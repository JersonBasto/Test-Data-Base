"use strict";
exports.__esModule = true;
var repositories_1 = require("./persistence/repositories");
var account = new repositories_1.AccountRepository();
account.register({
    accountType: { id: "11", name: "asd1", state: true },
    balance: 0,
    customerId: {
        id: "1",
        documentType: { id: "11", name: "asd1", state: true },
        document: "string",
        fullName: "Daniel Basto 1",
        email: "daniel1@daniel1.com",
        phone: "562135465",
        password: "asdasdweqsdzxc",
        state: true
    },
    id: "1",
    state: true
});
account.register({
    accountType: { id: "22", name: "asd2", state: true },
    balance: 0,
    customerId: {
        id: "2",
        documentType: { id: "22", name: "asd2", state: true },
        document: "string",
        fullName: "Daniel Basto 2",
        email: "daniel1@daniel1.com",
        phone: "562135465",
        password: "asdasdweqsdzxc",
        state: true
    },
    id: "2",
    state: true
});
account.register({
    accountType: { id: "33", name: "asd3", state: true },
    balance: 0,
    customerId: {
        id: "3",
        documentType: { id: "33", name: "asd3", state: true },
        document: "string",
        fullName: "Daniel Basto 3",
        email: "daniel1@daniel1.com",
        phone: "562135465",
        password: "asdasdweqsdzxc",
        state: true
    },
    id: "3",
    state: true
});
account.register({
    accountType: { id: "44", name: "asd4", state: true },
    balance: 0,
    customerId: {
        id: "4",
        documentType: { id: "44", name: "asd4", state: true },
        document: "string",
        fullName: "Daniel Basto 4",
        email: "daniel1@daniel1.com",
        phone: "562135465",
        password: "asdasdweqsdzxc",
        state: true
    },
    id: "4",
    state: true
});
console.log("-----------------REGISTRO----------------");
console.log(account.findAll());
account.update("3", {
    accountType: { id: "33", name: "asd3", state: true },
    balance: 10000,
    customerId: {
        id: "3",
        documentType: { id: "33", name: "asd3", state: true },
        document: "string",
        fullName: "Daniel Basto 3",
        email: "daniel1@daniel1.com",
        phone: "562135465",
        password: "asdasdweqsdzxc",
        state: true
    },
    id: "3",
    state: false
});
console.log("-----------------UPDATE----------------");
console.log(account.findAll());
console.log("-----------------DELETE SOFT----------------");
account["delete"]("3", true);
console.log(account.findAll());
console.log("-----------------DELETE ----------------");
account["delete"]("4");
console.log(account.findAll());
console.log("-----------------FIND BY ID----------------");
var result = account.findOneById("3");
console.log(result);
console.log("-----------------FIND BY STATE----------------");
console.log(account.findByState(true));
console.log("-----------------FIND BIGGER STATE----------------");
console.log(account.findBalanceGreaterThan(8000));
console.log("-----------------FIND LESS STATE----------------");
console.log(account.findBalanceLessThan(1000));
console.log("-----------------FIND CUSTOMER ID----------------");
result = account.findByCustomerId("1");
console.log(result);
console.log("-----------------FIND DOCUMENT TYPE ID----------------");
result = account.findByDocumentTypeId("22");
console.log(result);
console.log("-----------------FIND ACCOUNT TYPE ID----------------");
result = account.findByAccountTypeId("33");
console.log(result);
