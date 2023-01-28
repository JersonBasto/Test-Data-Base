import { AccountModel } from "../../models";
import { AccountEntity, AccountTypeEntity } from "../../persistence/entities";
import { AccountRepository } from "../../persistence/repositories";
import { AccountTypeRepository } from "../../persistence/repositories";
import { ErrorEntity } from "../../persistence/entities/error.entity";

export class AccountService {
  constructor(
    private readonly accountRepository: AccountRepository,
    private readonly accountTypeRepository: AccountTypeRepository
  ) {}
  /**
   * Crear una cuenta
   *
   * @param {AccountModel} account
   * @return {*}  {AccountEntity}
   * @memberof AccountService
   */
  createAccount(account: AccountModel): AccountEntity | ErrorEntity {
    const newAccount = new AccountEntity();
    newAccount.customer = account.customer;
    newAccount.accountType = account.accountType;
    return this.accountRepository.register(newAccount);
  }

  /**
   * Obtener el balance de una cuenta
   *
   * @param {string} accountId
   * @return {*}  {number}
   * @memberof AccountService
   */
  getBalance(accountId: string): number | ErrorEntity {
    const account = this.accountRepository.findOneById(accountId);
    const errorService = new ErrorEntity();
    if (account) {
      if (account.state) {
        return account.balance;
      } else {
        errorService.tittle = "Error";
        errorService.message =
          "No se puede realizar la operacion, la cuenta esta desactivada";
        return errorService;
      }
    } else {
      errorService.tittle = "Error";
      errorService.message = "No se encontro ninguna cuenta con ese ID";
      return errorService;
    }
  }

  /**
   * Agregar balance a una cuenta
   *
   * @param {string} accountId
   * @param {number} amount
   * @memberof AccountService
   */
  addBalance(accountId: string, amount: number): void {
    const balance = this.getBalance(accountId);
    if (balance) {
      const account = this.accountRepository.findOneById(accountId);
      account.balance = account.balance + amount;
      this.accountRepository.update(accountId, account);
    }
  }

  /**
   * Remover balance de una cuenta
   *
   * @param {string} accountId
   * @param {number} amount
   * @memberof AccountService
   */
  removeBalance(accountId: string, amount: number): void | ErrorEntity {
    const balance = this.getBalance(accountId);
    if (balance) {
      const account = this.accountRepository.findOneById(accountId);
      if (account.balance >= amount) {
        account.balance = account.balance - amount;
      } else {
        throw new NotFoundException("No se puede realizar esta operacion");
      }

      this.accountRepository.update(accountId, account);
    }
  }

  /**
   * Verificar la disponibilidad de un monto a retirar en una cuenta
   *
   * @param {string} accountId
   * @param {number} amount
   * @return {*}  {boolean}
   * @memberof AccountService
   */
  verifyAmountIntoBalance(accountId: string, amount: number): boolean {
    const balance = this.getBalance(accountId);
    if (balance && balance >= amount) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * Obtener el estado de una cuenta
   *
   * @param {string} accountId
   * @return {*}  {boolean}
   * @memberof AccountService
   */
  getState(accountId: string): boolean | ErrorEntity {
    const accountState = this.accountRepository.findByStateId(accountId);
    if (accountState != undefined) {
      return accountState;
    } else {
      throw new NotFoundException("No se encontro cuenta con ese ID");
    }
  }

  /**
   * Cambiar el estado de una cuenta
   *
   * @param {string} accountId
   * @param {boolean} state
   * @memberof AccountService
   */
  changeState(accountId: string, state: boolean): void | ErrorEntity {
    const account = this.accountRepository.findOneById(accountId);
    if (account) {
      const accountTypeState = this.accountTypeRepository.findByStateId(
        account.accountType.id
      );
      if (accountTypeState) {
        account.state = state;
      } else {
        throw new NotFoundException(
          "No se puede cambiar de estado, ya que el tipo de cuenta esta en " +
            accountTypeState
        );
      }
    }
  }

  /**
   * Obtener el tipo de cuenta de una cuenta
   *
   * @param {string} accountId
   * @return {*}  {AccountTypeEntity}
   * @memberof AccountService
   */
  getAccountType(accountId: string): AccountTypeEntity {
    const account = this.accountRepository.findOneById(accountId);
    return account.accountType;
  }

  /**
   * Cambiar el tipo de cuenta a una cuenta
   *
   * @param {string} accountId
   * @param {string} accountTypeId
   * @return {*}  {AccountTypeEntity}
   * @memberof AccountService
   */
  changeAccountType(
    accountId: string,
    accountTypeId: string
  ): AccountTypeEntity {
    const account = this.accountRepository.findOneById(accountId);
    account.accountType.id = accountTypeId;
    return this.accountTypeRepository.findOneById(accountTypeId);
  }

  /**
   * Borrar una cuenta
   *
   * @param {string} accountId
   * @memberof AccountService
   */
  deleteAccount(accountId: string): void | ErrorEntity {
    const balance = this.getBalance(accountId);
    if (balance > 0) {
      throw new NotFoundException("No se puede eliminar");
    } else {
      const state = this.getState(accountId);
      if (state) {
        throw new NotFoundException("No se puede eliminar");
      } else {
        this.accountRepository.delete(accountId);
      }
    }
  }
}
