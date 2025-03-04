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

  private getEntitiesStoreByName(entityName: string) {
    if (!this.store.has(entityName)) {
      this.store.set(entityName, []);
    }

    return this.store.get(entityName) as any[];
  }
}
