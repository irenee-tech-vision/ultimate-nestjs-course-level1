import { DynamicModule, Module } from '@nestjs/common';
import {
  PERSIST_DATA_PATH_TOKEN,
  REPOSITORY_ENTITY_NAME_TOKEN,
  SEED_DATA_PATH_TOKEN,
} from './constant';
import { InMemoryDbService } from './in-memory-db.service';
import { SeedDataProvider } from './seed-data.provider';
import { InMemoryDbRepository } from './in-memory-db.repository';

@Module({})
export class InMemoryDbModule {
  static forRoot(options: { seedDataFilePath: string }): DynamicModule {
    return {
      module: InMemoryDbModule,
      global: true,
      providers: [
        InMemoryDbService,
        SeedDataProvider,
        {
          provide: PERSIST_DATA_PATH_TOKEN,
          useExisting: SEED_DATA_PATH_TOKEN,
        },
        {
          provide: SEED_DATA_PATH_TOKEN,
          useValue: options.seedDataFilePath,
        },
      ],
      exports: [InMemoryDbService],
    };
  }

  static forFeature(options: { entityName: string }): DynamicModule {
    return {
      module: InMemoryDbModule,
      providers: [
        {
          provide: REPOSITORY_ENTITY_NAME_TOKEN,
          useValue: options.entityName,
        },
        InMemoryDbRepository,
      ],
      exports: [InMemoryDbRepository],
    };
  }
}
