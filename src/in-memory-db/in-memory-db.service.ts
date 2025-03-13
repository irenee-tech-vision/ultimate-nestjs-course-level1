import { Inject, Injectable, Optional } from '@nestjs/common';
import { randomUUID } from 'crypto';
import * as fs from 'fs';

import { StoreItemEntity } from './models/store-item.entity';
import { CreateEntityInput } from './models/create-entity-input.type';
import { UpdateEntityInput } from './models/update-entity-input.type';
import { FindAllQuery } from './models/find-all-query.type';
import { FindOneQuery } from './models/find-one-query.type';
import { PERSIST_DATA_PATH_TOKEN, SEED_DATA_TOKEN } from './constant';

@Injectable()
export class InMemoryDbService {
  private store: Map<string, StoreItemEntity[]>;

  constructor(
    @Inject(SEED_DATA_TOKEN)
    private readonly seedData: Record<string, StoreItemEntity[]>,
    @Optional()
    @Inject(PERSIST_DATA_PATH_TOKEN)
    private readonly persistDataPath: string,
  ) {
    this.store = new Map(Object.entries(this.seedData));
  }

  create<EntityModel extends StoreItemEntity>(
    entityName: string,
    input: CreateEntityInput<EntityModel>,
  ): EntityModel {
    const entityModel = {
      ...input,
      id: randomUUID(),
    } as EntityModel;

    this.getEntitiesStoreByName<EntityModel>(entityName).push(entityModel);

    this.saveStore();
    return entityModel;
  }

  findAll<EntityModel extends StoreItemEntity>(
    entityName: string,
    query: FindAllQuery<EntityModel>,
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
    query: FindOneQuery<EntityModel>,
  ): EntityModel | undefined {
    const entities = this.getEntitiesStoreByName<EntityModel>(entityName);

    return entities.find((entity) => {
      const isMatchingFilter = Object.keys(query).every(
        (key) => entity[key] === query[key],
      );

      return isMatchingFilter;
    });
  }

  deleteOneBy<EntityModel extends StoreItemEntity>(
    entityName: string,
    query: FindOneQuery<EntityModel>,
  ): EntityModel | undefined {
    const entities = this.getEntitiesStoreByName<EntityModel>(entityName);
    const entityIndex = entities.findIndex((entity) => {
      return Object.keys(query).every((key) => entity[key] === query[key]);
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
    query: FindOneQuery<EntityModel>,
    updateInput: UpdateEntityInput<EntityModel>,
  ): EntityModel | undefined {
    const entities = this.getEntitiesStoreByName<EntityModel>(entityName);
    const entityIndex = entities.findIndex((entity) => {
      return Object.keys(query).every((key) => entity[key] === query[key]);
    });

    if (entityIndex === -1) {
      return undefined;
    }

    const updatedEntity = { ...entities[entityIndex], ...updateInput };
    entities[entityIndex] = updatedEntity;
    this.saveStore();
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

  private saveStore() {
    if (this.persistDataPath) {
      fs.writeFileSync(
        this.persistDataPath,
        JSON.stringify(Object.fromEntries(this.store.entries()), null, 2),
      );
    }
  }
}
