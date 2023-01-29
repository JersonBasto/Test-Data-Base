import { CustomerEntity } from "../entities";
import { BodyRepositoryAbstract } from "./base/base.repository";
import { CustomerRepositoryInterface } from "./interface/customer/customer-repository.interface";

export class CustomerRepository
  extends BodyRepositoryAbstract<CustomerEntity>
  implements CustomerRepositoryInterface
{
  register(entity: CustomerEntity): CustomerEntity {
    this.database.push(entity);
    const customerIndex = this.database.findIndex(
      (customer) => customer.id === entity.id
    );
    return this.database[customerIndex] ?? entity;
  }
  update(id: string, entity: CustomerEntity): CustomerEntity {
    const customerIndex = this.database.findIndex(
      (customer) => customer.id === id
    );
    const data = this.database[customerIndex];
    this.database[customerIndex] = {
      ...data,
      ...entity,
      id: id,
    };
    return this.database[customerIndex];
  }
  delete(id: string, soft?: boolean | undefined): void {
    const customer = this.findOneById(id);
    if (soft || soft === undefined) {
      this.softDelete(id);
    } else {
      this.hardDelete(id);
    }
  }
  findAll(): CustomerEntity[] {
    return this.database.filter((customer) => {
      customer.deletedAt === undefined;
    });
  }
  findOneById(id: string): CustomerEntity {
    const customerIndex = this.database.findIndex(
      (customer) => customer.id === id
    );
    return this.database[customerIndex];
  }
  findByDocumentTypeId(documentTypeId: string): CustomerEntity {
    const customerIndex = this.database.findIndex(
      (customer) => customer.documentType.id === documentTypeId
    );
    return this.database[customerIndex];
  }
  findByEmail(email: string): CustomerEntity {
    const customerIndex = this.database.findIndex(
      (customer) => customer.email === email
    );
    return this.database[customerIndex];
  }
  findByState(state: boolean): CustomerEntity[] {
    let arrayState: CustomerEntity[] = [];
    this.database.map((customer) => {
      if (customer.state === state) {
        arrayState.push(customer);
      }
    });
    return arrayState;
  }
  findEmailAndPassword(email: string, password: string): boolean {
    const customer = this.database.filter(
      (customer) => customer.email === email && customer.password === password
    );
    if (customer) {
      return true;
    } else {
      return false;
    }
  }
  findByFullName(name: string): CustomerEntity[] {
    let arrayName: CustomerEntity[] = [];
    this.database.map((customer) => {
      if (customer.fullName.includes(name)) {
        arrayName.push(customer);
      }
    });
    return arrayName;
  }
  hardDelete(id: string): void {
    const customerIndex = this.database.findIndex(
      (account) => account.id === id
    );
    this.database.splice(customerIndex, 1);
  }
  softDelete(id: string): void {
    const customer = this.findOneById(id);
    customer.deletedAt = Date.now();
    this.update(id, customer);
  }
  findByPhone(phone: string): CustomerEntity[] {
    let arrayPhone: CustomerEntity[] = [];
    this.database.map((customer) => {
      if (customer.phone.includes(phone)) {
        arrayPhone.push(customer);
      }
    });
    return arrayPhone;
  }
}
