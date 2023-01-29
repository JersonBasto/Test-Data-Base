import { AccountEntity } from "../persistence/entities";
import { accountDataBase } from "./accountDataBase";

for (let x = 0; x < 10; x++) {
  const json = new AccountEntity();
  console.log(json)
  const id = x.toString();
  json.accountType.id = id;
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
  accountDataBase.push(json);
}
