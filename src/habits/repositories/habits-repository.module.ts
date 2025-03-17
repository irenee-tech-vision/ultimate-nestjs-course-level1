import { DynamicModule, Module } from '@nestjs/common';
import { InMemoryHabitsRepositoryModule } from './in-memory-habits-repository/in-memory-habits-repository.module';
import { MongoHabitsRepositoryModule } from './mongo-habits-repository/mongo-habits-repository.module';
import { DbType } from '../../db-type.enum';
import { MongooseHabitsRepositoryModule } from './mongoose-habits-repository/mongoose-habits-repository.module';
import { TypeormHabitsRepositoryModule } from './typeorm-habits-repository/typeorm-habits-repository.module';

@Module({})
export class HabitsRepositoryModule {
  static register(options: { dbType: DbType }): DynamicModule {
    let repositoryModule;

    switch (options.dbType) {
      case DbType.IN_MEMORY:
        repositoryModule = InMemoryHabitsRepositoryModule;
        break;
      case DbType.MONGO:
        repositoryModule = MongoHabitsRepositoryModule;
        break;
      case DbType.MONGOOSE:
        repositoryModule = MongooseHabitsRepositoryModule;
        break;
      case DbType.TYPE_ORM:
        repositoryModule = TypeormHabitsRepositoryModule;
        break;
      default:
        throw new Error(
          `HabitsRepositoryModule does not support ${options.dbType}`,
        );
    }

    return {
      module: HabitsRepositoryModule,
      imports: [repositoryModule],
      exports: [repositoryModule],
    };
  }
}
