import { CustomerEntity } from "../../../entities";
import { BodyRepositoryInterface } from "../model-repository.interface";

export interface CustomerRepositoryInterface
  extends BodyRepositoryInterface<CustomerEntity> {
  findByDocumentTypeId(documentTypeId: string): CustomerEntity;
  findByEmail(email: string): CustomerEntity;
  findByState(state: boolean): CustomerEntity[];
}
