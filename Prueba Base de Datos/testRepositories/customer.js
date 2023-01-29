"use strict";
exports.__esModule = true;
var repositories_1 = require("./persistence/repositories");
/**
 * Funciona para registrar Customer
 */
var customer = new repositories_1.CustomerRepository();
customer.register({
    id: "1",
    documentType: { id: "11", name: "asdasdasd", state: true },
    document: "string",
    fullName: "Daniel 1",
    email: "string",
    phone: "string",
    password: "string",
    state: true
});
customer.register({
    id: "2",
    documentType: { id: "22", name: "asdasdasd", state: true },
    document: "string",
    fullName: "Daniel 2",
    email: "string",
    phone: "string",
    password: "string",
    state: true
});
customer.register({
    id: "3",
    documentType: { id: "33", name: "asdasdasd", state: true },
    document: "string",
    fullName: "Daniel 3",
    email: "string",
    phone: "string",
    password: "string",
    state: true
});
customer.register({
    id: "4",
    documentType: { id: "44", name: "asdasdasd", state: true },
    document: "string",
    fullName: "Daniel 4",
    email: "string",
    phone: "string",
    password: "string",
    state: true
});
customer.register({
    id: "5",
    documentType: { id: "55", name: "asdasdasd", state: true },
    document: "string",
    fullName: "Daniel 5",
    email: "string",
    phone: "string",
    password: "string",
    state: true
});
/**
 * FindAll
 */
console.log("-------------REGISTRADOS-------------");
console.log(customer.findAll());
/**
 * Update
 */
customer.update("1", {
    id: "1",
    documentType: { id: "11", name: "asdasdasd", state: true },
    document: "string",
    fullName: "Daniel Basto 2",
    email: "daniel@daniel.com",
    phone: "562135465",
    password: "asdasdweqsdzxc",
    state: false
});
console.log("-------------ACTUALIZAR-------------");
console.log(customer.findAll());
/**
 * Delete
 */
customer["delete"]("2");
console.log("-------------ELIMINAR-------------");
console.log(customer.findAll());
console.log("-------------POR ID-------------");
var result = customer.findOneById("3");
console.log(result);
console.log("-------------POR DOCUMENT TYPE ID-------------");
result = customer.findByDocumentTypeId("11");
console.log(result);
console.log("-------------POR EMAIL-------------");
result = customer.findByEmail("daniel@daniel.com");
console.log(result);
console.log("-------------POR ESTADO-------------");
console.log(customer.findByState(true));
