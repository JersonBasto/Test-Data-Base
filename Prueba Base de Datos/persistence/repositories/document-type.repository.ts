import { DocumentTypeEntity } from "../entities";
import { BodyRepositoryAbstract } from "./base/base.repository";
import { DocumentTypeRepositoryInterface } from "./interface/document-type/document-type-repository.interface";
import { CustomerRepository } from "./customer.repository";

export class DocumentTypeRepository
  extends BodyRepositoryAbstract<DocumentTypeEntity>
  implements DocumentTypeRepositoryInterface
{
  register(entity: DocumentTypeEntity): DocumentTypeEntity {
    this.database.push(entity);
    return this.database.at(-1) ?? entity;
  }
  update(id: string, entity: DocumentTypeEntity): DocumentTypeEntity {
    const documentTypeIndex = this.database.findIndex(
      (documentType) => documentType.id === id
    );
    const data = this.database[documentTypeIndex];
    this.database[documentTypeIndex] = {
      ...data,
      ...entity,
      id: id,
    };
    return this.database[documentTypeIndex];
  }
  delete(id: string, soft?: boolean | undefined): void {
    const account = new CustomerRepository();
    const result = account.findByDocumentTypeId(id);
    const accountTypeIndex = this.database.findIndex(
      (accountType) => accountType.id === id
    );
    this.database.splice(accountTypeIndex, 1);
  }
  findAll(): DocumentTypeEntity[] {
    return this.database;
  }
  findOneById(id: string): DocumentTypeEntity {
    const documentTypeIndex = this.database.findIndex(
      (documentType) => documentType.id === id
    );
    return this.database[documentTypeIndex];
  }
  findByState(state: boolean): DocumentTypeEntity[] {
    let arrayState: DocumentTypeEntity[] = [];
    this.database.map((documentType) => {
      if (documentType.state === state) {
        arrayState.push(documentType);
      }
    });
    return arrayState;
  }
  findByName(name: string): DocumentTypeEntity[] {
    let arrayName: DocumentTypeEntity[] = [];
    this.database.map((documentType) => {
      if (documentType.name.includes(name)) {
        arrayName.push(documentType);
      }
    });
    return arrayName;
  }
}
