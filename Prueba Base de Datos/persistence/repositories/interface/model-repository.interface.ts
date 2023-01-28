import { ErrorEntity } from "../../entities/error.entity";

export interface BodyRepositoryInterface<Entity> {
    register(entity: Entity): Entity | ErrorEntity;
    update(id: string, entity: Entity): Entity | ErrorEntity;
    delete(id: string, soft?: boolean): void | ErrorEntity;
    findAll(): Entity[] | ErrorEntity;
    findOneById(id: string): Entity | ErrorEntity;
}