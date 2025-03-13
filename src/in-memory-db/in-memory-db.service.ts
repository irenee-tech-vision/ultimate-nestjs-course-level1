import { Injectable } from '@nestjs/common';

@Injectable()
export class InMemoryDbService {
  private store: Map<string, any[]> = new Map();

  create(entityName: string, input) {
    this.getEntitiesStoreByName(entityName).push(input);
    return input;
  }

  findAll(entityName: string, query: { limit?: number; sortBy?: string }) {
    const { limit, sortBy } = query;
    const results = this.getEntitiesStoreByName(entityName);

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

  findOneBy(entityName: string, filter: { [key: string]: any }) {
    const entities = this.getEntitiesStoreByName(entityName);

    return entities.find((entity) => {
      const isMatchingFilter = Object.keys(filter).every(
        (key) => entity[key] === filter[key],
      );

      return isMatchingFilter;
    });
  }

  deleteOneBy(entityName: string, filter: { [key: string]: any }) {
    const entities = this.getEntitiesStoreByName(entityName);
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

  updateOneBy(entityName: string, filter: { [key: string]: any }, updateInput) {
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

  private getEntitiesStoreByName(entityName: string) {
    if (!this.store.has(entityName)) {
      this.store.set(entityName, []);
    }

    return this.store.get(entityName) as any[];
  }
}
