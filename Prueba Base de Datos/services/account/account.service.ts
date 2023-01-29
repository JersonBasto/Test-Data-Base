import { AccountModel } from "../../models";
import { AccountEntity, AccountTypeEntity } from "../../persistence/entities";
import { AccountRepository } from "../../persistence/repositories/account.repository";
import { AccountTypeRepository } from "../../persistence/repositories/account-type.repository";
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
  getBalance(accountId: string): number {
    const account = this.accountRepository.findOneById(accountId);
    return account.balance ?? undefined;
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
  removeBalance(accountId: string, amount: number): void {
    const balance = this.getBalance(accountId);
    if (balance) {
      const account = this.accountRepository.findOneById(accountId);
      if (account.balance >= amount) {
        account.balance = account.balance - amount;
        this.accountRepository.update(accountId, account);
      }
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
    return accountState;
  }

  /**
   * Cambiar el estado de una cuenta
   *
   * @param {string} accountId
   * @param {boolean} state
   * @memberof AccountService
   */
  changeState(accountId: string, state: boolean): void {
    const account = this.accountRepository.findOneById(accountId);
    if (account) {
      const accountTypeState = this.accountTypeRepository.findByStateId(
        account.accountType.id
      );
      if (accountTypeState) {
        account.state = state;
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
  deleteAccount(accountId: string): void {
    const balance = this.getBalance(accountId);
    if (balance > 0) {
      console.log("No se puede eliminar");
    } else {
      const state = this.getState(accountId);
      if (state) {
        console.log("No se puede eliminar");
      } else {
        this.accountRepository.delete(accountId);
      }
    }
  }
}
