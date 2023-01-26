import { DocumentTypeEntity } from "./";
import { CustomerModel } from "../../models";

export class CustomerEntity implements CustomerModel {
  id = (Math.random() * (100 - 1 + 1) + 1).toString();
  documentType: DocumentTypeEntity;
  document: string;
  fullName: string;
  email: string;
  phone: string;
  password: string;
  avatarUrl?: string;
  state = true;
  deletedAt?: Date | number;
}
