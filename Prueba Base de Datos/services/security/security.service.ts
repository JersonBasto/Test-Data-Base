import { CustomerModel } from "../../models";
import { AccountService } from "../account";
import {
  AccountEntity,
  AccountTypeEntity,
  CustomerEntity,
} from "../../persistence/entities";
import { CustomerRepository } from "../..//persistence/repositories/customer.repository";
import { ErrorEntity } from "../../persistence/entities/error.entity";

export class SecurityService {
  constructor(
    private readonly customerRepository: CustomerRepository,
    private readonly accountService: AccountService
  ) {}
  /**
   * Identificarse en el sistema
   *
   * @param {CustomerModel} user
   * @return {*}  {string}
   * @memberof SecurityService
   */
  signIn(user: CustomerModel): string | ErrorEntity {
    const errorSecurity = new ErrorEntity();
    const answer = this.customerRepository.findEmailAndPassword(
      user.email,
      user.password
    );
    if (answer) return "Falta retornar un JWT";
    else {
      errorSecurity.tittle = "Error";
      errorSecurity.message = "Datos de identificación inválidos";
      return errorSecurity;
    }
  }

  /**
   * Crear usuario en el sistema
   *
   * @param {CustomerModel} user
   * @return {*}  {string}
   * @memberof SecurityService
   */
  signUp(user: CustomerModel): string | ErrorEntity {
    const newCustomer = new CustomerEntity();
    newCustomer.documentType = user.documentType;
    newCustomer.document = user.document;
    newCustomer.fullName = user.fullName;
    newCustomer.email = user.email;
    newCustomer.phone = user.phone;
    newCustomer.password = user.password;

    const customer = this.customerRepository.register(newCustomer);
    const errorSecurity = new ErrorEntity();
    errorSecurity.tittle = "Error";

    if (customer) {
      const accountType = new AccountTypeEntity();
      accountType.id = "Falta el ID por defecto del tipo de cuenta";
      const newAccount = new AccountEntity();
      newAccount.customer = customer;
      newAccount.accountType = accountType;

      const account = this.accountService.createAccount(newAccount);

      if (account) return "Falta retornar un JWT";
      else {
        errorSecurity.message = "No se ha podido iniciar sesion";
        return errorSecurity;
      }
    } else {
      errorSecurity.message = "No se ha podido crear la cuentas";
      return errorSecurity;
    }
  }

  /**
   * Salir del sistema
   *
   * @param {string} JWToken
   * @memberof SecurityService
   */
  signOut(JWToken: string): void {
    throw new Error("Method not implemented.");
  }
}
