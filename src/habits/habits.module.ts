import { DynamicModule, Module } from '@nestjs/common';
import { AppConfigModule } from '../app-config/app-config.module';
import { HabitsController } from './controllers/habits.controller';
import { HabitsRepositoryModule } from './repositories/habits-repository.module';
import { HabitsService } from './services/habits.service';
import { DbType } from '../db-type.enum';

@Module({
  imports: [AppConfigModule],
  controllers: [HabitsController],
  providers: [HabitsService],
})
export class HabitsModule {
  static register(options: { dbType: DbType }): DynamicModule {
    return {
      module: HabitsModule,
      imports: [HabitsRepositoryModule.register({ dbType: options.dbType })],
    };
  }
}
