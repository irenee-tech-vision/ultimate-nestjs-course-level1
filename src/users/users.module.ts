import { DynamicModule, Module } from '@nestjs/common';
import { AppConfigModule } from '../app-config/app-config.module';
import { DbType } from '../db-type.enum';
import { HashingModule } from '../hashing/hashing.module';
import { UsersController } from './controllers/users.controller';
import { UsersRepositoryModule } from './repositories/users-repository.module';
import { UsersService } from './services/users.service';

@Module({
  imports: [AppConfigModule, HashingModule],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {
  static register(options: { dbType: DbType }): DynamicModule {
    return {
      module: UsersModule,
      imports: [
        UsersRepositoryModule.register({
          dbType: options.dbType,
        }),
      ],
    };
  }
}
