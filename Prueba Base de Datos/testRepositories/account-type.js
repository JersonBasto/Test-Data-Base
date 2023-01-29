"use strict";
exports.__esModule = true;
var repositories_1 = require("./persistence/repositories");
var accountType = new repositories_1.AccountTypeRepository();
accountType.register({
    id: "1",
    name: "asd1",
    state: true
});
accountType.register({
    id: "2",
    name: "asd2",
    state: true
});
accountType.register({
    id: "3",
    name: "asd3",
    state: true
});
accountType.register({
    id: "4",
    name: "asd4",
    state: true
});
console.log("------------------REGISTRO------------------");
console.log(accountType.findAll());
accountType.update("1", {
    id: "1",
    name: "zxc1",
    state: false
});
console.log("------------------UPDATE------------------");
console.log(accountType.findAll());
accountType["delete"]("3");
console.log("------------------ELIMINAR------------------");
console.log(accountType.findAll());
console.log("------------------FIND BY ID------------------");
var result = accountType.findOneById("2");
console.log(result);
console.log("------------------FIND BY STATE------------------");
console.log(accountType.findByState(true));
