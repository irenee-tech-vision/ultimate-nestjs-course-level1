import { DynamicModule, Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { AppConfigModule } from '../app-config/app-config.module';
import { UsersRepositoryModule } from './repositories/users-repository.module';
import { DbType } from '../db-type.enum';

@Module({
  imports: [AppConfigModule],
  providers: [UsersService],
  controllers: [UsersController],
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
