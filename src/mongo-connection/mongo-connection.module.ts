import { DynamicModule, Module } from '@nestjs/common';
import { MongoCoreModule } from './mongo-core.module';

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
}
