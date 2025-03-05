import { Injectable } from '@nestjs/common';

@Injectable()
export class InMemoryDbService {
  private store: Map<string, any[]> = new Map();

  create(entityName: string, input) {
    this.getEntitiesStoreByName(entityName).push(input);
    return input;
  }

  findAll(entityName: string) {
    return this.getEntitiesStoreByName(entityName);
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

  private getEntitiesStoreByName(entityName: string) {
    if (!this.store.has(entityName)) {
      this.store.set(entityName, []);
    }

    return this.store.get(entityName) as any[];
  }
}
