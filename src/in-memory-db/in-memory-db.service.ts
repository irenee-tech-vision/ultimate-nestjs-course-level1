import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { StoreItemEntity } from './models/store-item.entity';

@Injectable()
export class InMemoryDbService {
  private store: Map<string, StoreItemEntity[]> = new Map();

  create<EntityModel extends StoreItemEntity>(
    entityName: string,
    input,
  ): EntityModel {
    this.getEntitiesStoreByName<EntityModel>(entityName).push({
      ...input,
      id: randomUUID(),
    });
    return input;
  }

  findAll<EntityModel extends StoreItemEntity>(
    entityName: string,
    query: { limit?: number; sortBy?: string },
  ): EntityModel[] {
    const { limit, sortBy } = query;
    const results = this.getEntitiesStoreByName<EntityModel>(entityName);

    if (sortBy) {
      results.sort((a, b) => {
        if (a[sortBy] < b[sortBy]) {
          return -1;
        }
        if (a[sortBy] > b[sortBy]) {
          return 1;
        }
        return 0;
      });
    }

    if (limit) {
      return results.slice(0, limit);
    }

    return results;
  }

  findOneBy<EntityModel extends StoreItemEntity>(
    entityName: string,
    filter: { [key: string]: any },
  ): EntityModel | undefined {
    const entities = this.getEntitiesStoreByName<EntityModel>(entityName);

    return entities.find((entity) => {
      const isMatchingFilter = Object.keys(filter).every(
        (key) => entity[key] === filter[key],
      );

      return isMatchingFilter;
    });
  }

  deleteOneBy<EntityModel extends StoreItemEntity>(
    entityName: string,
    filter: { [key: string]: any },
  ): EntityModel | undefined {
    const entities = this.getEntitiesStoreByName<EntityModel>(entityName);
    const entityIndex = entities.findIndex((entity) => {
      return Object.keys(filter).every((key) => entity[key] === filter[key]);
    });

    if (entityIndex === -1) {
      return undefined;
    }

    const deletedEntity = entities[entityIndex];
    entities.splice(entityIndex, 1);
    return deletedEntity;
  }

  updateOneBy<EntityModel extends StoreItemEntity>(
    entityName: string,
    filter: { [key: string]: any },
    updateInput,
  ): EntityModel | undefined {
    const entities = this.getEntitiesStoreByName(entityName);
    const entityIndex = entities.findIndex((entity) => {
      return Object.keys(filter).every((key) => entity[key] === filter[key]);
    });

    if (entityIndex === -1) {
      return undefined;
    }

    const updatedEntity = { ...entities[entityIndex], ...updateInput };
    entities[entityIndex] = updatedEntity;
    return updatedEntity;
  }

  private getEntitiesStoreByName<EntityModel extends StoreItemEntity>(
    entityName: string,
  ) {
    if (!this.store.has(entityName)) {
      this.store.set(entityName, []);
    }

    return this.store.get(entityName) as EntityModel[];
  }
}
