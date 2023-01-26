import { TransferRespository } from "./persistence/repositories";

const transfer = new TransferRespository();
transfer.register({
  id: "1",
  amount: 1000,
  dateTime: 1010101,
  income: {
    accountType: { id: "01", name: "asd01", state: true },
    balance: 0,
    customerId: {
      id: "01",
      documentType: { id: "01", name: "asd01", state: true },
      document: "string",
      fullName: "Daniel Basto 1",
      email: "daniel1@daniel1.com",
      phone: "562135465",
      password: "asdasdweqsdzxc",
      state: true,
    },
    id: "01",
    state: true,
  },
  outcome: {
    accountType: { id: "02", name: "asd02", state: true },
    balance: 0,
    customerId: {
      id: "02",
      documentType: { id: "02", name: "asd02", state: true },
      document: "string",
      fullName: "Daniel Basto 2",
      email: "daniel1@daniel1.com",
      phone: "562135465",
      password: "asdasdweqsdzxc",
      state: true,
    },
    id: "02",
    state: true,
  },
  reason: "Mandar plata",
});
transfer.register({
  id: "2",
  amount: 2000,
  dateTime: 1010101,
  income: {
    accountType: { id: "11", name: "asd11", state: true },
    balance: 0,
    customerId: {
      id: "11",
      documentType: { id: "11", name: "asd11", state: true },
      document: "string",
      fullName: "Daniel Basto 1",
      email: "daniel1@daniel1.com",
      phone: "562135465",
      password: "asdasdweqsdzxc",
      state: true,
    },
    id: "11",
    state: true,
  },
  outcome: {
    accountType: { id: "12", name: "asd12", state: true },
    balance: 0,
    customerId: {
      id: "12",
      documentType: { id: "12", name: "asd12", state: true },
      document: "string",
      fullName: "Daniel Basto 2",
      email: "daniel1@daniel1.com",
      phone: "562135465",
      password: "asdasdweqsdzxc",
      state: true,
    },
    id: "12",
    state: true,
  },
  reason: "Mandar plata",
});
transfer.register({
  id: "3",
  amount: 1000,
  dateTime: 1010101,
  income: {
    accountType: { id: "31", name: "asd31", state: true },
    balance: 0,
    customerId: {
      id: "31",
      documentType: { id: "31", name: "asd31", state: true },
      document: "string",
      fullName: "Daniel Basto 1",
      email: "daniel1@daniel31.com",
      phone: "562135465",
      password: "asdasdweqsdzxc",
      state: true,
    },
    id: "31",
    state: true,
  },
  outcome: {
    accountType: { id: "32", name: "asd32", state: true },
    balance: 0,
    customerId: {
      id: "32",
      documentType: { id: "32", name: "asd32", state: true },
      document: "string",
      fullName: "Daniel Basto 2",
      email: "daniel1@daniel1.com",
      phone: "562135465",
      password: "asdasdweqsdzxc",
      state: true,
    },
    id: "32",
    state: true,
  },
  reason: "Mandar plata",
});

console.log("------------------REGISTRO----------------");
console.log(transfer.findAll());
transfer.update("3", {
  id: "3",
  amount: 5000,
  dateTime: 1010101,
  income: {
    accountType: { id: "31", name: "asd31", state: true },
    balance: 0,
    customerId: {
      id: "31",
      documentType: { id: "31", name: "asd31", state: true },
      document: "string",
      fullName: "Daniel Basto 1",
      email: "daniel1@daniel31.com",
      phone: "562135465",
      password: "asdasdweqsdzxc",
      state: true,
    },
    id: "31",
    state: true,
  },
  outcome: {
    accountType: { id: "32", name: "asd32", state: true },
    balance: 0,
    customerId: {
      id: "32",
      documentType: { id: "32", name: "asd32", state: true },
      document: "string",
      fullName: "Daniel Basto 2",
      email: "daniel1@daniel1.com",
      phone: "562135465",
      password: "asdasdweqsdzxc",
      state: true,
    },
    id: "32",
    state: true,
  },
  reason: "Mandar plata",
});
console.log("------------------UPDATE----------------");
console.log(transfer.findAll());
transfer.delete("3");
console.log("------------------DELETE----------------");
console.log(transfer.findAll());
console.log("------------------FIND BY ID----------------");
let result = transfer.findOneById("2");
console.log(result);
