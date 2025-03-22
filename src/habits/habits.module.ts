import {
  DynamicModule,
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppConfigModule } from '../app-config/app-config.module';
import {
  CatchMaliciousInput
} from '../common/middlewares/catch-malicious-input/catch-malicious-input.middleware';
import { DbType } from '../db-type.enum';
import { HabitsController } from './controllers/habits.controller';
import { HabitsRepositoryModule } from './repositories/habits-repository.module';
import { HabitsService } from './services/habits.service';

@Module({
  imports: [AppConfigModule],
  controllers: [HabitsController],
  providers: [HabitsService],
})
export class HabitsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CatchMaliciousInput)
      .exclude({ path: 'habits', method: RequestMethod.GET })
      .forRoutes(HabitsController);
  }

  static register(options: { dbType: DbType }): DynamicModule {
    return {
      module: HabitsModule,
      imports: [HabitsRepositoryModule.register({ dbType: options.dbType })],
    };
  }
}
