import { DocumentTypeRepository } from "./persistence/repositories";

const documentType = new DocumentTypeRepository();
documentType.register({
  id: "1",
  name: "asd1",
  state: true,
});
documentType.register({
  id: "2",
  name: "asd2",
  state: true,
});
documentType.register({
  id: "3",
  name: "asd3",
  state: true,
});
documentType.register({
  id: "4",
  name: "asd4",
  state: true,
});
console.log("------------------REGISTRO------------------");
console.log(documentType.findAll());
documentType.update("1", {
  id: "1",
  name: "zxc1",
  state: false,
});
console.log("------------------UPDATE------------------");
console.log(documentType.findAll());
documentType.delete("3");
console.log("------------------ELIMINAR------------------");
console.log(documentType.findAll());
console.log("------------------FIND BY ID------------------");
let result = documentType.findOneById("2");
console.log(result);
console.log("------------------FIND BY STATE------------------");
console.log(documentType.findByState(true));
