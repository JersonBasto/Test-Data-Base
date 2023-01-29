import { CustomerModel } from "../../models";
import { CustomerEntity } from "../../persistence/entities";
import { ErrorEntity } from "../../persistence/entities/error.entity";
import { CustomerRepository } from "../../persistence/repositories/customer.repository";

export class CustomerService {
  constructor(private readonly customerRepository: CustomerRepository) {}

  /**
   * Obtener información de un cliente
   *
   * @param {string} customerId
   * @return {*}  {CustomerEntity}
   * @memberof CustomerService
   */
  getCustomerInfo(customerId: string): CustomerEntity {
    return this.customerRepository.findOneById(customerId);
  }

  /**
   * Actualizar información de un cliente
   *
   * @param {string} id
   * @param {CustomerModel} customer
   * @return {*}  {CustomerEntity}
   * @memberof CustomerService
   */
  updatedCustomer(id: string, customer: CustomerModel): CustomerEntity {
    return this.updatedCustomer(id, customer);
  }

  /**
   * Dar de baja a un cliente en el sistema
   *
   * @param {string} id
   * @return {*}  {boolean}
   * @memberof CustomerService
   */
  unsubscribe(id: string): boolean | ErrorEntity {
    const errorCustomer = new ErrorEntity();
    errorCustomer.tittle = "Error";
    errorCustomer.message = "No se ha eliminado el JWT";
    return errorCustomer;
  }
}
