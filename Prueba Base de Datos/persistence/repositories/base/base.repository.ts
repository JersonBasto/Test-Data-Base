import { ErrorEntity } from '../../entities/error.entity';
import { BodyRepositoryInterface } from '../interface/model-repository.interface';

export abstract class BodyRepositoryAbstract<entity>
  implements BodyRepositoryInterface<entity>
{
  protected readonly database: Array<entity>;
  constructor() {
    this.database = new Array<entity>();
  }
  register(entity: entity): entity | ErrorEntity {
    throw new Error('Method not implemented.');
  }
  update(id: string, entity: entity): entity | ErrorEntity {
    throw new Error('Method not implemented.');
  }
  delete(id: string, soft?: boolean | undefined): void | ErrorEntity {
    throw new Error('Method not implemented.');
  }
  findAll(): entity[] | ErrorEntity {
    throw new Error('Method not implemented.');
  }
  findOneById(id: string): entity  | ErrorEntity{
    throw new Error('Method not implemented.');
  }
}
