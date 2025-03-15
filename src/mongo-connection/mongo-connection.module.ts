import { DynamicModule, Module } from '@nestjs/common';
import { MongoCoreModule } from './mongo-core.module';
import { REPOSITORY_COLLECTION_NAME_TOKEN } from './constants';
import { MongoRepository } from './mongo.repository';

@Module({})
export class MongoConnectionModule {
  static forRoot(): DynamicModule {
    return {
      module: MongoConnectionModule,
      global: true,
      imports: [MongoCoreModule],
      exports: [MongoCoreModule],
    };
  }

  static forFeature(options: { collectionName: string }): DynamicModule {
    return {
      module: MongoConnectionModule,
      providers: [
        {
          provide: REPOSITORY_COLLECTION_NAME_TOKEN,
          useValue: options.collectionName,
        },
        MongoRepository,
      ],
      exports: [MongoRepository],
    };
  }
}
