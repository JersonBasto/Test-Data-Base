import { AccountTypeEntity } from "../../../entities";
import { BodyRepositoryInterface } from "../model-repository.interface";

export interface AccountTypeRepositoryInterface
  extends BodyRepositoryInterface<AccountTypeEntity> {
  findByState(state: boolean): AccountTypeEntity[];
}
