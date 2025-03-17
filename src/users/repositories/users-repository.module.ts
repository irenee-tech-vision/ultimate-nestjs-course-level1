import { DynamicModule, Module } from '@nestjs/common';
import { DbType } from '../../db-type.enum';
import { InMemoryUsersRepositoryModule } from './in-memory-users-repository/in-memory-users-repository.module';
import { MongoUsersRepositoryModule } from './mongo-users-repository/mongo-users-repository.module';
import { MongooseUsersRepositoryModule } from './mongoose-users-repository/mongoose-users-repository.module';
import { TypeormUsersRepositoryModule } from './typeorm-users-repository/typeorm-users-repository.module';

@Module({
  imports: [InMemoryUsersRepositoryModule],
})
export class UsersRepositoryModule {
  static register(options: { dbType: DbType }): DynamicModule {
    let repositoryModule;

    switch (options.dbType) {
      case DbType.IN_MEMORY:
        repositoryModule = InMemoryUsersRepositoryModule;
        break;
      case DbType.MONGO:
        repositoryModule = MongoUsersRepositoryModule;
        break;
      case DbType.MONGOOSE:
        repositoryModule = MongooseUsersRepositoryModule;
        break;
      case DbType.TYPE_ORM:
        repositoryModule = TypeormUsersRepositoryModule;
        break;
      default:
        throw new Error(
          `UsersRepositoryModule does not support ${options.dbType}`,
        );
    }

    return {
      module: UsersRepositoryModule,
      imports: [repositoryModule],
      exports: [repositoryModule],
    };
  }
}
