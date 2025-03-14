import { Inject, Injectable } from '@nestjs/common';
import { InMemoryDbService } from './in-memory-db.service';
import { REPOSITORY_ENTITY_NAME_TOKEN } from './constant';
import { StoreItemEntity } from './models/store-item.entity';
import { CreateEntityInput } from './models/create-entity-input.type';
import { FindOneQuery } from './models/find-one-query.type';
import { UpdateEntityInput } from './models/update-entity-input.type';
import { FindAllQuery } from './models/find-all-query.type';

@Injectable()
export class InMemoryDbRepository<EntityModel extends StoreItemEntity> {
  constructor(
    private readonly db: InMemoryDbService,
    @Inject(REPOSITORY_ENTITY_NAME_TOKEN)
    private readonly entityName: string,
  ) {}

  create(input: CreateEntityInput<EntityModel>): EntityModel {
    return this.db.create<EntityModel>(this.entityName, input);
  }

  findAll(query: FindAllQuery<EntityModel>): EntityModel[] {
    return this.db.findAll<EntityModel>(this.entityName, query);
  }

  findOneBy(query: FindOneQuery<EntityModel>): EntityModel | undefined {
    return this.db.findOneBy<EntityModel>(this.entityName, query);
  }

  deleteOneBy(query: FindOneQuery<EntityModel>): EntityModel | undefined {
    return this.db.deleteOneBy<EntityModel>(this.entityName, query);
  }

  updateOneBy(
    query: FindOneQuery<EntityModel>,
    input: UpdateEntityInput<EntityModel>,
  ): EntityModel | undefined {
    return this.db.updateOneBy<EntityModel>(this.entityName, query, input);
  }
}
