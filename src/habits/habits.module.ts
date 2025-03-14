import { Module } from '@nestjs/common';
import { AppConfigModule } from '../app-config/app-config.module';
import { HabitsController } from './controllers/habits.controller';
import { HabitsRepositoryModule } from './repositories/habits-repository.module';
import { HabitsService } from './services/habits.service';

@Module({
  imports: [AppConfigModule, HabitsRepositoryModule],
  controllers: [HabitsController],
  providers: [HabitsService],
})
export class HabitsModule {}
