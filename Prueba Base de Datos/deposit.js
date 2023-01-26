"use strict";
exports.__esModule = true;
var repositories_1 = require("./persistence/repositories");
var deposit = new repositories_1.DepositRepository();
deposit.register({
    accountId: {
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
    },
    amount: 1000,
    dateTime: 101010,
    id: "1"
});
deposit.register({
    accountId: {
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
    },
    amount: 5000,
    dateTime: 101010,
    id: "2"
});
deposit.register({
    accountId: {
        accountType: { id: "33", name: "asd3", state: true },
        balance: 0,
        customerId: {
            id: "3",
            documentType: { id: "33", name: "asd3", state: true },
            document: "string",
            fullName: "Daniel Basto 3",
            email: "daniel1@daniel3.com",
            phone: "562135465",
            password: "asdasdweqsdzxc",
            state: true
        },
        id: "3",
        state: true
    },
    amount: 1000,
    dateTime: 101010,
    id: "3"
});
deposit.register({
    accountId: {
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
    },
    amount: 1000,
    dateTime: 101010,
    id: "4"
});
console.log("--------------------REGISTRO---------------------");
console.log(deposit.findAll());
deposit.update("1", {
    accountId: {
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
    },
    amount: 5000,
    dateTime: 101010,
    id: "1"
});
console.log("--------------------UPDATE---------------------");
console.log(deposit.findAll());
deposit["delete"]("4");
console.log("--------------------DELETE---------------------");
console.log(deposit.findAll());
console.log("--------------------FIND BY ID---------------------");
var result = deposit.findOneById("2");
console.log(result);
console.log("--------------------FIND ACCOUNT ID---------------------");
result = deposit.findByAccountId("2");
console.log(result);
console.log("--------------------FIND ACCOUNT TYPE ID---------------------");
result = deposit.findByAccountTypeId("11");
console.log(result);
console.log("--------------------FIND CUSTOMER ID---------------------");
result = deposit.findByCustomerId("3");
console.log(result);
console.log("--------------------FIND EMAIL---------------------");
result = deposit.findByEmail("daniel1@daniel3.com");
console.log(result);
console.log("--------------------FIND DOCUMENT TYPE---------------------");
result = deposit.findByDocumentTypeId("22");
console.log(result);
console.log("--------------------FIND AMOUNT MAYOR---------------------");
console.log(deposit.findAmountGreaterThan(3000));
console.log("--------------------FIND AMOUNT MENOR---------------------");
console.log(deposit.findAmountLessThan(2000));
